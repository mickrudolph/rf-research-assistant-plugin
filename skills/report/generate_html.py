#!/usr/bin/env python3
"""
RF-Branded Research Report HTML Generator
Usage: python3 generate_html.py <path-to-markdown-report> [--no-open]

DO NOT MODIFY THIS FILE. It is a deterministic converter — no LLM changes needed.
The skill's SKILL.md instructs Claude to RUN this script, not edit it.
"""

import argparse
import re
import subprocess
import sys
from html import escape as _esc
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = SCRIPT_DIR / "templates"


# ── Utilities ────────────────────────────────────────────────────────────────

def esc(text: str) -> str:
    """HTML-escape text."""
    return _esc(str(text), quote=True)


def inline_format(text: str) -> str:
    """Convert markdown inline formatting (**bold**, *italic*, [links](url))."""
    t = esc(text)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'\*(.+?)\*', r'<em>\1</em>', t)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', t)
    # Handle arrow → symbol
    t = t.replace('-&gt;', '→').replace('—&gt;', '→')
    return t


def paragraphs_to_html(text: str) -> str:
    """Convert text blocks to <p> tags, preserving blank-line paragraph breaks."""
    paragraphs = re.split(r'\n\s*\n', text.strip())
    return '\n'.join(f'<p>{inline_format(p.strip())}</p>' for p in paragraphs if p.strip())


def confidence_badge(level: str, tooltip: str = "") -> str:
    """Generate a confidence badge span."""
    clean = level.strip().upper()
    css_class = "high"
    if "MODERATE" in clean:
        css_class = "moderate"
    elif "EMERGING" in clean:
        css_class = "emerging"
    tip = f' data-tooltip="{esc(tooltip)}"' if tooltip else ""
    return f'<span class="confidence-badge {css_class}"{tip}>{esc(clean)}</span>'


# ── Markdown parsers ─────────────────────────────────────────────────────────

def split_by_h2(text: str) -> list[tuple[str, str]]:
    """Split text into (heading, body) pairs by ## headings."""
    parts = re.split(r'^## ', text, flags=re.MULTILINE)
    result = []
    for part in parts[1:]:  # skip content before first ##
        lines = part.split('\n', 1)
        heading = lines[0].strip()
        body = lines[1] if len(lines) > 1 else ""
        result.append((heading, body))
    return result


def split_by_h3(text: str) -> list[tuple[str, str]]:
    """Split text into (heading, body) pairs by ### headings."""
    parts = re.split(r'^### ', text, flags=re.MULTILINE)
    result = []
    for part in parts[1:]:
        lines = part.split('\n', 1)
        heading = lines[0].strip()
        body = lines[1] if len(lines) > 1 else ""
        result.append((heading, body))
    return result


def parse_bullet_list(text: str) -> list[str]:
    """Extract items from - bullet lines."""
    items = []
    for line in text.strip().splitlines():
        m = re.match(r'^[-*]\s+(.+)$', line.strip())
        if m:
            items.append(m.group(1))
    return items


def parse_numbered_list(text: str) -> list[str]:
    """Extract items from 1. numbered lines."""
    items = []
    for line in text.strip().splitlines():
        m = re.match(r'^\d+\.\s+(.+)$', line.strip())
        if m:
            items.append(m.group(1))
    return items


def parse_blockquote(text: str) -> tuple[str, str]:
    """Parse a blockquote block into (quote_text, attribution)."""
    lines = []
    attribution = ""
    for line in text.strip().splitlines():
        content = re.sub(r'^>\s?', '', line).strip()
        if content.startswith('—') or content.startswith('--'):
            attribution = content.lstrip('—- ').strip()
        else:
            # Strip surrounding quotes
            content = content.strip('""\u201c\u201d')
            if content:
                lines.append(content)
    return ' '.join(lines), attribution


def parse_table(text: str) -> tuple[list[str], list[list[str]]]:
    """Parse a markdown table into headers and rows."""
    lines = [l.strip() for l in text.strip().splitlines() if l.strip().startswith('|')]
    if len(lines) < 2:
        return [], []
    headers = [c.strip() for c in lines[0].split('|')[1:-1]]
    rows = []
    for line in lines[2:]:  # skip header separator
        cells = [c.strip() for c in line.split('|')[1:-1]]
        rows.append(cells)
    return headers, rows


