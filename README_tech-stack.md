# Tech Stack Component -- Integration Guide

## Files

| File | Destination in repo | Purpose |
|---|---|---|
| `_data/tech_stack.yml` | `_data/tech_stack.yml` | All data.  Edit this to add, update, or retire items. |
| `_includes/tech_stack.liquid` | `_includes/tech_stack.liquid` | Liquid template; renders sections, expandable rows, and tables. |
| `assets/css/tech-stack.css` | `assets/css/tech-stack.css` | All component styles. |
| `tech-stack.md` | `tech-stack.md` (repo root) | Page at /tech-stack/ with jump nav. |

## Integration steps

1. Copy all four files into the repo at the paths above.
2. Push via GitHub Desktop.
3. Visit `https://grayminds.github.io/tech-stack/` to verify.

## Adding the page to site navigation

`jekyll-theme-minimal` auto-generates nav from pages with a `title` in front matter.
If it does not appear, add a link manually in `_layouts/default.html`:

```html
<a href="/tech-stack/">Tech Stack</a>
```

## YAML schema

### Top level

```yaml
intro: string           # Paragraph shown above the legend.

sections:               # Ordered list of sections; renders in sequence.
  - id: string          # Used as the HTML anchor for jump nav.
    title: string       # Displayed as the <h2> section heading.
    type: hardware | software   # Controls which table columns render.
    items: [ ... ]
```

### Hardware item

```yaml
- vendor: string          # required
  model: string           # required; shown as the link text if url present
  url: string             # optional
  date: YYYY-MM           # optional; acquisition or deployment date
  context:                # one or more: home-office, remote, smb, corporate
    - home-office
  status: active          # active | retired | evaluating
  proficiency: expert     # expert | proficient | familiar
  sentiment: positive     # positive | mixed | retired-regret
  highlight: true         # true = render a narrative card above the table
  narrative: string       # shown in the highlight card; supports multi-line >
  tags: [ string ]        # free-form lowercase tags
  notes: string           # short table note
```

### Software item

```yaml
- vendor: string
  product: string         # required; link text if url present
  url: string
  version: string         # optional
  context:
    - home-office
  status: active
  license: commercial     # commercial | open-source | freeware | subscription
  proficiency: expert
  sentiment: positive
  highlight: true
  narrative: string
  tags: [ string ]
  notes: string
```

## Sentiment values

| Value | Dot color | Use when |
|---|---|---|
| `positive` | green | You'd choose it again without hesitation. |
| `mixed` | orange | Works, but has meaningful limitations or surprises. |
| `retired-regret` | gray | You moved on and wish you'd known earlier. |

## Highlight cards

Set `highlight: true` on any item to render a narrative card above the table for that section.
The table row also gets a subtle yellow tint and an upward-arrow marker (&#9650;) to show the card above explains it further.

Use `narrative:` for the long-form opinion text.  Use `notes:` for the short table summary.
They are independent fields; both are optional.

## Future: client-side filtering

Each `<tr>` in the table carries `class="status--{status} ..."`.
To add tag or context filtering, add `data-tags` and `data-context` attributes to each row in the Liquid template, then wire up a small JavaScript filter function.
