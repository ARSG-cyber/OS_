#!/bin/bash

# Khan OS - Project Setup Verification Script
# This script helps verify the project structure after creation

echo "🔍 Khan OS Project Verification"
echo "================================"
echo ""

# Check Node version
echo "📦 Checking Node.js version..."
node --version

echo ""
echo "📁 Verifying project structure..."
echo ""

# Array of critical files and folders
files=(
    "package.json"
    "tsconfig.json"
    "tailwind.config.ts"
    "vite.config.ts"
    "index.html"
    "src/main.tsx"
    "src/app/App.tsx"
    "src/pages/Dashboard.tsx"
    "src/pages/NexusPulse.tsx"
    "src/pages/ProjectEvolution.tsx"
    "src/pages/AIControlCenter.tsx"
    "src/pages/AnalyticsCenter.tsx"
    "src/pages/Settings.tsx"
    "src/components/common/Layout.tsx"
    "src/components/common/Components.tsx"
    "src/hooks/index.ts"
    "src/services/api.ts"
    "src/types/index.ts"
    "src/utils/index.ts"
    "src/context/providers.tsx"
    ".env.example"
    "README.md"
    "DEVELOPMENT.md"
    "QUICKSTART.md"
)

echo "Checking critical files and folders..."
echo ""

missing=0
found=0

for file in "${files[@]}"; do
    if [ -f "$file" ] || [ -d "$file" ]; then
        echo "✅ $file"
        ((found++))
    else
        echo "❌ $file (MISSING)"
        ((missing++))
    fi
done

echo ""
echo "================================"
echo "Results:"
echo "  Found: $found"
echo "  Missing: $missing"
echo ""

if [ $missing -eq 0 ]; then
    echo "✅ All files verified!"
    echo ""
    echo "Next steps:"
    echo "1. npm install"
    echo "2. npm run dev"
    echo "3. Open http://localhost:3000"
    echo ""
else
    echo "⚠️  Some files are missing!"
    echo "Please check the file structure."
    echo ""
fi

echo "📖 Documentation available:"
echo "  - README.md - Full documentation"
echo "  - DEVELOPMENT.md - Development guide"
echo "  - QUICKSTART.md - Quick start guide"
echo "  - VERIFICATION_CHECKLIST.md - Checklist"
echo "  - FILE_MANIFEST.md - File listing"
echo ""
echo "🎉 Setup verification complete!"