# ── Section converters ───────────────────────────────────────────────────────

def convert_header(title_line: str, rest_before_first_h2: str) -> str:
    """Convert the # title and metadata lines into report header."""
    title = title_line.strip()
    block = rest_before_first_h2.strip()

    # Strip --- separators
    block = re.sub(r'^---\s*$', '', block, flags=re.MULTILINE).strip()

    # Extract metadata lines: **Key:** Value
    metadata_items = []
    for m in re.finditer(r'\*\*(.+?)\*\*\s*(.+?)$', block, re.MULTILINE):
        key = m.group(1).strip().rstrip(':')
        value = m.group(2).strip()

        # Special handling for Confidence metadata
        conf_match = re.search(r'(HIGH|MODERATE(?:-HIGH)?|EMERGING)', value, re.IGNORECASE)
        if key.lower() == 'confidence' and conf_match:
            level = conf_match.group(1)
            badge = confidence_badge(level)
            display_value = re.sub(
                r'(HIGH|MODERATE(?:-HIGH)?|EMERGING)',
                badge,
                esc(value),
                count=1,
                flags=re.IGNORECASE
            )
            metadata_items.append(f'<span><strong>{esc(key)}:</strong> {display_value}</span>')
        else:
            metadata_items.append(f'<span><strong>{esc(key)}:</strong> {esc(value)}</span>')

    meta_html = '\n        '.join(metadata_items)

    return f'''    <header class="report-header">
      <h1>{esc(title)}</h1>
      <div class="metadata">
        {meta_html}
      </div>
    </header>'''


def convert_research_context(heading: str, body: str) -> str:
    """Convert Research Context section."""
    content = paragraphs_to_html(body)
    return f'''    <section>
      <h2>{esc(heading)}</h2>
      {content}
    </section>

    <hr>'''


def convert_executive_summary(heading: str, body: str) -> str:
    """Convert Executive Summary with verdict and recommendations."""
    subsections = split_by_h3(body)
    parts = [f'    <section class="executive-summary">\n      <h2>{esc(heading)}</h2>']

    for sub_heading, sub_body in subsections:
        if 'verdict' in sub_heading.lower():
            parts.append(f'      <h3>{esc(sub_heading)}</h3>')
            parts.append(f'      <div class="verdict">')
            parts.append(f'        {paragraphs_to_html(sub_body)}')
            parts.append(f'      </div>')

        elif 'recommendation' in sub_heading.lower():
            parts.append(f'      <h3>{esc(sub_heading)}</h3>')
            parts.append(f'      <ul class="recommendations">')
            items = parse_numbered_list(sub_body)
            if not items:
                items = [line.strip() for line in sub_body.strip().splitlines() if line.strip()]
            for item in items:
                formatted = inline_format(item)
                formatted = re.sub(
                    r'\((\s*)(HIGH|MODERATE(?:-HIGH)?|EMERGING)(\s+confidence\s*)\)',
                    lambda m: f'({m.group(1)}{confidence_badge(m.group(2))}{m.group(3)})',
                    formatted,
                    flags=re.IGNORECASE
                )
                parts.append(f'        <li>{formatted}</li>')
            parts.append(f'      </ul>')
        else:
            parts.append(f'      <h3>{esc(sub_heading)}</h3>')
            parts.append(f'      {paragraphs_to_html(sub_body)}')

    parts.append('    </section>\n\n    <hr>')
    return '\n'.join(parts)


def convert_verdict(heading: str, body: str) -> str:
    """Convert a standalone ## Verdict section."""
    parts = [f'    <section class="executive-summary">']
    parts.append(f'      <h2>{esc(heading)}</h2>')
    parts.append(f'      <div class="verdict">')
    parts.append(f'        {paragraphs_to_html(body)}')
    parts.append(f'      </div>')
    parts.append('    </section>\n\n    <hr>')
    return '\n'.join(parts)


