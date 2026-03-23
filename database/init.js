/**
 * Pure-JS JSON file database for color data.
 * No native compilation required — works on Railway, Heroku, any Node host.
 *
 * File: database/colors.json (auto-created on first run)
 * Extensible: add Pantone, NCS, custom sets via POST /api/colors
 */

const fs   = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "colors.json");

const CSS_COLORS = [
  ["Red","#FF0000","red"],["Crimson","#DC143C","red"],["Firebrick","#B22222","red"],
  ["DarkRed","#8B0000","red"],["Tomato","#FF6347","red"],["Coral","#FF7F50","orange"],
  ["OrangeRed","#FF4500","orange"],["IndianRed","#CD5C5C","red"],["LightCoral","#F08080","red"],
  ["Salmon","#FA8072","red"],["DarkSalmon","#E9967A","orange"],["LightSalmon","#FFA07A","orange"],
  ["Maroon","#800000","red"],["MistyRose","#FFE4E1","pink"],
  ["Orange","#FFA500","orange"],["DarkOrange","#FF8C00","orange"],
  ["Gold","#FFD700","yellow"],["Yellow","#FFFF00","yellow"],["LightYellow","#FFFFE0","yellow"],
  ["LemonChiffon","#FFFACD","yellow"],["LightGoldenrodYellow","#FAFAD2","yellow"],
  ["PapayaWhip","#FFEFD5","yellow"],["Moccasin","#FFE4B5","yellow"],
  ["PeachPuff","#FFDAB9","orange"],["Khaki","#F0E68C","yellow"],["DarkKhaki","#BDB76B","yellow"],
  ["Olive","#808000","green"],["YellowGreen","#9ACD32","green"],["OliveDrab","#6B8E23","green"],
  ["LawnGreen","#7CFC00","green"],["Chartreuse","#7FFF00","green"],["GreenYellow","#ADFF2F","green"],
  ["DarkOliveGreen","#556B2F","green"],["ForestGreen","#228B22","green"],["LimeGreen","#32CD32","green"],
  ["Lime","#00FF00","green"],["SpringGreen","#00FF7F","green"],["MediumSpringGreen","#00FA9A","green"],
  ["MediumSeaGreen","#3CB371","green"],["SeaGreen","#2E8B57","green"],["DarkSeaGreen","#8FBC8F","green"],
  ["LightSeaGreen","#20B2AA","teal"],["PaleGreen","#98FB98","green"],["LightGreen","#90EE90","green"],
  ["MediumAquamarine","#66CDAA","teal"],["DarkGreen","#006400","green"],["Green","#008000","green"],
  ["Teal","#008080","teal"],["DarkCyan","#008B8B","teal"],["Aqua","#00FFFF","cyan"],
  ["Cyan","#00FFFF","cyan"],["LightCyan","#E0FFFF","cyan"],["DarkTurquoise","#00CED1","teal"],
  ["Turquoise","#40E0D0","teal"],["MediumTurquoise","#48D1CC","teal"],["PaleTurquoise","#AFEEEE","cyan"],
  ["Aquamarine","#7FFFD4","teal"],["CadetBlue","#5F9EA0","teal"],
  ["SteelBlue","#4682B4","blue"],["CornflowerBlue","#6495ED","blue"],["DeepSkyBlue","#00BFFF","blue"],
  ["DodgerBlue","#1E90FF","blue"],["LightBlue","#ADD8E6","blue"],["SkyBlue","#87CEEB","blue"],
  ["LightSkyBlue","#87CEFA","blue"],["MidnightBlue","#191970","blue"],["Navy","#000080","blue"],
  ["DarkBlue","#00008B","blue"],["MediumBlue","#0000CD","blue"],["Blue","#0000FF","blue"],
  ["RoyalBlue","#4169E1","blue"],["LightSteelBlue","#B0C4DE","blue"],["PowderBlue","#B0E0E6","blue"],
  ["SlateBlue","#6A5ACD","purple"],["MediumSlateBlue","#7B68EE","purple"],["DarkSlateBlue","#483D8B","purple"],
  ["Indigo","#4B0082","purple"],["DarkViolet","#9400D3","purple"],["DarkOrchid","#9932CC","purple"],
  ["MediumOrchid","#BA55D3","purple"],["Purple","#800080","purple"],["DarkMagenta","#8B008B","purple"],
  ["Fuchsia","#FF00FF","pink"],["Magenta","#FF00FF","pink"],["Violet","#EE82EE","purple"],
  ["BlueViolet","#8A2BE2","purple"],["MediumPurple","#9370DB","purple"],["Orchid","#DA70D6","purple"],
  ["Plum","#DDA0DD","purple"],["Thistle","#D8BFD8","purple"],["Lavender","#E6E6FA","purple"],
  ["HotPink","#FF69B4","pink"],["DeepPink","#FF1493","pink"],["PaleVioletRed","#DB7093","pink"],
  ["MediumVioletRed","#C71585","pink"],["Pink","#FFC0CB","pink"],["LightPink","#FFB6C1","pink"],
  ["LavenderBlush","#FFF0F5","pink"],
  ["Brown","#A52A2A","brown"],["SaddleBrown","#8B4513","brown"],["Sienna","#A0522D","brown"],
  ["Chocolate","#D2691E","brown"],["Peru","#CD853F","brown"],["DarkGoldenrod","#B8860B","brown"],
  ["Goldenrod","#DAA520","brown"],["BurlyWood","#DEB887","brown"],["Tan","#D2B48C","brown"],
  ["Wheat","#F5DEB3","brown"],["NavajoWhite","#FFDEAD","brown"],["Bisque","#FFE4C4","brown"],
  ["BlanchedAlmond","#FFEBCD","brown"],["AntiqueWhite","#FAEBD7","white"],["Beige","#F5F5DC","brown"],
  ["Linen","#FAF0E6","white"],["OldLace","#FDF5E6","white"],["RosyBrown","#BC8F8F","brown"],
  ["Cornsilk","#FFF8DC","white"],["Ivory","#FFFFF0","white"],["FloralWhite","#FFFAF0","white"],
  ["Seashell","#FFF5EE","white"],["White","#FFFFFF","white"],["Snow","#FFFAFA","white"],
  ["WhiteSmoke","#F5F5F5","white"],["GhostWhite","#F8F8FF","white"],
  ["AliceBlue","#F0F8FF","white"],["Azure","#F0FFFF","white"],
  ["MintCream","#F5FFFA","white"],["Honeydew","#F0FFF0","white"],
  ["Gainsboro","#DCDCDC","gray"],["LightGray","#D3D3D3","gray"],["Silver","#C0C0C0","gray"],
  ["DarkGray","#A9A9A9","gray"],["Gray","#808080","gray"],["DimGray","#696969","gray"],
  ["LightSlateGray","#778899","gray"],["SlateGray","#708090","gray"],["DarkSlateGray","#2F4F4F","gray"],
  ["Black","#000000","gray"],
];

