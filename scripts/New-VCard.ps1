<#
.SYNOPSIS
    Generates michael-gray.vcf from _data/bio.yml.

.DESCRIPTION
    Reads the canonical bio data file and emits a vCard 4.0 file at the
    path referenced by primary_action.href in bio.yml.  The Save Contact
    button on /bio/ links to this file; re-run after any change to name,
    title, location, email user/domain, or the resume URL.

    Parses bio.yml with a small targeted regex pass rather than a full
    YAML parser, so this script has no module dependency.  The fields
    parsed are flat, named, and stable.

.PARAMETER DataPath
    Absolute or relative path to _data/bio.yml.  Defaults to the file
    in the parent of this script.

.PARAMETER OutputPath
    Where to write the .vcf file.  Defaults to assets/files/bio/michael-gray.vcf
    relative to the repo root.

.EXAMPLE
    pwsh ./scripts/New-VCard.ps1

.EXAMPLE
    pwsh ./scripts/New-VCard.ps1 -WhatIf
#>
[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$DataPath,
    [string]$OutputPath
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
if (-not $DataPath) {
    $DataPath = Join-Path (Join-Path $repoRoot '_data') 'bio.yml'
}
if (-not $OutputPath) {
    $OutputPath = Join-Path (Join-Path (Join-Path $repoRoot 'assets') 'files') 'bio'
    $OutputPath = Join-Path $OutputPath 'michael-gray.vcf'
}

if (-not (Test-Path -LiteralPath $DataPath)) {
    throw "bio.yml not found at $DataPath"
}

$lines = Get-Content -LiteralPath $DataPath

$name = $null
$vcardTitle = $null
$city = $null
$region = $null
$country = $null
$phone = $null
$emailUser = $null
$emailDomain = $null
$resumeHref = $null

$section = $null   # 'profile' | 'vcard' | $null
$context = $null   # 'email' | 'resume' | $null

foreach ($raw in $lines) {
    $line = $raw -replace "`r$", ''
    if ($line -match '^\s*#' -or $line.Trim() -eq '') { continue }

    # Top-level key detection (no leading whitespace, ends with colon).
    if ($line -match '^([a-z_]+):') {
        $section = $matches[1]
        $context = $null
        continue
    }

    # New list item under secondary_actions: reset context based on label.
    if ($line -match '^\s*-\s*label:\s*(.+?)\s*$') {
        $label = $matches[1]
        if ($label -eq 'Email') { $context = 'email' }
        elseif ($label -match '^Resume') { $context = 'resume' }
        else { $context = $null }
        continue
    }

    if ($section -eq 'profile') {
        if ($line -match '^\s+name:\s+(.+?)\s*$') { $name = $matches[1] }
        continue
    }

    if ($section -eq 'vcard') {
        if ($line -match '^\s+title:\s+(.+?)\s*$') { $vcardTitle = $matches[1] }
        elseif ($line -match '^\s+city:\s+(.+?)\s*$') { $city = $matches[1] }
        elseif ($line -match '^\s+region:\s+(.+?)\s*$') { $region = $matches[1] }
        elseif ($line -match '^\s+country:\s+(.+?)\s*$') { $country = $matches[1] }
        elseif ($line -match '^\s+phone:\s+"?([^"\s].*?)"?\s*$') { $phone = $matches[1] }
        continue
    }

    if ($context -eq 'email') {
        if ($line -match '^\s+user:\s+(\S+)') { $emailUser = $matches[1] }
        elseif ($line -match '^\s+domain:\s+(\S+)') { $emailDomain = $matches[1] }
    } elseif ($context -eq 'resume') {
        if ($line -match '^\s+href:\s+(\S+)') { $resumeHref = $matches[1] }
    }
}

$email = if ($emailUser -and $emailDomain) { "$emailUser@$emailDomain" } else { $null }
$resume = $resumeHref
$title = $vcardTitle
$location = if ($city -and $region) { "$city, $region" } else { $city }

if (-not $name) { throw "Could not read profile.name from $DataPath" }
if (-not $email) { throw "Could not read email user/domain from $DataPath" }

$nameParts = $name -split '\s+', 2
$firstName = $nameParts[0]
$lastName = if ($nameParts.Count -gt 1) { $nameParts[1] } else { '' }

$siteUrl = 'https://grayminds.com'
$resumeUrl = if ($resume) { "$siteUrl$resume" } else { $null }

$lines = @()
$lines += 'BEGIN:VCARD'
$lines += 'VERSION:4.0'
$lines += "FN:$name"
$lines += "N:$lastName;$firstName;;;"
if ($title) { $lines += "TITLE:$title" }
if ($city -or $region -or $country) {
    $lines += "ADR;TYPE=work:;;;$city;$region;;$country"
}
$lines += "EMAIL;TYPE=work:$email"
if ($phone) { $lines += "TEL;TYPE=cell:$phone" }
$lines += "URL:$siteUrl"
$lines += "URL;TYPE=bio:$siteUrl/bio"
if ($resumeUrl) { $lines += "URL;TYPE=resume:$resumeUrl" }
$lines += "REV:$((Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ'))"
$lines += 'END:VCARD'

$content = ($lines -join "`r`n") + "`r`n"

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $outputDir)) {
    if ($PSCmdlet.ShouldProcess($outputDir, 'Create directory')) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
}

if ($PSCmdlet.ShouldProcess($OutputPath, 'Write vCard')) {
    [System.IO.File]::WriteAllText($OutputPath, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Wrote vCard for $name to $OutputPath"
}