def convert_recommendations(heading: str, body: str) -> str:
    """Convert a standalone ## Recommendations section with ### subsections."""
    subsections = split_by_h3(body)
    parts = [f'    <section class="executive-summary">']
    parts.append(f'      <h2>{esc(heading)}</h2>')

    if subsections:
        parts.append(f'      <ul class="recommendations">')
        for sub_heading, sub_body in subsections:
            rec_parts = [f'<strong>{inline_format(sub_heading)}</strong>']

            conf_match = re.search(
                r'\*\*Confidence:\*\*\s*(HIGH|MODERATE(?:-HIGH)?|EMERGING)',
                sub_body, re.IGNORECASE
            )
            if conf_match:
                rec_parts.append(f' {confidence_badge(conf_match.group(1))}')

            # Get first non-metadata paragraph
            paragraphs = []
            for line in sub_body.strip().splitlines():
                stripped = line.strip()
                if stripped.startswith('**Confidence:') or stripped.startswith('**Validated by:'):
                    continue
                if stripped.startswith('**Why this matters:') or stripped.startswith('**Source findings:'):
                    continue
                if stripped == '---':
                    continue
                if stripped:
                    paragraphs.append(stripped)

            if paragraphs:
                rec_parts.append(f' — {inline_format(paragraphs[0])}')

            parts.append(f'        <li>{"".join(rec_parts)}</li>')
        parts.append(f'      </ul>')
    else:
        items = parse_numbered_list(body)
        if items:
            parts.append(f'      <ul class="recommendations">')
            for item in items:
                formatted = inline_format(item)
                formatted = re.sub(
                    r'\((\s*)(HIGH|MODERATE(?:-HIGH)?|EMERGING)(\s+confidence\s*)\)',
                    lambda m: f'({m.group(1)}{confidence_badge(m.group(2))}{m.group(3)})',
                    formatted,
                    flags=re.IGNORECASE
                )
                parts.append(f'        <li>{formatted}</li>')
            parts.append(f'      </ul>')
        else:
            parts.append(f'      {paragraphs_to_html(body)}')

    parts.append('    </section>\n\n    <hr>')
    return '\n'.join(parts)


