

Write-Host "🎨 Converting all HTML pages to TSX..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$pages = @{
    "founding.html" = "founding-member"
    "audit.html" = "free-audit"
    "label.html" = "label"
    "missing.html" = "missing-royalties"
    "newsplit.html" = "split-verification"
}

foreach ($htmlFile in $pages.Keys) {
    $pageName = $pages[$htmlFile]
    $htmlPath = "new-html-pages/$htmlFile"
    $outputDir = "app/$pageName"
    $outputPath = "$outputDir/page.tsx"
    
    Write-Host "`n📄 Converting $htmlFile → $pageName..." -ForegroundColor Yellow
    
    # Check if HTML file exists
    if (-not (Test-Path $htmlPath)) {
        Write-Host "❌ HTML file not found: $htmlPath" -ForegroundColor Red
        continue
    }
    
    # Read HTML content
    $htmlContent = Get-Content $htmlPath -Raw
    
    # Basic conversions
    $tsxContent = $htmlContent
    $tsxContent = $tsxContent -replace 'class="', 'className="'
    $tsxContent = $tsxContent -replace 'for="', 'htmlFor="'
    $tsxContent = $tsxContent -replace 'style="([^"]*)"', 'style={{$1}}'
    
    # Remove HTML document wrappers
    $tsxContent = $tsxContent -replace '<!DOCTYPE.*?>', ''
    $tsxContent = $tsxContent -replace '<html.*?>', ''
    $tsxContent = $tsxContent -replace '</html>', ''
    $tsxContent = $tsxContent -replace '<head.*?>.*?</head>', ''
    $tsxContent = $tsxContent -replace '<body.*?>', ''
    $tsxContent = $tsxContent -replace '</body>', ''
    
    # Create output directory if it doesn't exist
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
        Write-Host "📁 Created directory: $outputDir" -ForegroundColor Gray
    }
    
    # Create the full TSX file with proper structure (using here-string)
    $fullTsx = @"
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ${pageName.Replace('-', '')}Page() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="container mx-auto px-6 py-16">
$tsxContent
      </main>
      <Footer />
    </div>
  );
}
"@
    
    # Save the file
    $fullTsx | Out-File -FilePath $outputPath -Encoding utf8
    
    Write-Host "✅ Created: $outputPath" -ForegroundColor Green
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "🎉 All pages converted successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Open each file in VS Code to check for any remaining issues" -ForegroundColor White
Write-Host "2. Test each page at:" -ForegroundColor White
Write-Host "   • http://localhost:3002/founding-member" -ForegroundColor Gray
Write-Host "   • http://localhost:3002/free-audit" -ForegroundColor Gray
Write-Host "   • http://localhost:3002/label" -ForegroundColor Gray
Write-Host "   • http://localhost:3002/missing-royalties" -ForegroundColor Gray
Write-Host "   • http://localhost:3002/split-verification" -ForegroundColor Gray