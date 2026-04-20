const express = require("express");
const path    = require("path");
const { getDB } = require("./database/init");

const app  = express();
const PORT = process.env.PORT || 3000;
const SITE = process.env.SITE_URL || "https://coloralyze.com";

app.use(express.json());

// ── Security & cache headers ──────────────────────────────
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// ── Static files with caching ─────────────────────────────
app.use(express.static(path.join(__dirname, "public"), {
  maxAge: "7d",
  etag: true,
  setHeaders(res, filePath) {
    // HTML never cached — always fresh
    if (filePath.endsWith(".html") || filePath.endsWith("favicon.svg")) res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  }
}));

// ── API ───────────────────────────────────────────────────
app.get("/api/colors", (req, res) => {
  try {
    const { source, family } = req.query;
    res.json(getDB().getAll({ source, family }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/api/colors/sources", (req, res) => {
  try { res.json(getDB().getSources()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/api/colors/families", (req, res) => {
  try { res.json(getDB().getFamilies()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/api/colors/nearest", (req, res) => {
  const { hex, source } = req.query;
  if (!hex || !/^#?[0-9A-Fa-f]{6}$/.test(hex))
    return res.status(400).json({ error: "Invalid hex. Use format #RRGGBB or RRGGBB" });
  try {
    const h = hex.startsWith("#") ? hex : `#${hex}`;
    res.json(getDB().findNearest(h, source || null));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/colors", (req, res) => {
  const { name, hex, family, source, code } = req.body;
  if (!name || !hex || !/^#[0-9A-Fa-f]{6}$/.test(hex))
    return res.status(400).json({ error: "name and valid hex (#RRGGBB) are required" });
  try {
    const color = getDB().add({ name, hex, family, source, code });
    if (!color) return res.status(409).json({ error: "Color already exists" });
    res.status(201).json(color);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Page routes ───────────────────────────────────────────
const page = (f) => (req, res) => res.sendFile(path.join(__dirname, "public", f));

app.get("/image",              page("image.html"));
app.get("/pantone-color-finder", page("pantone.html"));
app.get("/ral-classic-colors", page("ral-classic.html"));
app.get("/ral-design-colors",  page("ral-design.html"));
app.get("/ncs-colors",         page("ncs.html"));
app.get("/css-color-names",    page("css-colors.html"));
app.get("/blog",               page("blog.html"));
app.get("/blog/",              page("blog.html"));
app.get("/blog/:slug",         (req, res) => {
  const f = path.join(__dirname, "public", "blog", req.params.slug + ".html");
  res.sendFile(f, err => { if (err) res.sendFile(path.join(__dirname, "public", "404.html")); });
});

// ── SEO files ─────────────────────────────────────────────
app.get("/sitemap.xml", (req, res) => {
  const pages = [
    { url: "/",                    priority: "1.0", freq: "weekly" },
    { url: "/image",               priority: "0.9", freq: "weekly" },
    { url: "/pantone-color-finder",priority: "0.8", freq: "monthly" },
    { url: "/ral-classic-colors",  priority: "0.8", freq: "monthly" },
    { url: "/ral-design-colors",   priority: "0.8", freq: "monthly" },
    { url: "/ncs-colors",          priority: "0.8", freq: "monthly" },
    { url: "/css-color-names",     priority: "0.8", freq: "monthly" },
    { url: "/blog",                priority: "0.7", freq: "weekly" },
    { url: "/blog/ral-classic-vs-ral-design",    priority: "0.6", freq: "monthly" },
    { url: "/blog/how-to-find-pantone-from-photo",priority: "0.6", freq: "monthly" },
    { url: "/blog/what-is-ncs-color-system",     priority: "0.6", freq: "monthly" },
    { url: "/blog/how-to-use-hex-in-canva",      priority: "0.6", freq: "monthly" },
    { url: "/blog/eyedropper-api-guide",         priority: "0.6", freq: "monthly" },
    { url: "/blog/complete-guide-color-standards",priority:"0.6", freq: "monthly" },
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${SITE}${p.url}</loc>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
  res.header("Content-Type", "application/xml").send(xml);
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
    `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`
  );
});

app.get("/llms.txt", (req, res) => {
  const db = getDB();
  const sources = db.getSources().map(s => `  - ${s.source.toUpperCase()}: ${s.count} colors`).join("\n");
  res.type("text/plain").send(`# Coloralyze
> Free color tool — identify color names across CSS, RAL, Pantone and NCS standards.
> URL: ${SITE}

## Tools
- Pick Color from Screen (EyeDropper API — Chrome/Edge)
- Pick Color from Image (canvas pixel picker — all browsers)
- HEX / RGB / HSL converter
- Complementary and triadic palette generator
- Color psychology

## Color Database
${sources}
Total: ${db.getAll().length} named colors
Extensible via POST /api/colors

## Pages
- / — Pick from screen
- /image — Pick from image
- /pantone-color-finder — Pantone color lookup
- /ral-classic-colors — RAL Classic chart
- /ral-design-colors — RAL Design chart
- /ncs-colors — NCS color lookup
- /css-color-names — CSS named colors list
- /blog — Knowledge articles

## API
- GET  /api/colors
- GET  /api/colors/nearest?hex=%23FF0000&source=pantone
- GET  /api/colors/sources
- POST /api/colors
`);
});

// ── Catch-all ─────────────────────────────────────────────
app.get("*", page("index.html"));

app.listen(PORT, () => console.log(`Coloralyze → ${SITE} (port ${PORT})`));