def convert_single_finding(heading: str, body: str) -> str:
    """Convert a single Finding section into a finding-card article."""
    parts = ['      <article class="finding-card">']

    # ── Finding header with confidence badge ──
    conf_match = re.search(
        r'\*\*Confidence:\*\*\s*([\w-]+)\s*\|\s*\*\*Validated by:\*\*\s*(.+?)$',
        body, re.MULTILINE
    )
    conf_level = conf_match.group(1) if conf_match else ""
    validated_by = conf_match.group(2).strip() if conf_match else ""

    parts.append(f'        <div class="finding-header">')
    parts.append(f'          <h3>{inline_format(heading)}</h3>')
    if conf_level:
        parts.append(f'          <div class="finding-meta">')
        parts.append(f'            {confidence_badge(conf_level, f"Validated by {validated_by}")}')
        parts.append(f'            <span class="validated-by">{esc(validated_by)}</span>')
        parts.append(f'          </div>')
    parts.append(f'        </div>')

    # ── Killer quote (blockquote) ──
    quote_match = re.search(r'((?:^>.*\n?)+)', body, re.MULTILINE)
    if quote_match:
        quote_text, attribution = parse_blockquote(quote_match.group(1))
        if quote_text:
            parts.append(f'        <blockquote class="killer-quote">')
            parts.append(f'          <p>"{esc(quote_text)}"</p>')
            if attribution:
                parts.append(f'          <cite>— {esc(attribution)}</cite>')
            parts.append(f'        </blockquote>')

    # ── Business impact / "What this means" section ──
    # Match both "What this means for investment/roadmap:" and "Business Impact:"
    impact_match = re.search(
        r'\*\*(?:What this means[^*]*|Business [Ii]mpact:?)\*\*:?\s*\n(.*?)(?=\n\*\*(?:Design [Ii]mplication|Must have|Supporting evidence|Evidence:)|\Z)',
        body, re.DOTALL
    )
    if impact_match:
        impact_text = impact_match.group(1).strip()
        parts.append(f'        <div class="business-impact">')
        parts.append(f'          <h4>What this means for investment/roadmap:</h4>')
        parts.append(f'          {paragraphs_to_html(impact_text)}')
        parts.append(f'        </div>')

    # ── Design implications (standalone, not collapsible) ──
    design_match = re.search(
        r'\*\*Design [Ii]mplications?:\*\*\s*\n(.*?)(?=\n\*\*(?:Supporting evidence|Evidence:)|\Z)',
        body, re.DOTALL
    )
    if design_match:
        design_text = design_match.group(1).strip()
        parts.append('        <div class="design-implications">')
        parts.append('          <h4>Design implications:</h4>')

        # Split into Must have / Must avoid
        must_have_match = re.search(r'\*\*Must have:\*\*\s*\n(.*?)(?=\n\*\*Must avoid|\Z)', design_text, re.DOTALL)
        must_avoid_match = re.search(r'\*\*Must avoid:\*\*\s*\n(.*?)\Z', design_text, re.DOTALL)

        if must_have_match:
            items = parse_numbered_list(must_have_match.group(1))
            if not items:
                items = parse_bullet_list(must_have_match.group(1))
            if items:
                parts.append('          <strong>Must have:</strong>')
                parts.append('          <ol>' +
                                    ''.join(f'<li>{inline_format(i)}</li>' for i in items) +
                                    '</ol>')

        if must_avoid_match:
            items = parse_bullet_list(must_avoid_match.group(1))
            if items:
                parts.append('          <strong>Must avoid:</strong>')
                parts.append('          <ul class="evidence-list">' +
                                    ''.join(f'<li>{inline_format(i)}</li>' for i in items) +
                                    '</ul>')

        # Fallback: no Must have/Must avoid structure — just plain bullets
        if not must_have_match and not must_avoid_match:
            items = parse_bullet_list(design_text)
            if not items:
                items = parse_numbered_list(design_text)
            if items:
                parts.append('          <ul class="evidence-list">' +
                                    ''.join(f'<li>{inline_format(i)}</li>' for i in items) +
                                    '</ul>')

        parts.append('        </div>')

    # ── Supporting evidence (collapsible) ──
    # Match both "Supporting evidence:" and "Evidence:"
    evidence_match = re.search(
        r'\*\*(?:Supporting evidence|Evidence):?\*\*:?\s*\n(.*?)\Z',
        body, re.DOTALL
    )
    if evidence_match:
        items = parse_bullet_list(evidence_match.group(1))
        if items:
            parts.append('        <details class="finding-disclosure">')
            parts.append('          <summary>Show supporting evidence</summary>')
            parts.append('          <div class="finding-details">')
            parts.append('            <div class="evidence-section">')
            parts.append('              <h4>Supporting evidence:</h4>')
            parts.append('              <ul class="evidence-list">' +
                                ''.join(f'<li>{inline_format(i)}</li>' for i in items) +
                                '</ul>')
            parts.append('            </div>')
            parts.append('          </div>')
            parts.append('        </details>')

    parts.append('      </article>')
    return '\n'.join(parts)


def convert_key_findings(heading: str, body: str) -> str:
    """Convert all Key Findings into finding cards."""
    parts = [f'    <section class="key-findings">\n      <h2>{esc(heading)}</h2>']

    findings = split_by_h3(body)
    for i, (finding_heading, finding_body) in enumerate(findings):
        parts.append(convert_single_finding(finding_heading, finding_body))
        if i < len(findings) - 1:
            parts.append('')  # spacing between cards

    parts.append('    </section>\n\n    <hr>')
    return '\n'.join(parts)


def convert_hypothesis_comparison(heading: str, body: str) -> str:
    """Convert Hypothesis Comparison section."""
    content = paragraphs_to_html(body)
    return f'''    <section>
      <h2>{esc(heading)}</h2>
      {content}
    </section>

    <hr>'''


