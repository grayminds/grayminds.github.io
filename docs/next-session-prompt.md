# Next-session prompt (ready to paste)

> Protocol:  (1) move the `## SESSION HANDOFF` block below into the archive
> (`docs/session-history.md`; re-head `## SESSION HANDOFF (` -> `## (`, prepend
> under its `---` rule, verbatim);  (2) do the work;  (3) REWRITE the block below
> covering one session only;  (4) commit handoff + archive together.
>
> `docs/` is in `_config.yml` `exclude:`.  Nothing here publishes to grayminds.com.

## SESSION HANDOFF (2026-10-28 to 2026-10-31 -- **security audit, dependency updates, leak and BOM fixes, deploy repaired.  c04915e1, f7304e03, 08d9784e, 164b1103 PUSHED and live; shared 1a012de PUSHED; handoff commit UNPUSHED.**

> **==> [WORK SHIPPED].**
>
> - Gem advisories cleared via full `bundle lock --update` (nokogiri 1.19.4, loofah, crass, json, addressable, concurrent-ruby, activesupport).  `npm audit fix` -> 0 npm vulnerabilities.
> - `fjogeleit/yaml-update-action` pinned to the v0.17.0 commit SHA in deploy, axe, and broken-links-site.
> - Repo docs (`CLAUDE.md`, `AGENTS.md`, `README_*.md`, others), `requirements.txt`, and `scripts/` were being served on grayminds.com.  Added to `exclude:`; deploy now runs a "Block repo-internal files" guard step and `clean: true`.  All 404 on the live site as of 2026-10-30.
> - `/ai-disclosure/` was 404 because `_pages/ai-disclosure.md` started with a UTF-8 BOM.  Root cause in `D:\code\projects\shared\scripts\Jekyll-Publish-Content.ps1`:  the unchanged check read files with `Get-Content -Encoding UTF8` (strips the BOM), so pre-July BOM'd files never got rewritten.  Added `Test-Utf8Bom`; republished the page and 8 posts BOM-free.
> - Deploy had been broken since `ubuntu-latest` moved to 26.04 (Ruby 3.3.5 not built there).  Pinned Ruby 3.3.13 in all workflows.
> - origin push URL for Gitea moved from `http://<NAS IP>:3000` to `https://gitea.grayminds.com`.  The separate `gitea` remote stays (local private backup, by design).
>
> **==> [STILL OPEN (carried)].**
>
> - Dependabot alerts and malware alerts:  enabled by Michael 2026-10-31 (the `gh` token cannot read or set them; 403).
> - **bio.yml draft is unfinished in the vault** (`D:\brain\00_sitebase\data\bio.yml`:  new title "Senior Technical Product Manager, AI", rewritten paragraphs).  Any publish run will push it.  Finish it first (trailing spaces, missing period on paragraph 2), then publish, then run `scripts\New-VCard.ps1` and `scripts\New-BioQrCode.ps1`.
> - **css_parser 1.22.0 (accepted risk, rechecked 2026-10-31):**  3 advisories need >= 3.x, blocked by `jekyll-3rd-party-libraries` 0.0.1 (`< 2.0`; no newer release).  Only called when `third_party_libraries.download: true`; this site uses `false`, so the vulnerable path never runs.  Recheck if download is ever turned on or the gem releases.
> - **Bootstrap 4.6.2 / mdbootstrap 4.20.0 (accepted risk, rechecked 2026-10-31):**  EOL; CVE-2024-6531 is a carousel XSS.  No carousel in this site's layouts or content.  This fork predates al-folio v1.0.  Upstream v1.0 (2026-06-02) replaced Bootstrap with Tailwind 4.1 (layouts moved to the `al_folio_core` theme gem; Bootstrap survives only as an opt-in `al_folio_bootstrap_compat` shim, deprecated v1.3, removed v2.0).  Upstream latest is v1.2 (2026-08-09).  The real fix is a v1.x migration, a separate project given this fork's custom layouts.
> - **Decision 2026-10-31:  stay on the pre-v1.0 fork as-is** (no al-folio v1.x migration).  Known side effect left in place:  `/repositories/` trophy images are broken (`github-profile-trophy.vercel.app` returns 402) and point at the template default `username=torvalds`.  Fix when wanted:  `repo_trophies.enabled: false` in `_config.yml`, plus the username in vault `00_sitebase/data/repositories.yml` (publish only after bio.yml is finished).
> - **Optional:**  pin remaining actions (`@v1`, `@v4`, `@v6`) to commit SHAs;  prettier 3.9.x and `@shopify/prettier-plugin-liquid` 1.11.x (deploy gates on `prettier --check`; reformat after bumping);  tj-actions/changed-files v47.
> - `bundler-audit` 0.9.3 is installed in the user gem dir for future audits:  `ruby D:/UserData/michael/.local/share/gem/ruby/3.4.0/bin/bundler-audit check --update`.
>
> **==> [COMMITS].**
>
> - `c04915e1` chore: dependency updates + yaml-update-action SHA pin
> - `f7304e03` fix: exclude repo-internal files, deploy guard, `clean: true`
> - `08d9784e` fix: strip UTF-8 BOMs from 8 posts and ai-disclosure
> - `164b1103` fix: pin Ruby 3.3.13 for ubuntu-26.04
> - shared `1a012de` fix(jekyll): republish destinations that still carry a BOM
