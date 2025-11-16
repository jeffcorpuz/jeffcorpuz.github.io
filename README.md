# jeffcorpuz.github.io

Personal GitHub Pages site hosting an interactive resume.

## Structure

- `index.html` main page (loads data from `resume.json`).
- `assets/css/style.css` styling with light/dark theme toggle.
- `assets/js/main.js` fetches `resume.json` and renders sections.
- `resume.json` single source of truth for your resume content.

## Quick Edit Steps

- Open `resume.json` and fill real data (name, summary, work, projects, skills, education, contact).
- Commit and push changes:

```powershell
git add resume.json index.html assets/css/style.css assets/js/main.js
git commit -m "Update resume content"
git push
```

- GitHub Pages (user/organization site) deploys automatically. Visit <https://jeffcorpuz.github.io> after ~1 minute.

## Resume JSON Tips

- Keep achievements action-oriented and quantify impact (e.g., "Reduced build time 40% by caching dependencies").
- Prefer present tense for current role, past tense for previous roles.
- List 2–5 bullet highlights per role.
- Use consistent year or month-year format.

## Theming

- Theme toggle persists via `localStorage`.
- Customize colors by editing CSS variables at the top of `style.css`.

## Accessibility & Performance

- Semantic sections with headings for screen readers.
- Minimal JavaScript; all content data-driven via `resume.json`.

## Next Enhancements (optional)

- Add Open Graph meta tags for richer link previews.
- Add a print stylesheet for PDF export.
- Add a Projects subpage or blog.

## Contributing

Direct edits are welcome. Open issues for feature requests.

## License

Content is yours; code structure under permissive terms. (Add explicit license if desired.)