def convert_validation_matrix(heading: str, body: str) -> str:
    """Convert Validation Matrix with tooltips."""
    parts = [f'    <section class="validation-matrix">\n      <h2>{esc(heading)}</h2>']

    headers, rows = parse_table(body)
    if headers and rows:
        parts.append('      <div style="overflow-x: auto;">')
        parts.append('        <table>')
        parts.append('          <thead><tr>')
        for h in headers:
            parts.append(f'            <th>{inline_format(h)}</th>')
        parts.append('          </tr></thead>')
        parts.append('          <tbody>')
        for row in rows:
            parts.append('          <tr>')
            for j, cell in enumerate(row):
                if j == 0:
                    parts.append(f'            <td class="problem-name">{inline_format(cell)}</td>')
                elif j == len(row) - 1:
                    parts.append(f'            <td class="status-cell">{inline_format(cell)}</td>')
                else:
                    # Extract emoji and tooltip text
                    emoji_match = re.match(r'^(✅|⚠️|❌|❓|—)\s*(.*)', cell)
                    if emoji_match:
                        emoji = emoji_match.group(1)
                        tooltip = emoji_match.group(2).strip()
                        if tooltip:
                            parts.append(f'            <td class="validation-cell" data-tooltip="{esc(tooltip)}">{emoji}</td>')
                        else:
                            parts.append(f'            <td class="validation-cell">{emoji}</td>')
                    else:
                        parts.append(f'            <td>{inline_format(cell)}</td>')
            parts.append('          </tr>')
        parts.append('          </tbody>')
        parts.append('        </table>')
        parts.append('      </div>')

    # Add any text after the table (interpretation, legend, etc.)
    # Find text after the table
    table_end = body.rfind('|')
    if table_end > 0:
        after_table = body[table_end:]
        # Find the next newline after the last table row
        nl_pos = after_table.find('\n')
        if nl_pos > 0:
            remaining = after_table[nl_pos:].strip()
            if remaining:
                # Handle subsections like ### Interpretation
                subsections = split_by_h3(remaining)
                if subsections:
                    for sub_heading, sub_body in subsections:
                        parts.append(f'      <h3>{esc(sub_heading)}</h3>')
                        parts.append(f'      {paragraphs_to_html(sub_body)}')
                else:
                    parts.append(f'      {paragraphs_to_html(remaining)}')

    parts.append('    </section>\n\n    <hr>')
    return '\n'.join(parts)


def convert_unknowns(heading: str, body: str) -> str:
    """Convert 'What We Don't Know Yet' section."""
    parts = [f'    <section class="unknowns-section">\n      <h2>{esc(heading)}</h2>']

    subsections = split_by_h3(body)
    if subsections:
        for sub_heading, sub_body in subsections:
            parts.append(f'      <h3>{esc(sub_heading)}</h3>')
            items = parse_bullet_list(sub_body)
            if items:
                parts.append('      <ul class="unknowns-list">')
                for item in items:
                    parts.append(f'        <li>{inline_format(item)}</li>')
                parts.append('      </ul>')
            else:
                parts.append(f'      {paragraphs_to_html(sub_body)}')
    else:
        items = parse_bullet_list(body)
        if items:
            parts.append('      <ul class="unknowns-list">')
            for item in items:
                parts.append(f'        <li>{inline_format(item)}</li>')
            parts.append('      </ul>')
        else:
            parts.append(f'      {paragraphs_to_html(body)}')

    parts.append('    </section>\n\n    <hr>')
    return '\n'.join(parts)


def convert_methodology(heading: str, body: str) -> str:
    """Convert Methodology section."""
    content = paragraphs_to_html(body)
    return f'''    <section class="methodology">
      <h2>{esc(heading)}</h2>
      {content}
    </section>

    <hr>'''


def convert_synthesis_link(heading: str, body: str) -> str:
    """Convert Full Research Details link section."""
    content = paragraphs_to_html(body)
    return f'''    <section class="synthesis-link">
      <h2>{esc(heading)}</h2>
      {content}
    </section>'''


