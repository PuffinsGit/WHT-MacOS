# WorkedHoursTracker (WHT) — macOS

GitHub-ready source for **WHT ALPHA v1.1**. GitHub Actions builds installable
macOS packages for Apple Silicon (`arm64`) and Intel (`x64`) MacBooks.

## Build with GitHub

1. Create a GitHub repository and upload all files from this project.
2. Open **Actions**, select **Build macOS App**, then choose **Run workflow**.
3. Download `arm64` for Apple Silicon (M-series) or `x64` for an Intel Mac.
4. Open the DMG and drag **WorkedHoursTracker** into Applications.

## First launch

This build is not Apple-notarized. If macOS blocks it, Control-click the app,
choose **Open**, then choose **Open** again. You can also allow it under
**System Settings > Privacy & Security**.

## Local development

With Node.js 22 or newer, run `npm ci` followed by `npm start`. On a Mac,
`npm run dist:mac -- --arm64` creates an Apple Silicon installer.

Exports are saved under `Documents/WHT/Exports`.

© 2026 Mark Breddy · Puffins
