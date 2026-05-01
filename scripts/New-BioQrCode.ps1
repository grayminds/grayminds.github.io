<#
.SYNOPSIS
    Generates QR codes for the /bio/ page.

.DESCRIPTION
    Produces three artifacts in assets/img/bio/qr/:
        grayminds-bio.svg        vector, infinite zoom, for print
        grayminds-bio-1024.png   raster, 1024px, for slides and badges
        grayminds-bio-256.png    raster, 256px, for embedding on the page

    Encodes the URL passed via -Url (default: https://grayminds.com/bio)
    at error-correction level Q so a logo overlay works later if you want
    one.  Re-run when the bio's canonical URL changes (e.g., when Phase 2
    introduces bio.grayminds.com).

    Uses Python's `qrcode` library.  Auto-installs the library into the
    user's Python environment on first run if missing.

.PARAMETER Url
    URL to encode.  Defaults to https://grayminds.com/bio.

.PARAMETER OutputDir
    Where to write the QR files.  Defaults to assets/img/bio/qr/.

.PARAMETER BaseName
    Filename stem.  Defaults to grayminds-bio.

.PARAMETER Python
    Python executable to use.  Defaults to D:\codetools\python-3\python.exe
    on Windows; falls back to `python` on PATH.

.EXAMPLE
    pwsh ./scripts/New-BioQrCode.ps1

.EXAMPLE
    pwsh ./scripts/New-BioQrCode.ps1 -Url https://bio.grayminds.com

.EXAMPLE
    pwsh ./scripts/New-BioQrCode.ps1 -WhatIf
#>
[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$Url = 'https://grayminds.com/bio',
    [string]$OutputDir,
    [string]$BaseName = 'grayminds-bio',
    [string]$Python
)

$ErrorActionPreference = 'Stop'

if (-not $OutputDir) {
    $repoRoot = Split-Path -Parent $PSScriptRoot
    $OutputDir = Join-Path (Join-Path (Join-Path (Join-Path $repoRoot 'assets') 'img') 'bio') 'qr'
}

if (-not $Python) {
    $candidate = 'D:\codetools\python-3\python.exe'
    if (Test-Path -LiteralPath $candidate) {
        $Python = $candidate
    } else {
        $Python = 'python'
    }
}

function Test-PythonModule {
    param([string]$Module)
    $oldEAP = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        & $Python -c "import $Module" *> $null
        return ($LASTEXITCODE -eq 0)
    } finally {
        $ErrorActionPreference = $oldEAP
    }
}

if (-not (Test-PythonModule 'qrcode')) {
    if ($PSCmdlet.ShouldProcess('qrcode[pil]', 'pip install --user')) {
        Write-Host 'Installing qrcode[pil] (one-time)...'
        & $Python -m pip install --user --quiet 'qrcode[pil]'
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to install qrcode.  Run:  $Python -m pip install qrcode[pil]"
        }
    }
}

if (-not (Test-Path -LiteralPath $OutputDir)) {
    if ($PSCmdlet.ShouldProcess($OutputDir, 'Create directory')) {
        New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    }
}

$svgPath = Join-Path $OutputDir "$BaseName.svg"
$png1024 = Join-Path $OutputDir "$BaseName-1024.png"
$png256 = Join-Path $OutputDir "$BaseName-256.png"

$pyScript = @"
import sys
import qrcode
import qrcode.image.svg
from PIL import Image

url = sys.argv[1]
svg_path = sys.argv[2]
png_1024_path = sys.argv[3]
png_256_path = sys.argv[4]

# SVG, vector, infinite scale.
factory = qrcode.image.svg.SvgImage
svg = qrcode.make(url, image_factory=factory, error_correction=qrcode.constants.ERROR_CORRECT_Q, box_size=10, border=4)
svg.save(svg_path)
print('wrote ' + svg_path)

# Render once at natural size, then resize via NEAREST so module edges
# stay crisp.  Avoids the integer-divided box-size drift you get from
# computing pixels-per-module and re-rendering.
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_Q, box_size=10, border=4)
qr.add_data(url)
qr.make(fit=True)
base = qr.make_image(fill_color='black', back_color='white').convert('RGB')

base.resize((1024, 1024), resample=Image.NEAREST).save(png_1024_path)
print('wrote ' + png_1024_path)

base.resize((256, 256), resample=Image.NEAREST).save(png_256_path)
print('wrote ' + png_256_path)
"@

$pyTemp = [System.IO.Path]::GetTempFileName() -replace '\.tmp$', '.py'
[System.IO.File]::WriteAllText($pyTemp, $pyScript, [System.Text.UTF8Encoding]::new($false))

try {
    if ($PSCmdlet.ShouldProcess("$svgPath, $png1024, $png256", "Generate QR codes for $Url")) {
        & $Python $pyTemp $Url $svgPath $png1024 $png256
        if ($LASTEXITCODE -ne 0) {
            throw "QR generation failed (exit $LASTEXITCODE)."
        }
    }
} finally {
    Remove-Item -LiteralPath $pyTemp -Force -ErrorAction SilentlyContinue
}
