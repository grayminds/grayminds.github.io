# /bio/ — Digital Business Card

A standalone digital business card at `https://grayminds.com/bio`, designed for QR-code distribution at conferences.  Hex-clipped portrait, electric-blue accent, Bento-grid content.  Renders independently of the al-folio chrome (no navbar, no footer, its own compiled stylesheet).

Architectural rationale, voice contract, and iteration log live in `~/.claude/plans/grayminds-biosite.md` on the workstation.  This file is the operator's manual.

---

## File map

```
_data/bio.yml                              <- canonical content source
_pages/bio.md                              <- /bio/ page
_layouts/bio.liquid                        <- standalone HTML, no al-folio chrome
_sass/_bio.scss                            <- stub redirect note
assets/css/bio.scss                        <- the only bio stylesheet (compiles to bio.css)
assets/img/bio/globe-bg.jpg                <- 10%-opacity body background
assets/img/wmg-revised-20241027_125531.jpg <- avatar
assets/img/bio/qr/grayminds-bio.svg        <- QR (vector, used inline; rendered with filter: invert)
assets/img/bio/qr/grayminds-bio-1024.png   <- QR (print)
assets/img/bio/qr/grayminds-bio-256.png    <- QR (slide / on-page)
assets/files/bio/michael-gray.vcf          <- Save Contact target (generated)
assets/pdf/michaelgray_resume.pdf          <- Resume link target
scripts/New-VCard.ps1                      <- Regenerate the vCard
scripts/New-BioQrCode.ps1                  <- Regenerate QR artifacts
```

---

## Editing content

All text, links, and structured data live in `_data/bio.yml`.  Edit the file, commit, push.  GitHub Actions builds and deploys.

Key fields:

| Field | What it drives |
|---|---|
| `profile.name` | Hero h1 |
| `profile.title` | Title row (under the name) |
| `profile.subtitle` | Second-row title (electric blue in Bento) |
| `profile.avatar` | `<img>` src for the hex-clipped portrait |
| `profile.paragraphs` | Array of bio paragraphs rendered under the credentials |
| `credentials` | List of credential labels (PMP, DASSM, etc.) |
| `primary_action` | Save Contact button (downloads the vCard) |
| `secondary_actions` | Email + Phone tiles.  Email uses split `user` + `domain` so the GitHub repo does not contain a clean address.  Phone uses raw `number`; the layout strips formatting and emits a `tel:` link. |
| `sections[].links` | Hairline-divided link rows in the Online card |
| `sections[].notes` | Bullets in the Working on card |
| `vcard.*` | Structured data for the downloaded vCard.  Read by `scripts/New-VCard.ps1` only; not used by the page. |

---

## Regenerating the vCard

After any change to name, title, location, email user/domain, phone, or resume URL, regenerate:

```
pwsh ./scripts/New-VCard.ps1
```

`-WhatIf` supported.  Output:  `assets/files/bio/michael-gray.vcf`.

---

## Regenerating the QR codes

QR codes encode `https://grayminds.com/bio` by default.  Pass `-Url` to swap:

```
pwsh ./scripts/New-BioQrCode.ps1
pwsh ./scripts/New-BioQrCode.ps1 -Url https://bio.grayminds.com    # Phase 2
```

Outputs three artifacts in `assets/img/bio/qr/`:  SVG (vector), 1024 PNG (print), 256 PNG (on-page).  First run installs `qrcode[pil]` into the workstation Python via `pip install --user`.

---

## Email obfuscation

`bio.yml` stores email as split `user` + `domain` so the GitHub repo does not index a clean address.  The layout assembles the `mailto:` link at render time.  At the edge, Cloudflare's "Email Address Obfuscation" feature (Scrape Shield → On for the grayminds.com zone) rewrites the assembled `mailto:` into `/cdn-cgi/l/email-protection#<hex>` before serving.

A Layer-3 fallback (JS-assembly on click) is in `_layouts/bio.liquid` as a commented-out script.  Uncomment if Cloudflare obfuscation is ever disabled.

---

## Phase 2 — `bio.grayminds.com` subdomain (deprecated)

Not pursuing.  Canonical URL is `https://grayminds.com/bio`.  Cloudflare DNS for the subdomain is configured but not wired through.  The `-Url` parameter on `scripts/New-BioQrCode.ps1` remains in place if the decision reverses, but no current need.

---

## Local preview

```
bundle exec jekyll serve --livereload
```

Then visit `http://localhost:4000/bio/` (canonical) or `http://localhost:4000/bio2/` (same content with a demo nav at the top to switch between the three style variations).

For phone testing over LAN, bind to all interfaces:

```
bundle exec jekyll serve --host 0.0.0.0 --livereload
```

Then `http://<workstation-LAN-IP>:4000/bio/` from the phone.