def convert_generic_section(heading: str, body: str) -> str:
    """Fallback converter for unrecognized sections."""
    content = paragraphs_to_html(body)
    return f'''    <section>
      <h2>{esc(heading)}</h2>
      {content}
    </section>

    <hr>'''


# ── Main assembly ────────────────────────────────────────────────────────────

def markdown_to_html(md_text: str) -> str:
    """Convert full markdown report to structured HTML content."""
    parts = []

    # 1. Extract title and pre-section content
    title_match = re.match(r'^#\s+(.+?)$', md_text, re.MULTILINE)
    title = title_match.group(1) if title_match else "Research Report"
    title_end = title_match.end() if title_match else 0

    first_h2 = re.search(r'^## ', md_text[title_end:], re.MULTILINE)
    if first_h2:
        pre_content = md_text[title_end:title_end + first_h2.start()]
        rest = md_text[title_end + first_h2.start():]
    else:
        pre_content = md_text[title_end:]
        rest = ""

    parts.append(convert_header(title, pre_content))

    # 2. Split remaining content by ## headings
    sections = split_by_h2(rest)

    for heading, body in sections:
        h_lower = heading.lower()
        if 'research context' in h_lower:
            parts.append(convert_research_context(heading, body))
        elif 'executive summary' in h_lower:
            parts.append(convert_executive_summary(heading, body))
        elif h_lower.strip() == 'verdict' or 'verdict' in h_lower and 'key' not in h_lower:
            parts.append(convert_verdict(heading, body))
        elif 'recommendation' in h_lower:
            parts.append(convert_recommendations(heading, body))
        elif 'key finding' in h_lower:
            parts.append(convert_key_findings(heading, body))
        elif 'hypothesis' in h_lower:
            parts.append(convert_hypothesis_comparison(heading, body))
        elif 'validation matrix' in h_lower:
            parts.append(convert_validation_matrix(heading, body))
        elif "don't know" in h_lower or "dont know" in h_lower or "unknown" in h_lower:
            parts.append(convert_unknowns(heading, body))
        elif 'methodology' in h_lower:
            parts.append(convert_methodology(heading, body))
        elif 'full research' in h_lower or 'research details' in h_lower:
            parts.append(convert_synthesis_link(heading, body))
        else:
            parts.append(convert_generic_section(heading, body))

    return '\n\n'.join(parts)


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Convert markdown report to RF-branded HTML")
    parser.add_argument("markdown_path", help="Path to the markdown report file")
    parser.add_argument("--no-open", action="store_true", help="Don't auto-open in browser")
    args = parser.parse_args()

    md_path = Path(args.markdown_path).resolve()
    if not md_path.exists():
        print(f"Error: File not found: {md_path}", file=sys.stderr)
        sys.exit(1)

    # Read inputs
    md_text = md_path.read_text(encoding="utf-8")
    shell_html = (TEMPLATES_DIR / "shell.html").read_text(encoding="utf-8")
    css_text = (TEMPLATES_DIR / "styles.css").read_text(encoding="utf-8")
    logo_uri = (TEMPLATES_DIR / "rf-logo-base64.txt").read_text(encoding="utf-8").strip()

    # Convert markdown to HTML content
    content_html = markdown_to_html(md_text)

    # Extract title for header
    title_match = re.match(r'^#\s+(.+?)$', md_text, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else "Research Report"

    # Assemble final HTML
    final_html = shell_html
    final_html = final_html.replace("{{CSS}}", css_text)
    final_html = final_html.replace("{{CONTENT}}", content_html)
    final_html = final_html.replace("{{LOGO_URI}}", logo_uri)
    final_html = final_html.replace("{{HEADER_TITLE}}", "RainFocus Research Report")
    final_html = final_html.replace("{{HEADER_SUBTITLE}}", esc(title))

    # Write output
    out_path = md_path.with_suffix(".html")
    out_path.write_text(final_html, encoding="utf-8")

    print(f"✓ HTML report saved: {out_path}")

    # Auto-open
    if not args.no_open:
        try:
            subprocess.run(["open", str(out_path)], check=False)
        except Exception:
            pass

    return str(out_path)


if __name__ == "__main__":
    main()
