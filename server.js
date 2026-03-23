const express = require("express");
const path    = require("path");
const { getDB } = require("./database/init");

const app  = express();
const PORT = process.env.PORT || 3000;
const SITE = process.env.SITE_URL || `http://localhost:${PORT}`;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── API ────────────────────────────────────────────────────

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
    if (!color) return res.status(409).json({ error: "Color with this hex+source already exists" });
    res.status(201).json(color);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── SEO files ──────────────────────────────────────────────

app.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type","application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>`);
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(`User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
});

app.get("/llms.txt", (req, res) => {
  const db = getDB();
  const sources = db.getSources().map(s => `  - ${s.source.toUpperCase()}: ${s.count} colors`).join("\n");
  res.type("text/plain").send(`# Color Analyzer
> Free tool to identify color names and convert between HEX, RGB, HSL.

## Features
- EyeDropper: pick any color from your screen (Chrome/Edge)
- Image pixel picker: upload a photo and click any pixel
- Color name lookup against CSS named colors and RAL Classic
- HEX ↔ RGB ↔ HSL conversion
- Complementary and triadic palette generator

## Color Database
${sources}
Extensible via POST /api/colors (add Pantone, NCS, custom sets)

## API
- GET  /api/colors                    — all colors (filter: ?source=css|ral&family=red)
- GET  /api/colors/nearest?hex=%23FF0000 — nearest named color for a HEX value
- GET  /api/colors/sources            — available standards with counts
- GET  /api/colors/families           — color families with counts
- POST /api/colors                    — add a color {name, hex, family, source, code}
`);
});

// ── Page routes ────────────────────────────────────────────
app.get("/image", (req, res) => res.sendFile(path.join(__dirname, "public", "image.html")));

// ── Catch-all → index.html ─────────────────────────────────
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => console.log(`Color Analyzer → ${SITE}`));
