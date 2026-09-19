# Enxuan Ruan — Personal Homepage

English academic homepage for Enxuan Ruan (阮恩暄), based on [PRISM](https://github.com/xyjoey/PRISM).

## Development

Requires Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

## Content

- `content/config.toml`: name, institution, links, navigation and metadata.
- `content/bio.md`: introduction and research interests.
- `content/vision.md`: research vision.
- `content/education.md`: education and expected graduation date.
- `content/about.toml`: homepage sections.
- `CONTENT_NOTES.md`: confirmed facts and editing constraints.

The page is English-only, with a Chinese name alongside the English name. It intentionally has no portrait, email, publications, projects, awards or CV.

## Verification and static build

```sh
npm run lint
npm run typecheck
npm run build
```

The static website is generated in `out/`.

## GitHub Pages

Target repository: `Rex2ing/Rex2ing.github.io`.
Target URL after deployment: https://rex2ing.github.io/

The source lives on `main`; the built static site is published from the root of `gh-pages`. In repository Settings > Pages, select **Deploy from a branch**, `gh-pages`, and `/ (root)`. Rebuild and update that branch when publishing changes. An optional GitHub Actions workflow is provided in `docs/github-pages-workflow.yml`; enabling it later requires moving it to `.github/workflows/deploy.yml` and changing the Pages source to GitHub Actions.

## Credits

Adapted from PRISM by xyjoey, distributed under the MIT License. The original license is retained in `LICENSE` and the site footer links to the template.