# Changelog

All notable changes to the DevOpsWithDami project are documented in this file.

## [Unreleased]

### Added
- **Stats system**: Views, likes, and comments for articles and videos.
  - Database schema extensions: `views` column on `articles`, `likes` and `comments` tables.
  - Dynamic view counting: Article views increment on page load.
  - Like button with anonymous IP‑based tracking.
  - Comment section with form and listing.
- **Custom favicon**: SVG favicon matching the site's logo, replacing default Vite icon.
- **Image support in rich‑text editor**: Custom `ImageNode` and `ImagePlugin` for Lexical editor in admin center.
- **Enhanced gradient overlays**: Expanded color palette for article cards on home and articles pages.

### Changed
- **Video playback fix**: Updated `staticwebapp.config.json` with correct `Permissions‑Policy` and `Content‑Security‑Policy` headers to allow YouTube embeds and resolve Grammarly violations.
- **Azure deployment**: Migrated from Azure App Service to Azure Static Web Apps; updated pipeline configuration.
- **Environment variables**: Pipeline now injects Supabase credentials at build time for Static Web Apps.
- **Navbar search**: Fixed video thumbnail display and click‑to‑open modal.

### Fixed
- **Video thumbnails in search results**: Changed `video.thumbnail_url` to `video.thumbnail`.
- **Video click handler**: Updated to open `VideoPlayerModal` correctly.
- **Azure deployment issues**:
  - Added missing `express` dependency.
  - Corrected static directory path in `server.js`.
  - Set Node.js version to 22 in pipeline.
  - Fixed environment variable names (typo in `VITE_PUBLIC_SUPABASE_ANON_KEY`).
  - Adjusted deployment script to avoid hanging.

### Infrastructure
- **Git repository**: Switched remote to Azure DevOps (`blog‑w‑superbase`).
- **Pipeline**: Updated `azure‑pipelines.yml` for Static Web Apps deployment.
- **Configuration**: Added `staticwebapp.config.json` with navigation fallback and global headers.

## [Previous Work]
- Initial project setup with React, TypeScript, Vite, Tailwind CSS, Supabase.
- Admin dashboard for articles and videos.
- Home page with hero, featured articles, videos, stats, newsletter.
- Articles and videos listing pages.
- Contact page with form.
- Internationalization (i18n) setup.

---

*This changelog follows [Keep a Changelog](https://keepachangelog.com/) principles.*