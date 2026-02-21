# About Page Redesign - Implementation Guide

## Overview

This package converts the about page from al-folio's default single-column layout to a
two-column layout with a content-rich sidebar.  The bio text has been tightened (~40% shorter)
with visual emphasis elements.

## Files Included

| File | Destination in Repo | Purpose |
|------|-------------------|---------|
| `_layouts/about_custom.liquid` | `_layouts/about_custom.liquid` | Custom two-column layout |
| `_sass/_about_custom.scss` | `_sass/_about_custom.scss` | All custom styles |
| `_pages/about.md` | `_pages/about.md` | Revised bio with new frontmatter |
| `preview_about_page.html` | (do not deploy) | Visual preview only |

## Installation Steps

### Step 1: Back up your current about.md

```powershell
cd C:\code\grayminds\grayminds.github.io
Copy-Item _pages\about.md _pages\about.md.bak
```

### Step 2: Copy the new files

```powershell
# Copy layout
Copy-Item about_custom.liquid _layouts\about_custom.liquid

# Copy stylesheet
Copy-Item _about_custom.scss _sass\_about_custom.scss

# Copy revised about page
Copy-Item about.md _pages\about.md
```

### Step 3: Import the SCSS

Open `_sass/_base.scss` and add this line at the bottom:

```scss
@import "about_custom";
```

If your theme uses a different main SCSS entry point (check `_sass/al-folio.scss` or similar),
add the import there instead.

### Step 4: Update your YouTube link

In `_layouts/about_custom.liquid`, find the YouTube link placeholder (`href="#"`) and replace
it with your actual YouTube channel URL.

### Step 5: Test locally

```powershell
bundle exec jekyll serve
```

Open `http://localhost:4000` and verify the layout.

### Step 6: Commit and push

```powershell
git add _layouts/about_custom.liquid _sass/_about_custom.scss _pages/about.md
git commit -m "Redesign about page: two-column layout with sidebar cards"
git push
```

## What Changed in the Bio

**Removed:**
- Film score / cinematography paragraph (restated the tapestry point)
- "Perhaps we might have threads in common" intro line (replaced by clusters)
- "Get in Touch" H2 section (replaced by sidebar contact card)

**Added / Changed:**
- Opening question bolded for visual weight
- "I call it a tapestry" pulled out as a styled block element with left border accent
- "It shaped it" and "no algorithm should be trusted to handle alone" bolded as anchor phrases
- Keyword clusters (Build / Create / Explore) replace the flat facet link list
- Sidebar cards for What I Believe and What Keeps Me Up with teaser excerpts

## Customization Notes

**Theme color:** The SCSS uses `var(--global-theme-color)` which inherits from al-folio's
theme settings.  No hardcoded colors.

**Sidebar excerpts:** The teaser text in the sidebar cards is hardcoded in the layout file.
If you change the content on those pages, update the excerpts in `about_custom.liquid` to match.

**Cluster groupings:** Edit the clusters directly in `about_custom.liquid`.  If you add new
facet pages, add them to the appropriate cluster.

**Mobile behavior:** On screens under 768px, the sidebar (photo + cards) stacks above the bio.
This puts your face and perspective front and center on mobile.