const RAL_COLORS = [
  ["Green Beige","#BEBD7F","yellow","RAL 1000"],["Beige","#C2B078","yellow","RAL 1001"],
  ["Sand Yellow","#C6A664","yellow","RAL 1002"],["Signal Yellow","#E5BE01","yellow","RAL 1003"],
  ["Golden Yellow","#CDA434","yellow","RAL 1004"],["Honey Yellow","#A98307","yellow","RAL 1005"],
  ["Maize Yellow","#E4A010","yellow","RAL 1006"],["Curry","#9D9101","yellow","RAL 1027"],
  ["Melon Yellow","#F4A000","orange","RAL 1028"],["Broom Yellow","#F5E500","yellow","RAL 1032"],
  ["Dahlia Yellow","#F0E050","yellow","RAL 1033"],["Pastel Yellow","#F6F600","yellow","RAL 1034"],
  ["Yellow Orange","#ED760E","orange","RAL 2000"],["Red Orange","#C93C20","orange","RAL 2001"],
  ["Vermilion","#CB2821","orange","RAL 2002"],["Pastel Orange","#FF7514","orange","RAL 2003"],
  ["Pure Orange","#F44611","orange","RAL 2004"],["Traffic Orange","#D84B20","orange","RAL 2009"],
  ["Signal Orange","#D84B20","orange","RAL 2010"],["Deep Orange","#EC7C26","orange","RAL 2011"],
  ["Salmon Orange","#E55137","orange","RAL 2012"],["Pearl Orange","#C35831","orange","RAL 2013"],
  ["Flame Red","#AF2B1E","red","RAL 3000"],["Signal Red","#A52019","red","RAL 3001"],
  ["Carmine Red","#A2231D","red","RAL 3002"],["Ruby Red","#9B111E","red","RAL 3003"],
  ["Purple Red","#75151E","red","RAL 3004"],["Wine Red","#5E2129","red","RAL 3005"],
  ["Black Red","#412227","red","RAL 3007"],["Oxide Red","#642424","red","RAL 3009"],
  ["Brown Red","#781F19","red","RAL 3011"],["Beige Red","#C1876B","red","RAL 3012"],
  ["Tomato Red","#A12312","red","RAL 3013"],["Antique Pink","#D36E70","pink","RAL 3014"],
  ["Light Pink","#EA899A","pink","RAL 3015"],["Coral Red","#B32821","red","RAL 3016"],
  ["Rose","#E63244","pink","RAL 3017"],["Strawberry Red","#D53032","red","RAL 3018"],
  ["Traffic Red","#CC0605","red","RAL 3020"],["Salmon Pink","#D95030","pink","RAL 3022"],
  ["Raspberry Red","#C51D34","red","RAL 3027"],["Pure Red","#CB3234","red","RAL 3028"],
  ["Orient Red","#B32428","red","RAL 3031"],
  ["Red Lilac","#6D3F5B","purple","RAL 4001"],["Red Violet","#922B3E","purple","RAL 4002"],
  ["Heather Violet","#DE4C8A","purple","RAL 4003"],["Claret Violet","#641C34","purple","RAL 4004"],
  ["Blue Lilac","#6C4675","purple","RAL 4005"],["Traffic Purple","#A03472","purple","RAL 4006"],
  ["Signal Violet","#924E7D","purple","RAL 4008"],["Pastel Violet","#A18594","purple","RAL 4009"],
  ["Telemagenta","#CF3476","pink","RAL 4010"],["Pearl Violet","#8673A1","purple","RAL 4011"],
  ["Violet Blue","#354D73","blue","RAL 5000"],["Green Blue","#1F3438","blue","RAL 5001"],
  ["Ultramarine Blue","#20214F","blue","RAL 5002"],["Sapphire Blue","#1D1E33","blue","RAL 5003"],
  ["Signal Blue","#1A3550","blue","RAL 5005"],["Brilliant Blue","#003E6F","blue","RAL 5007"],
  ["Grey Blue","#2A6478","blue","RAL 5008"],["Gentian Blue","#0E294B","blue","RAL 5010"],
  ["Light Blue","#3B83BD","blue","RAL 5012"],["Cobalt Blue","#1E213D","blue","RAL 5013"],
  ["Pigeon Blue","#606E8C","blue","RAL 5014"],["Sky Blue","#2271B3","blue","RAL 5015"],
  ["Traffic Blue","#0B6799","blue","RAL 5017"],["Turquoise Blue","#2B9CB7","teal","RAL 5018"],
  ["Capri Blue","#00B0C7","blue","RAL 5019"],["Ocean Blue","#004F7C","blue","RAL 5020"],
  ["Night Blue","#354D73","blue","RAL 5022"],["Distant Blue","#4D5765","blue","RAL 5023"],
  ["Pastel Blue","#606EA0","blue","RAL 5024"],
  ["Patina Green","#316650","green","RAL 6000"],["Emerald Green","#287A37","green","RAL 6001"],
  ["Leaf Green","#2D572C","green","RAL 6002"],["Olive Green","#424632","green","RAL 6003"],
  ["Blue Green","#1F3A2D","green","RAL 6004"],["Moss Green","#2F4538","green","RAL 6005"],
  ["Bottle Green","#343B29","green","RAL 6007"],["Fir Green","#31372B","green","RAL 6009"],
  ["Grass Green","#35682D","green","RAL 6010"],["Reseda Green","#587246","green","RAL 6011"],
  ["Reed Green","#6C7156","green","RAL 6013"],["Yellow Olive","#47402E","green","RAL 6014"],
  ["Turquoise Green","#1E5945","teal","RAL 6016"],["May Green","#4C9141","green","RAL 6017"],
  ["Yellow Green","#57A639","green","RAL 6018"],["Pastel Green","#BDECB6","green","RAL 6019"],
  ["Pale Green","#89AC76","green","RAL 6021"],["Traffic Green","#308446","green","RAL 6024"],
  ["Fern Green","#3D642D","green","RAL 6025"],["Opal Green","#015D52","teal","RAL 6026"],
  ["Light Green","#84C3BE","green","RAL 6027"],["Pine Green","#2C5545","green","RAL 6028"],
  ["Mint Green","#20603D","green","RAL 6029"],["Signal Green","#317F43","green","RAL 6032"],
  ["Mint Turquoise","#497E76","teal","RAL 6033"],["Pastel Turquoise","#7FB5B5","teal","RAL 6034"],
  ["Squirrel Grey","#78858B","gray","RAL 7000"],["Silver Grey","#8A9597","gray","RAL 7001"],
  ["Olive Grey","#817F68","gray","RAL 7002"],["Moss Grey","#6C7059","gray","RAL 7003"],
  ["Signal Grey","#969992","gray","RAL 7004"],["Mouse Grey","#646B63","gray","RAL 7005"],
  ["Iron Grey","#434B4D","gray","RAL 7011"],["Basalt Grey","#4E5754","gray","RAL 7012"],
  ["Brown Grey","#464531","gray","RAL 7013"],["Slate Grey","#434750","gray","RAL 7015"],
  ["Anthracite Grey","#293133","gray","RAL 7016"],["Black Grey","#23282B","gray","RAL 7021"],
  ["Concrete Grey","#686C5E","gray","RAL 7023"],["Graphite Grey","#474A51","gray","RAL 7024"],
  ["Granite Grey","#2F353B","gray","RAL 7026"],["Stone Grey","#8B8C7A","gray","RAL 7030"],
  ["Blue Grey","#474B4E","gray","RAL 7031"],["Pebble Grey","#B8B799","gray","RAL 7032"],
  ["Cement Grey","#7D8471","gray","RAL 7033"],["Yellow Grey","#8F8B66","gray","RAL 7034"],
  ["Light Grey","#D7D7D7","gray","RAL 7035"],["Platinum Grey","#7F7679","gray","RAL 7036"],
  ["Dusty Grey","#7D7F7D","gray","RAL 7037"],["Agate Grey","#B5B8B1","gray","RAL 7038"],
  ["Quartz Grey","#6C6960","gray","RAL 7039"],["Window Grey","#9DA1AA","gray","RAL 7040"],
  ["Traffic Grey A","#8D948D","gray","RAL 7042"],["Traffic Grey B","#4E5452","gray","RAL 7043"],
  ["Silk Grey","#CAC4B0","gray","RAL 7044"],["Telegrey 1","#909090","gray","RAL 7045"],
  ["Telegrey 2","#82898F","gray","RAL 7046"],["Telegrey 4","#D0D0D0","gray","RAL 7047"],
  ["Green Brown","#826C34","brown","RAL 8000"],["Ochre Brown","#955F20","brown","RAL 8001"],
  ["Signal Brown","#6C3B2A","brown","RAL 8002"],["Clay Brown","#734222","brown","RAL 8003"],
  ["Copper Brown","#8E402A","brown","RAL 8004"],["Fawn Brown","#59351F","brown","RAL 8007"],
  ["Olive Brown","#6F4F28","brown","RAL 8008"],["Nut Brown","#5B3A29","brown","RAL 8009"],
  ["Sepia Brown","#382C1E","brown","RAL 8014"],["Chestnut Brown","#633A34","brown","RAL 8015"],
  ["Mahogany Brown","#4C2F27","brown","RAL 8016"],["Chocolate Brown","#45322E","brown","RAL 8017"],
  ["Grey Brown","#403A3A","brown","RAL 8019"],["Black Brown","#212121","brown","RAL 8022"],
  ["Orange Brown","#A65E2E","brown","RAL 8023"],["Beige Brown","#79553D","brown","RAL 8024"],
  ["Pale Brown","#755C48","brown","RAL 8025"],
  ["Cream White","#FDF4E3","white","RAL 9001"],["Grey White","#E7EBDA","white","RAL 9002"],
  ["Signal White","#F4F4F4","white","RAL 9003"],["Signal Black","#282828","gray","RAL 9004"],
  ["Jet Black","#0A0A0A","gray","RAL 9005"],["White Aluminium","#A5A5A5","gray","RAL 9006"],
  ["Grey Aluminium","#8F8F8F","gray","RAL 9007"],["Pure White","#F4F4F4","white","RAL 9010"],
  ["Graphite Black","#1C1C1C","gray","RAL 9011"],["Traffic White","#F6F6F6","white","RAL 9016"],
  ["Traffic Black","#1E1E1E","gray","RAL 9017"],["Papyrus White","#D7D7D7","white","RAL 9018"],
];

