@AGENTS.md

## Michael's setup notes

- Repository path: `D:\code\projects\grayminds.github.io` (relocated 2026-05-06 from `D:\code\grayminds\grayminds.github.io`).
- Publish pipeline: `D:\code\projects\shared\scripts\Jekyll-Publish-Content.ps1`. Use `-WhatIf` to dry-run, `-Push` to commit and push.
- Dual-remote push: `git push origin main` writes to **both** the private Gitea mirror and GitHub. Confirm with `git remote -v`. The Gitea URL is workstation-local git config; keep it out of this public file.
- Voice and content rules: load from `D:\brain\_identity\voice-style.md`. Do not duplicate them here.

## Canonical sources

Some content is authored in the vault and synced here by the publish script; some is authored in this repo directly. The split is intentional. Audit confirmed 2026-05-06: all vault-managed files are in sync with their Jekyll copies, and bio.yml moved from Jekyll-canonical to vault-canonical alongside the rest of `_data\`.

| File or folder                                                                                                                                                                                    | Source of truth                                            | How it lands here                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| `_data\bio.yml`, `citations.yml`, `coauthors.yml`, `cv.yml`, `facets.yml`, `repositories.yml`, `socials.yml`, `tech_stack.yml`, `timeline_cats.yml`, `timeline_eras.yml`, `venues.yml` (11 files) | Vault `D:\brain\00_sitebase\data\`                         | `Jekyll-Publish-Content.ps1`                          |
| `_posts\`, `_pages\`, `_projects\`                                                                                                                                                                | Vault `D:\brain\00_sitebase\posts\`, `pages\`, `projects\` | `Jekyll-Publish-Content.ps1`                          |
| Image attachments referenced in posts                                                                                                                                                             | Vault `D:\brain\_attachments\`                             | `Jekyll-Publish-Content.ps1` (image translation step) |
| `assets\files\bio\michael-gray.vcf`                                                                                                                                                               | This repo (derived from bio.yml)                           | `scripts\New-VCard.ps1`                               |
| Bio QR codes                                                                                                                                                                                      | This repo (derived from bio.yml)                           | `scripts\New-BioQrCode.ps1`                           |
| `_bibliography\`, `_books\`, `_news\`                                                                                                                                                             | This repo                                                  | Edit in place, commit, push                           |
| `_includes\`, `_layouts\`, `_sass\`, `_config.yml`, root files (`Gemfile`, `Dockerfile`, etc.)                                                                                                    | This repo                                                  | Edit in place, commit, push                           |

bio.yml is vault-canonical. The two regenerator scripts (`scripts\New-VCard.ps1`, `scripts\New-BioQrCode.ps1`) read the published copy at `_data\bio.yml` after the publish step copies it from the vault, so the regeneration pipeline is unchanged. Edit bio.yml in `D:\brain\00_sitebase\data\bio.yml`, run publish, then run the regenerators.

For changes to vault-canonical content, run the publish pipeline. For changes to Jekyll-canonical content, edit and commit here directly. For mixed sessions, run publish first to materialize vault changes, then commit + push to capture both.

## Workflow: publish vs. push

These are sequential stages, not alternatives:

- **publish** copies vault sources into this repo's working directory. No git activity by default.
- **push** commits and pushes everything in the working directory to the remote, which triggers the GitHub Pages build.

`Jekyll-Publish-Content.ps1 -Push` does both in one call. Without `-Push`, the script copies files but the live site does not update until you commit + push manually.