class ColorDB {
  constructor() {
    this.data = null;
    this._load();
  }

  _load() {
    if (fs.existsSync(DB_PATH)) {
      try {
        this.data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
        console.log(`Loaded ${this.data.colors.length} colors from database`);
        return;
      } catch (e) {
        console.warn("DB file corrupt, re-seeding:", e.message);
      }
    }
    this._seed();
  }

  _seed() {
    let id = 1;
    const now = new Date().toISOString();
    const colors = [];
    for (const [name, hex, family] of CSS_COLORS) {
      colors.push({ id: id++, name, hex: hex.toUpperCase(), family, source: "css", code: null, created_at: now });
    }
    for (const [name, hex, family, code] of RAL_COLORS) {
      colors.push({ id: id++, name, hex: hex.toUpperCase(), family, source: "ral", code, created_at: now });
    }
    this.data = { version: 1, colors };
    this._save();
    console.log(`Database seeded: ${CSS_COLORS.length} CSS + ${RAL_COLORS.length} RAL colors`);
  }

  _save() {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  getAll({ source, family } = {}) {
    let c = [...this.data.colors];
    if (source) c = c.filter(x => x.source === source);
    if (family) c = c.filter(x => x.family === family);
    return c.sort((a, b) => a.family.localeCompare(b.family) || a.name.localeCompare(b.name));
  }

  getSources() {
    const map = {};
    for (const c of this.data.colors) map[c.source] = (map[c.source] || 0) + 1;
    return Object.entries(map).map(([source, count]) => ({ source, count })).sort((a, b) => a.source.localeCompare(b.source));
  }

  getFamilies() {
    const map = {};
    for (const c of this.data.colors) map[c.family] = (map[c.family] || 0) + 1;
    return Object.entries(map).map(([family, count]) => ({ family, count })).sort((a, b) => b.count - a.count);
  }

  add({ name, hex, family = "other", source = "custom", code = null }) {
    const upper = hex.toUpperCase();
    if (this.data.colors.find(c => c.hex === upper && c.source === source)) return null;
    const newColor = {
      id: Math.max(0, ...this.data.colors.map(c => c.id)) + 1,
      name, hex: upper, family, source, code,
      created_at: new Date().toISOString()
    };
    this.data.colors.push(newColor);
    this._save();
    return newColor;
  }

  findNearest(hex, source = null) {
    const pool = source ? this.data.colors.filter(c => c.source === source) : this.data.colors;
    const p = hex.replace("#", "").toUpperCase();
    const r1 = parseInt(p.slice(0,2),16), g1 = parseInt(p.slice(2,4),16), b1 = parseInt(p.slice(4,6),16);
    let best = null, bd = Infinity;
    for (const c of pool) {
      const h = c.hex.replace("#","");
      const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
      const d = Math.sqrt((r1-r)**2+(g1-g)**2+(b1-b)**2);
      if (d < bd) { bd = d; best = c; }
    }
    return best ? { ...best, distance: Math.round(bd), exact: bd < 1 } : null;
  }
}

let instance = null;
function getDB() { if (!instance) instance = new ColorDB(); return instance; }
module.exports = { getDB };
