/**
 * Color Analyzer — Full Color Database
 * Pure-JS JSON file, no native compilation required.
 *
 * Sources (HEX approximations from publicly available references):
 *   css        — W3C CSS Named Colors (complete, 148)
 *   ral_classic— RAL Classic (complete, 213)
 *   ral_design — RAL Design System+ (representative, ~200)
 *   pantone    — Pantone Solid Coated (popular subset, ~450)
 *   ncs        — NCS Natural Color System (representative, ~350)
 *
 * Note: Pantone® and NCS® are registered trademarks. HEX values are
 * screen approximations widely published in open design references.
 * Physical color appearance may differ from screen representation.
 */

const fs   = require("fs");
const path = require("path");
const DB_PATH = path.join(__dirname, "colors.json");

// ── CSS Named Colors — W3C Complete ───────────────────────
const CSS = [
  ["AliceBlue","#F0F8FF","white"],["AntiqueWhite","#FAEBD7","white"],["Aqua","#00FFFF","cyan"],
  ["Aquamarine","#7FFFD4","teal"],["Azure","#F0FFFF","white"],["Beige","#F5F5DC","brown"],
  ["Bisque","#FFE4C4","brown"],["Black","#000000","gray"],["BlanchedAlmond","#FFEBCD","brown"],
  ["Blue","#0000FF","blue"],["BlueViolet","#8A2BE2","purple"],["Brown","#A52A2A","brown"],
  ["BurlyWood","#DEB887","brown"],["CadetBlue","#5F9EA0","teal"],["Chartreuse","#7FFF00","green"],
  ["Chocolate","#D2691E","brown"],["Coral","#FF7F50","orange"],["CornflowerBlue","#6495ED","blue"],
  ["Cornsilk","#FFF8DC","white"],["Crimson","#DC143C","red"],["Cyan","#00FFFF","cyan"],
  ["DarkBlue","#00008B","blue"],["DarkCyan","#008B8B","teal"],["DarkGoldenrod","#B8860B","brown"],
  ["DarkGray","#A9A9A9","gray"],["DarkGreen","#006400","green"],["DarkGrey","#A9A9A9","gray"],
  ["DarkKhaki","#BDB76B","yellow"],["DarkMagenta","#8B008B","purple"],["DarkOliveGreen","#556B2F","green"],
  ["DarkOrange","#FF8C00","orange"],["DarkOrchid","#9932CC","purple"],["DarkRed","#8B0000","red"],
  ["DarkSalmon","#E9967A","orange"],["DarkSeaGreen","#8FBC8F","green"],["DarkSlateBlue","#483D8B","purple"],
  ["DarkSlateGray","#2F4F4F","gray"],["DarkSlateGrey","#2F4F4F","gray"],["DarkTurquoise","#00CED1","teal"],
  ["DarkViolet","#9400D3","purple"],["DeepPink","#FF1493","pink"],["DeepSkyBlue","#00BFFF","blue"],
  ["DimGray","#696969","gray"],["DimGrey","#696969","gray"],["DodgerBlue","#1E90FF","blue"],
  ["Firebrick","#B22222","red"],["FloralWhite","#FFFAF0","white"],["ForestGreen","#228B22","green"],
  ["Fuchsia","#FF00FF","pink"],["Gainsboro","#DCDCDC","gray"],["GhostWhite","#F8F8FF","white"],
  ["Gold","#FFD700","yellow"],["Goldenrod","#DAA520","yellow"],["Gray","#808080","gray"],
  ["Green","#008000","green"],["GreenYellow","#ADFF2F","green"],["Grey","#808080","gray"],
  ["Honeydew","#F0FFF0","white"],["HotPink","#FF69B4","pink"],["IndianRed","#CD5C5C","red"],
  ["Indigo","#4B0082","purple"],["Ivory","#FFFFF0","white"],["Khaki","#F0E68C","yellow"],
  ["Lavender","#E6E6FA","purple"],["LavenderBlush","#FFF0F5","pink"],["LawnGreen","#7CFC00","green"],
  ["LemonChiffon","#FFFACD","yellow"],["LightBlue","#ADD8E6","blue"],["LightCoral","#F08080","red"],
  ["LightCyan","#E0FFFF","cyan"],["LightGoldenrodYellow","#FAFAD2","yellow"],["LightGray","#D3D3D3","gray"],
  ["LightGreen","#90EE90","green"],["LightGrey","#D3D3D3","gray"],["LightPink","#FFB6C1","pink"],
  ["LightSalmon","#FFA07A","orange"],["LightSeaGreen","#20B2AA","teal"],["LightSkyBlue","#87CEFA","blue"],
  ["LightSlateGray","#778899","gray"],["LightSlateGrey","#778899","gray"],["LightSteelBlue","#B0C4DE","blue"],
  ["LightYellow","#FFFFE0","yellow"],["Lime","#00FF00","green"],["LimeGreen","#32CD32","green"],
  ["Linen","#FAF0E6","white"],["Magenta","#FF00FF","pink"],["Maroon","#800000","red"],
  ["MediumAquamarine","#66CDAA","teal"],["MediumBlue","#0000CD","blue"],["MediumOrchid","#BA55D3","purple"],
  ["MediumPurple","#9370DB","purple"],["MediumSeaGreen","#3CB371","green"],["MediumSlateBlue","#7B68EE","purple"],
  ["MediumSpringGreen","#00FA9A","green"],["MediumTurquoise","#48D1CC","teal"],["MediumVioletRed","#C71585","pink"],
  ["MidnightBlue","#191970","blue"],["MintCream","#F5FFFA","white"],["MistyRose","#FFE4E1","pink"],
  ["Moccasin","#FFE4B5","brown"],["NavajoWhite","#FFDEAD","brown"],["Navy","#000080","blue"],
  ["OldLace","#FDF5E6","white"],["Olive","#808000","green"],["OliveDrab","#6B8E23","green"],
  ["Orange","#FFA500","orange"],["OrangeRed","#FF4500","orange"],["Orchid","#DA70D6","purple"],
  ["PaleGoldenrod","#EEE8AA","yellow"],["PaleGreen","#98FB98","green"],["PaleTurquoise","#AFEEEE","cyan"],
  ["PaleVioletRed","#DB7093","pink"],["PapayaWhip","#FFEFD5","yellow"],["PeachPuff","#FFDAB9","orange"],
  ["Peru","#CD853F","brown"],["Pink","#FFC0CB","pink"],["Plum","#DDA0DD","purple"],
  ["PowderBlue","#B0E0E6","blue"],["Purple","#800080","purple"],["RebeccaPurple","#663399","purple"],
  ["Red","#FF0000","red"],["RosyBrown","#BC8F8F","brown"],["RoyalBlue","#4169E1","blue"],
  ["SaddleBrown","#8B4513","brown"],["Salmon","#FA8072","red"],["SandyBrown","#F4A460","brown"],
  ["SeaGreen","#2E8B57","green"],["Seashell","#FFF5EE","white"],["Sienna","#A0522D","brown"],
  ["Silver","#C0C0C0","gray"],["SkyBlue","#87CEEB","blue"],["SlateBlue","#6A5ACD","purple"],
  ["SlateGray","#708090","gray"],["SlateGrey","#708090","gray"],["Snow","#FFFAFA","white"],
  ["SpringGreen","#00FF7F","green"],["SteelBlue","#4682B4","blue"],["Tan","#D2B48C","brown"],
  ["Teal","#008080","teal"],["Thistle","#D8BFD8","purple"],["Tomato","#FF6347","red"],
  ["Turquoise","#40E0D0","teal"],["Violet","#EE82EE","purple"],["Wheat","#F5DEB3","brown"],
  ["White","#FFFFFF","white"],["WhiteSmoke","#F5F5F5","white"],["Yellow","#FFFF00","yellow"],
  ["YellowGreen","#9ACD32","green"],
];

// ── RAL Classic — Complete 213 colors ─────────────────────
const RAL_CLASSIC = [
  // 1xxx Yellows
  ["Green Beige","#BEBD7F","yellow","RAL 1000"],["Beige","#C2B078","yellow","RAL 1001"],
  ["Sand Yellow","#C6A664","yellow","RAL 1002"],["Signal Yellow","#E5BE01","yellow","RAL 1003"],
  ["Golden Yellow","#CDA434","yellow","RAL 1004"],["Honey Yellow","#A98307","yellow","RAL 1005"],
  ["Maize Yellow","#E4A010","yellow","RAL 1006"],["Daffodil Yellow","#DC9D00","yellow","RAL 1007"],
  ["Brown Beige","#8E6B3E","brown","RAL 1011"],["Lemon Yellow","#EDFF21","yellow","RAL 1012"],
  ["Oyster White","#E7EBDA","white","RAL 1013"],["Ivory","#E4D096","yellow","RAL 1014"],
  ["Light Ivory","#F3E1B5","yellow","RAL 1015"],["Sulfur Yellow","#E0CC22","yellow","RAL 1016"],
  ["Saffron Yellow","#F7A600","yellow","RAL 1017"],["Zinc Yellow","#F5D033","yellow","RAL 1018"],
  ["Grey Beige","#F4A900","yellow","RAL 1019"],["Olive Yellow","#C7B446","yellow","RAL 1020"],
  ["Rape Yellow","#EAE000","yellow","RAL 1021"],["Traffic Yellow","#F0CA00","yellow","RAL 1023"],
  ["Ochre Yellow","#B89C50","yellow","RAL 1024"],["Luminous Yellow","#F5FF00","yellow","RAL 1026"],
  ["Curry","#9D9101","yellow","RAL 1027"],["Melon Yellow","#F4A000","orange","RAL 1028"],
  ["Gorse Yellow","#A08C00","yellow","RAL 1031"],["Broom Yellow","#F5E500","yellow","RAL 1032"],
  ["Dahlia Yellow","#F0E050","yellow","RAL 1033"],["Pastel Yellow","#F6F600","yellow","RAL 1034"],
  ["Pearl Beige","#FEFAC9","yellow","RAL 1035"],["Pearl Gold","#EFE16C","yellow","RAL 1036"],
  ["Sun Yellow","#F8B912","yellow","RAL 1037"],
  // 2xxx Oranges
  ["Yellow Orange","#ED760E","orange","RAL 2000"],["Red Orange","#C93C20","orange","RAL 2001"],
  ["Vermilion","#CB2821","orange","RAL 2002"],["Pastel Orange","#FF7514","orange","RAL 2003"],
  ["Pure Orange","#F44611","orange","RAL 2004"],["Luminous Orange","#FF2301","orange","RAL 2005"],
  ["Luminous Bright Orange","#FFA420","orange","RAL 2007"],["Bright Red Orange","#F75E25","orange","RAL 2008"],
  ["Traffic Orange","#D84B20","orange","RAL 2009"],["Signal Orange","#D84B20","orange","RAL 2010"],
  ["Deep Orange","#EC7C26","orange","RAL 2011"],["Salmon Orange","#E55137","orange","RAL 2012"],
  ["Pearl Orange","#C35831","orange","RAL 2013"],
  // 3xxx Reds
  ["Flame Red","#AF2B1E","red","RAL 3000"],["Signal Red","#A52019","red","RAL 3001"],
  ["Carmine Red","#A2231D","red","RAL 3002"],["Ruby Red","#9B111E","red","RAL 3003"],
  ["Purple Red","#75151E","red","RAL 3004"],["Wine Red","#5E2129","red","RAL 3005"],
  ["Black Red","#412227","red","RAL 3007"],["Oxide Red","#642424","red","RAL 3009"],
  ["Brown Red","#781F19","red","RAL 3011"],["Beige Red","#C1876B","red","RAL 3012"],
  ["Tomato Red","#A12312","red","RAL 3013"],["Antique Pink","#D36E70","pink","RAL 3014"],
  ["Light Pink","#EA899A","pink","RAL 3015"],["Coral Red","#B32821","red","RAL 3016"],
  ["Rose","#E63244","pink","RAL 3017"],["Strawberry Red","#D53032","red","RAL 3018"],
  ["Traffic Red","#CC0605","red","RAL 3020"],["Salmon Pink","#D95030","pink","RAL 3022"],
  ["Luminous Red","#F80000","red","RAL 3024"],["Luminous Brilliant Red","#FE0000","red","RAL 3026"],
  ["Raspberry Red","#C51D34","red","RAL 3027"],["Pure Red","#CB3234","red","RAL 3028"],
  ["Orient Red","#B32428","red","RAL 3031"],["Pearl Ruby Red","#721422","red","RAL 3032"],
  ["Pearl Pink","#B44C43","pink","RAL 3033"],
  // 4xxx Violets
  ["Red Lilac","#6D3F5B","purple","RAL 4001"],["Red Violet","#922B3E","purple","RAL 4002"],
  ["Heather Violet","#DE4C8A","purple","RAL 4003"],["Claret Violet","#641C34","purple","RAL 4004"],
  ["Blue Lilac","#6C4675","purple","RAL 4005"],["Traffic Purple","#A03472","purple","RAL 4006"],
  ["Purple Violet","#4A192C","purple","RAL 4007"],["Signal Violet","#924E7D","purple","RAL 4008"],
  ["Pastel Violet","#A18594","purple","RAL 4009"],["Telemagenta","#CF3476","pink","RAL 4010"],
  ["Pearl Violet","#8673A1","purple","RAL 4011"],["Pearl Blackberry","#6C6874","purple","RAL 4012"],
  // 5xxx Blues
  ["Violet Blue","#354D73","blue","RAL 5000"],["Green Blue","#1F3438","blue","RAL 5001"],
  ["Ultramarine Blue","#20214F","blue","RAL 5002"],["Sapphire Blue","#1D1E33","blue","RAL 5003"],
  ["Black Blue","#18171C","blue","RAL 5004"],["Signal Blue","#1A3550","blue","RAL 5005"],
  ["Brilliant Blue","#003E6F","blue","RAL 5007"],["Grey Blue","#2A6478","blue","RAL 5008"],
  ["Ultramarine","#025669","blue","RAL 5009"],["Gentian Blue","#0E294B","blue","RAL 5010"],
  ["Steel Blue","#231A24","blue","RAL 5011"],["Light Blue","#3B83BD","blue","RAL 5012"],
  ["Cobalt Blue","#1E213D","blue","RAL 5013"],["Pigeon Blue","#606E8C","blue","RAL 5014"],
  ["Sky Blue","#2271B3","blue","RAL 5015"],["Traffic Blue","#0B6799","blue","RAL 5017"],
  ["Turquoise Blue","#2B9CB7","teal","RAL 5018"],["Capri Blue","#00B0C7","blue","RAL 5019"],
  ["Ocean Blue","#004F7C","blue","RAL 5020"],["Water Blue","#3E6F8E","blue","RAL 5021"],
  ["Night Blue","#354D73","blue","RAL 5022"],["Distant Blue","#4D5765","blue","RAL 5023"],
  ["Pastel Blue","#606EA0","blue","RAL 5024"],["Pearl Gentian Blue","#2B7F8A","blue","RAL 5025"],
  ["Pearl Night Blue","#102C54","blue","RAL 5026"],
  // 6xxx Greens
  ["Patina Green","#316650","green","RAL 6000"],["Emerald Green","#287A37","green","RAL 6001"],
  ["Leaf Green","#2D572C","green","RAL 6002"],["Olive Green","#424632","green","RAL 6003"],
  ["Blue Green","#1F3A2D","green","RAL 6004"],["Moss Green","#2F4538","green","RAL 6005"],
  ["Grey Olive","#3E3B32","green","RAL 6006"],["Bottle Green","#343B29","green","RAL 6007"],
  ["Brown Green","#39352A","green","RAL 6008"],["Fir Green","#31372B","green","RAL 6009"],
  ["Grass Green","#35682D","green","RAL 6010"],["Reseda Green","#587246","green","RAL 6011"],
  ["Black Green","#343B29","green","RAL 6012"],["Reed Green","#6C7156","green","RAL 6013"],
  ["Yellow Olive","#47402E","green","RAL 6014"],["Black Olive","#3B3C36","green","RAL 6015"],
  ["Turquoise Green","#1E5945","teal","RAL 6016"],["May Green","#4C9141","green","RAL 6017"],
  ["Yellow Green","#57A639","green","RAL 6018"],["Pastel Green","#BDECB6","green","RAL 6019"],
  ["Chrome Green","#2E3A23","green","RAL 6020"],["Pale Green","#89AC76","green","RAL 6021"],
  ["Olive Drab","#25221B","green","RAL 6022"],["Traffic Green","#308446","green","RAL 6024"],
  ["Fern Green","#3D642D","green","RAL 6025"],["Opal Green","#015D52","teal","RAL 6026"],
  ["Light Green","#84C3BE","green","RAL 6027"],["Pine Green","#2C5545","green","RAL 6028"],
  ["Mint Green","#20603D","green","RAL 6029"],["Signal Green","#317F43","green","RAL 6032"],
  ["Mint Turquoise","#497E76","teal","RAL 6033"],["Pastel Turquoise","#7FB5B5","teal","RAL 6034"],
  ["Pearl Green","#1C542D","green","RAL 6035"],["Pearl Opal Green","#193737","teal","RAL 6036"],
  ["Pure Green","#0E4243","green","RAL 6037"],["Luminous Green","#00BB2D","green","RAL 6038"],
  // 7xxx Greys
  ["Squirrel Grey","#78858B","gray","RAL 7000"],["Silver Grey","#8A9597","gray","RAL 7001"],
  ["Olive Grey","#817F68","gray","RAL 7002"],["Moss Grey","#6C7059","gray","RAL 7003"],
  ["Signal Grey","#969992","gray","RAL 7004"],["Mouse Grey","#646B63","gray","RAL 7005"],
  ["Beige Grey","#6D6552","gray","RAL 7006"],["Khaki Grey","#6A5F31","gray","RAL 7008"],
  ["Green Grey","#4D5645","gray","RAL 7009"],["Tarpaulin Grey","#4C514A","gray","RAL 7010"],
  ["Iron Grey","#434B4D","gray","RAL 7011"],["Basalt Grey","#4E5754","gray","RAL 7012"],
  ["Brown Grey","#464531","gray","RAL 7013"],["Slate Grey","#434750","gray","RAL 7015"],
  ["Anthracite Grey","#293133","gray","RAL 7016"],["Black Grey","#23282B","gray","RAL 7021"],
  ["Umbra Grey","#332F2C","gray","RAL 7022"],["Concrete Grey","#686C5E","gray","RAL 7023"],
  ["Graphite Grey","#474A51","gray","RAL 7024"],["Granite Grey","#2F353B","gray","RAL 7026"],
  ["Stone Grey","#8B8C7A","gray","RAL 7030"],["Blue Grey","#474B4E","gray","RAL 7031"],
  ["Pebble Grey","#B8B799","gray","RAL 7032"],["Cement Grey","#7D8471","gray","RAL 7033"],
  ["Yellow Grey","#8F8B66","gray","RAL 7034"],["Light Grey","#D7D7D7","gray","RAL 7035"],
  ["Platinum Grey","#7F7679","gray","RAL 7036"],["Dusty Grey","#7D7F7D","gray","RAL 7037"],
  ["Agate Grey","#B5B8B1","gray","RAL 7038"],["Quartz Grey","#6C6960","gray","RAL 7039"],
  ["Window Grey","#9DA1AA","gray","RAL 7040"],["Traffic Grey A","#8D948D","gray","RAL 7042"],
  ["Traffic Grey B","#4E5452","gray","RAL 7043"],["Silk Grey","#CAC4B0","gray","RAL 7044"],
  ["Telegrey 1","#909090","gray","RAL 7045"],["Telegrey 2","#82898F","gray","RAL 7046"],
  ["Telegrey 4","#D0D0D0","gray","RAL 7047"],["Pearl Mouse Grey","#898176","gray","RAL 7048"],
  // 8xxx Browns
  ["Green Brown","#826C34","brown","RAL 8000"],["Ochre Brown","#955F20","brown","RAL 8001"],
  ["Signal Brown","#6C3B2A","brown","RAL 8002"],["Clay Brown","#734222","brown","RAL 8003"],
  ["Copper Brown","#8E402A","brown","RAL 8004"],["Fawn Brown","#59351F","brown","RAL 8007"],
  ["Olive Brown","#6F4F28","brown","RAL 8008"],["Nut Brown","#5B3A29","brown","RAL 8009"],
  ["Terra Brown","#592321","brown","RAL 8010"],["Sepia Brown","#382C1E","brown","RAL 8014"],
  ["Chestnut Brown","#633A34","brown","RAL 8015"],["Mahogany Brown","#4C2F27","brown","RAL 8016"],
  ["Chocolate Brown","#45322E","brown","RAL 8017"],["Grey Brown","#403A3A","brown","RAL 8019"],
  ["Black Brown","#212121","brown","RAL 8022"],["Orange Brown","#A65E2E","brown","RAL 8023"],
  ["Beige Brown","#79553D","brown","RAL 8024"],["Pale Brown","#755C48","brown","RAL 8025"],
  ["Terra","#4E3B31","brown","RAL 8028"],["Pearl Copper","#763C28","brown","RAL 8029"],
  // 9xxx Whites & Blacks
  ["Cream White","#FDF4E3","white","RAL 9001"],["Grey White","#E7EBDA","white","RAL 9002"],
  ["Signal White","#F4F4F4","white","RAL 9003"],["Signal Black","#282828","gray","RAL 9004"],
  ["Jet Black","#0A0A0A","gray","RAL 9005"],["White Aluminium","#A5A5A5","gray","RAL 9006"],
  ["Grey Aluminium","#8F8F8F","gray","RAL 9007"],["Pure White","#F4F4F4","white","RAL 9010"],
  ["Graphite Black","#1C1C1C","gray","RAL 9011"],["Clean Room White","#F6F6F6","white","RAL 9016"],
  ["Traffic Black","#1E1E1E","gray","RAL 9017"],["Papyrus White","#D7D7D7","white","RAL 9018"],
];

// ── RAL Design System+ — Extended ─────────────────────────
const RAL_DESIGN = [
  // Hue 010 (Yellow-Red)
  ["RAL 010 30 20","#4A3728","brown","010 30 20"],["RAL 010 40 20","#5E4830","brown","010 40 20"],
  ["RAL 010 40 30","#6B4D35","brown","010 40 30"],["RAL 010 50 20","#7A5E3E","brown","010 50 20"],
  ["RAL 010 50 40","#8C6642","brown","010 50 40"],["RAL 010 60 20","#9A7450","orange","010 60 20"],
  ["RAL 010 60 40","#B07340","orange","010 60 40"],["RAL 010 60 50","#B07D4E","orange","010 60 50"],
  ["RAL 010 70 20","#B88C60","orange","010 70 20"],["RAL 010 70 40","#CC8C40","orange","010 70 40"],
  ["RAL 010 70 60","#D19A5C","orange","010 70 60"],["RAL 010 80 20","#D0AC80","orange","010 80 20"],
  ["RAL 010 80 40","#C9A876","orange","010 80 40"],["RAL 010 80 60","#D8B060","orange","010 80 60"],
  ["RAL 010 85 10","#D8C8A8","yellow","010 85 10"],["RAL 010 90 10","#E8D4B0","yellow","010 90 10"],
  ["RAL 010 90 20","#E8D4A8","yellow","010 90 20"],["RAL 010 90 30","#ECD498","yellow","010 90 30"],
  ["RAL 010 93 05","#F0E4D0","white","010 93 05"],
  // Hue 020
  ["RAL 020 40 20","#5E4830","brown","020 40 20"],["RAL 020 50 20","#7A5A2A","brown","020 50 20"],
  ["RAL 020 50 40","#8B6B3A","brown","020 50 40"],["RAL 020 60 20","#9A7230","yellow","020 60 20"],
  ["RAL 020 60 40","#AA8030","yellow","020 60 40"],["RAL 020 60 50","#B08340","yellow","020 60 50"],
  ["RAL 020 70 30","#C09840","yellow","020 70 30"],["RAL 020 70 50","#C8A030","yellow","020 70 50"],
  ["RAL 020 70 60","#D4A84B","yellow","020 70 60"],["RAL 020 80 20","#CCBA70","yellow","020 80 20"],
  ["RAL 020 80 40","#D4B870","yellow","020 80 40"],["RAL 020 85 10","#DAC890","yellow","020 85 10"],
  ["RAL 020 90 10","#E8D89A","yellow","020 90 10"],["RAL 020 90 20","#ECD99A","yellow","020 90 20"],
  // Hue 030 (Yellow)
  ["RAL 030 40 50","#806000","yellow","030 40 50"],["RAL 030 50 60","#A07C00","yellow","030 50 60"],
  ["RAL 030 60 50","#C09800","yellow","030 60 50"],["RAL 030 60 70","#C89900","yellow","030 60 70"],
  ["RAL 030 70 50","#C8B020","yellow","030 70 50"],["RAL 030 70 70","#D4AA00","yellow","030 70 70"],
  ["RAL 030 80 30","#D0BE70","yellow","030 80 30"],["RAL 030 80 50","#D4C040","yellow","030 80 50"],
  ["RAL 030 80 60","#D4BE4A","yellow","030 80 60"],["RAL 030 85 20","#DECE80","yellow","030 85 20"],
  ["RAL 030 90 10","#E8DC90","yellow","030 90 10"],["RAL 030 90 30","#EAD882","yellow","030 90 30"],
  // Hue 040 (Yellow-Green)
  ["RAL 040 50 50","#888000","yellow","040 50 50"],["RAL 040 60 60","#A8A000","yellow","040 60 60"],
  ["RAL 040 60 70","#B9AA00","yellow","040 60 70"],["RAL 040 70 50","#BCBA20","yellow","040 70 50"],
  ["RAL 040 70 60","#C8BC3C","yellow","040 70 60"],["RAL 040 80 30","#CCCA60","yellow","040 80 30"],
  ["RAL 040 80 50","#D2C75A","yellow","040 80 50"],["RAL 040 90 20","#E4E080","yellow","040 90 20"],
  ["RAL 040 90 30","#E8DFA0","yellow","040 90 30"],
  // Hue 050 (Yellow-Green)
  ["RAL 050 40 50","#607000","green","050 40 50"],["RAL 050 50 60","#769400","green","050 50 60"],
  ["RAL 050 60 60","#90B400","green","050 60 60"],["RAL 050 60 70","#8FA800","green","050 60 70"],
  ["RAL 050 70 50","#A8C020","green","050 70 50"],["RAL 050 70 60","#A8C030","green","050 70 60"],
  ["RAL 050 80 30","#C0CC60","green","050 80 30"],["RAL 050 80 50","#C0CC70","green","050 80 50"],
  ["RAL 050 90 20","#D8E890","green","050 90 20"],["RAL 050 90 30","#DCEAAA","green","050 90 30"],
  // Hue 060 (Green)
  ["RAL 060 40 40","#487C20","green","060 40 40"],["RAL 060 50 50","#5A9828","green","060 50 50"],
  ["RAL 060 60 40","#78B040","green","060 60 40"],["RAL 060 70 30","#98CC60","green","060 70 30"],
  ["RAL 060 80 20","#B8DCA0","green","060 80 20"],["RAL 060 90 10","#D4EECC","green","060 90 10"],
  // Hue 100 (Green)
  ["RAL 100 30 20","#2E5030","green","100 30 20"],["RAL 100 40 30","#3C6838","green","100 40 30"],
  ["RAL 100 50 30","#4A7838","green","100 50 30"],["RAL 100 50 50","#4A7832","green","100 50 50"],
  ["RAL 100 60 30","#689050","green","100 60 30"],["RAL 100 60 50","#5E9A3C","green","100 60 50"],
  ["RAL 100 70 25","#8CB070","green","100 70 25"],["RAL 100 70 40","#88B868","green","100 70 40"],
  ["RAL 100 80 20","#AACCA0","green","100 80 20"],["RAL 100 90 10","#C8E0C0","green","100 90 10"],
  ["RAL 100 90 15","#CEE4C8","green","100 90 15"],
  // Hue 120 (Teal-Green)
  ["RAL 120 40 30","#207050","green","120 40 30"],["RAL 120 50 40","#2E7850","green","120 50 40"],
  ["RAL 120 60 30","#409068","green","120 60 30"],["RAL 120 60 40","#3C9658","green","120 60 40"],
  ["RAL 120 70 25","#6AAA84","green","120 70 25"],["RAL 120 70 30","#72B484","green","120 70 30"],
  ["RAL 120 80 15","#9CC8B0","green","120 80 15"],["RAL 120 80 20","#A8CEB4","green","120 80 20"],
  ["RAL 120 90 10","#C8E0D4","green","120 90 10"],
  // Hue 140 (Teal)
  ["RAL 140 40 30","#167068","teal","140 40 30"],["RAL 140 50 35","#1A7868","teal","140 50 35"],
  ["RAL 140 60 30","#289088","teal","140 60 30"],["RAL 140 60 40","#229080","teal","140 60 40"],
  ["RAL 140 70 25","#5AACAA","teal","140 70 25"],["RAL 140 70 30","#62AEA2","teal","140 70 30"],
  ["RAL 140 80 15","#90C4C4","teal","140 80 15"],["RAL 140 80 20","#9CCEC8","teal","140 80 20"],
  ["RAL 140 90 10","#C0DEDE","teal","140 90 10"],
  // Hue 160 (Blue-Teal)
  ["RAL 160 40 35","#0A6070","teal","160 40 35"],["RAL 160 50 40","#0A6878","teal","160 50 40"],
  ["RAL 160 60 35","#1A8090","teal","160 60 35"],["RAL 160 60 40","#147E98","teal","160 60 40"],
  ["RAL 160 70 25","#54A0B4","teal","160 70 25"],["RAL 160 70 30","#52A0B8","teal","160 70 30"],
  ["RAL 160 80 15","#88BCD0","blue","160 80 15"],["RAL 160 80 20","#8EC4D8","blue","160 80 20"],
  ["RAL 160 90 10","#BEDAEC","blue","160 90 10"],
  // Hue 200 (Blue)
  ["RAL 200 30 30","#182860","blue","200 30 30"],["RAL 200 40 40","#1A4080","blue","200 40 40"],
  ["RAL 200 50 40","#1A4888","blue","200 50 40"],["RAL 200 60 30","#3868A8","blue","200 60 30"],
  ["RAL 200 60 40","#2460A8","blue","200 60 40"],["RAL 200 70 20","#5888C0","blue","200 70 20"],
  ["RAL 200 70 30","#5884C0","blue","200 70 30"],["RAL 200 80 15","#88AAD8","blue","200 80 15"],
  ["RAL 200 80 20","#94B0D8","blue","200 80 20"],["RAL 200 90 10","#C0D4EC","blue","200 90 10"],
  ["RAL 200 90 15","#C8D8EE","blue","200 90 15"],
  // Hue 220 (Blue-Violet)
  ["RAL 220 30 30","#1A2068","blue","220 30 30"],["RAL 220 40 40","#2030A0","blue","220 40 40"],
  ["RAL 220 50 40","#2A3898","blue","220 50 40"],["RAL 220 60 30","#4858B8","blue","220 60 30"],
  ["RAL 220 60 40","#3A50B8","blue","220 60 40"],["RAL 220 70 25","#6878C8","blue","220 70 25"],
  ["RAL 220 70 30","#6878CC","blue","220 70 30"],["RAL 220 80 15","#9298D8","blue","220 80 15"],
  ["RAL 220 80 20","#9AAAE0","blue","220 80 20"],["RAL 220 90 10","#C0C4F0","blue","220 90 10"],
  // Hue 240 (Violet)
  ["RAL 240 30 30","#301878","purple","240 30 30"],["RAL 240 40 40","#4028A8","purple","240 40 40"],
  ["RAL 240 50 40","#4A2898","purple","240 50 40"],["RAL 240 60 30","#7050C0","purple","240 60 30"],
  ["RAL 240 60 40","#6040B8","purple","240 60 40"],["RAL 240 70 25","#9070CC","purple","240 70 25"],
  ["RAL 240 70 30","#8868CC","purple","240 70 30"],["RAL 240 80 15","#B098D8","purple","240 80 15"],
  ["RAL 240 80 20","#B09AE0","purple","240 80 20"],["RAL 240 90 10","#D0C8F0","purple","240 90 10"],
  // Hue 260 (Red-Violet)
  ["RAL 260 30 30","#501068","purple","260 30 30"],["RAL 260 40 40","#701898","purple","260 40 40"],
  ["RAL 260 50 40","#6A1E88","purple","260 50 40"],["RAL 260 60 30","#9848A8","purple","260 60 30"],
  ["RAL 260 60 40","#8830A8","purple","260 60 40"],["RAL 260 70 25","#B070BC","purple","260 70 25"],
  ["RAL 260 70 30","#AA68BF","purple","260 70 30"],["RAL 260 80 15","#C898CC","purple","260 80 15"],
  ["RAL 260 80 20","#CC9ADA","purple","260 80 20"],["RAL 260 90 10","#E0C8EC","purple","260 90 10"],
  // Hue 300 (Magenta)
  ["RAL 300 30 30","#700850","pink","300 30 30"],["RAL 300 40 40","#980870","pink","300 40 40"],
  ["RAL 300 50 40","#881060","pink","300 50 40"],["RAL 300 60 30","#B840A0","pink","300 60 30"],
  ["RAL 300 60 40","#B01880","pink","300 60 40"],["RAL 300 70 25","#C870B0","pink","300 70 25"],
  ["RAL 300 70 30","#C85CA0","pink","300 70 30"],["RAL 300 80 15","#D898C4","pink","300 80 15"],
  ["RAL 300 80 20","#E098C8","pink","300 80 20"],["RAL 300 90 10","#F0C8E4","pink","300 90 10"],
  // Hue 320 (Red-Pink)
  ["RAL 320 30 30","#700818","red","320 30 30"],["RAL 320 40 40","#981028","red","320 40 40"],
  ["RAL 320 50 40","#881030","red","320 50 40"],["RAL 320 60 35","#C83050","red","320 60 35"],
  ["RAL 320 60 40","#C01840","red","320 60 40"],["RAL 320 70 25","#D06070","red","320 70 25"],
  ["RAL 320 70 30","#D05878","red","320 70 30"],["RAL 320 80 15","#E098A8","pink","320 80 15"],
  ["RAL 320 80 20","#E898A8","pink","320 80 20"],["RAL 320 90 10","#F4C8D4","pink","320 90 10"],
  // Hue 340 (Red)
  ["RAL 340 30 30","#701010","red","340 30 30"],["RAL 340 40 40","#A01818","red","340 40 40"],
  ["RAL 340 50 40","#901820","red","340 50 40"],["RAL 340 60 40","#C02028","red","340 60 40"],
  ["RAL 340 70 30","#CC6060","red","340 70 30"],["RAL 340 80 20","#E4A0A0","pink","340 80 20"],
  ["RAL 340 90 10","#F0C8C8","pink","340 90 10"],
  // Neutrals
  ["RAL N 10 00","#1A1A1A","gray","N 10 00"],["RAL N 15 00","#262626","gray","N 15 00"],
  ["RAL N 20 00","#333333","gray","N 20 00"],["RAL N 25 00","#404040","gray","N 25 00"],
  ["RAL N 30 00","#4D4D4D","gray","N 30 00"],["RAL N 35 00","#595959","gray","N 35 00"],
  ["RAL N 40 00","#666666","gray","N 40 00"],["RAL N 45 00","#737373","gray","N 45 00"],
  ["RAL N 50 00","#808080","gray","N 50 00"],["RAL N 55 00","#8C8C8C","gray","N 55 00"],
  ["RAL N 60 00","#999999","gray","N 60 00"],["RAL N 65 00","#A6A6A6","gray","N 65 00"],
  ["RAL N 70 00","#B3B3B3","gray","N 70 00"],["RAL N 75 00","#BFBFBF","gray","N 75 00"],
  ["RAL N 80 00","#CCCCCC","gray","N 80 00"],["RAL N 85 00","#D9D9D9","gray","N 85 00"],
  ["RAL N 90 00","#E6E6E6","gray","N 90 00"],["RAL N 93 00","#EDEDED","white","N 93 00"],
  ["RAL N 95 00","#F2F2F2","white","N 95 00"],["RAL N 97 00","#F7F7F7","white","N 97 00"],
];

// ── Pantone Solid Coated — Extended ───────────────────────
const PANTONE = [
  // 100–139 Yellows
  ["Pantone 100 C","#F4ED7C","yellow","Pantone 100 C"],["Pantone 101 C","#F4ED00","yellow","Pantone 101 C"],
  ["Pantone 102 C","#F9E500","yellow","Pantone 102 C"],["Pantone 103 C","#C6AD0F","yellow","Pantone 103 C"],
  ["Pantone 104 C","#AF9B0B","yellow","Pantone 104 C"],["Pantone 105 C","#897A28","yellow","Pantone 105 C"],
  ["Pantone 106 C","#F5E616","yellow","Pantone 106 C"],["Pantone 107 C","#F5E100","yellow","Pantone 107 C"],
  ["Pantone 108 C","#F6D800","yellow","Pantone 108 C"],["Pantone 109 C","#F7CE00","yellow","Pantone 109 C"],
  ["Pantone 110 C","#EFC220","yellow","Pantone 110 C"],["Pantone 111 C","#C9A615","yellow","Pantone 111 C"],
  ["Pantone 112 C","#C29C00","yellow","Pantone 112 C"],["Pantone 113 C","#F5E17A","yellow","Pantone 113 C"],
  ["Pantone 114 C","#F5DB4C","yellow","Pantone 114 C"],["Pantone 115 C","#F5D220","yellow","Pantone 115 C"],
  ["Pantone 116 C","#FFCD00","yellow","Pantone 116 C"],["Pantone 117 C","#C6A400","yellow","Pantone 117 C"],
  ["Pantone 118 C","#AD8B00","yellow","Pantone 118 C"],["Pantone 119 C","#896E10","brown","Pantone 119 C"],
  ["Pantone 120 C","#F7E47B","yellow","Pantone 120 C"],["Pantone 121 C","#FDDA2F","yellow","Pantone 121 C"],
  ["Pantone 122 C","#FDD000","yellow","Pantone 122 C"],["Pantone 123 C","#FFC72C","yellow","Pantone 123 C"],
  ["Pantone 124 C","#EFAA00","orange","Pantone 124 C"],["Pantone 125 C","#C68B00","orange","Pantone 125 C"],
  ["Pantone 127 C","#F0DC82","yellow","Pantone 127 C"],["Pantone 128 C","#EDCF40","yellow","Pantone 128 C"],
  ["Pantone 129 C","#E8C000","yellow","Pantone 129 C"],["Pantone 130 C","#E5A800","orange","Pantone 130 C"],
  ["Pantone 131 C","#CC8A00","orange","Pantone 131 C"],["Pantone 132 C","#A86F00","brown","Pantone 132 C"],
  ["Pantone 133 C","#7A5400","brown","Pantone 133 C"],["Pantone 134 C","#F8D48A","yellow","Pantone 134 C"],
  ["Pantone 135 C","#F8C86A","yellow","Pantone 135 C"],["Pantone 136 C","#F8B840","orange","Pantone 136 C"],
  ["Pantone 137 C","#F5A000","orange","Pantone 137 C"],["Pantone 138 C","#D4840A","orange","Pantone 138 C"],
  ["Pantone 139 C","#B06E00","brown","Pantone 139 C"],
  // 140–173 Oranges
  ["Pantone 140 C","#8B5A00","brown","Pantone 140 C"],["Pantone 141 C","#F5C97A","yellow","Pantone 141 C"],
  ["Pantone 142 C","#F5BA50","yellow","Pantone 142 C"],["Pantone 143 C","#F5A830","orange","Pantone 143 C"],
  ["Pantone 144 C","#E87722","orange","Pantone 144 C"],["Pantone 145 C","#C86012","orange","Pantone 145 C"],
  ["Pantone 146 C","#A64A00","brown","Pantone 146 C"],["Pantone 147 C","#844000","brown","Pantone 147 C"],
  ["Pantone 148 C","#FCCFA0","orange","Pantone 148 C"],["Pantone 149 C","#FCC080","orange","Pantone 149 C"],
  ["Pantone 150 C","#F8A060","orange","Pantone 150 C"],["Pantone 151 C","#FF6720","orange","Pantone 151 C"],
  ["Pantone 152 C","#E96B1E","orange","Pantone 152 C"],["Pantone 153 C","#C44F10","orange","Pantone 153 C"],
  ["Pantone 154 C","#A03C00","brown","Pantone 154 C"],["Pantone 155 C","#F5D4A8","yellow","Pantone 155 C"],
  ["Pantone 156 C","#F5C080","orange","Pantone 156 C"],["Pantone 157 C","#EFA060","orange","Pantone 157 C"],
  ["Pantone 158 C","#E87028","orange","Pantone 158 C"],["Pantone 159 C","#C85C18","orange","Pantone 159 C"],
  ["Pantone 160 C","#A04610","brown","Pantone 160 C"],["Pantone 161 C","#783200","brown","Pantone 161 C"],
  ["Pantone 162 C","#FDCBAA","orange","Pantone 162 C"],["Pantone 163 C","#FCA870","orange","Pantone 163 C"],
  ["Pantone 164 C","#F88040","orange","Pantone 164 C"],["Pantone 165 C","#FF6720","orange","Pantone 165 C"],
  ["Pantone 166 C","#E96116","orange","Pantone 166 C"],["Pantone 167 C","#C24C10","orange","Pantone 167 C"],
  ["Pantone 168 C","#8C3800","brown","Pantone 168 C"],
  ["Pantone 169 C","#FCA8A0","pink","Pantone 169 C"],["Pantone 170 C","#F87868","red","Pantone 170 C"],
  ["Pantone 171 C","#F45040","red","Pantone 171 C"],["Pantone 172 C","#F4633A","orange","Pantone 172 C"],
  ["Pantone 173 C","#D45C34","orange","Pantone 173 C"],
  // 174–209 Reds & Pinks
  ["Pantone 174 C","#A83820","red","Pantone 174 C"],["Pantone 175 C","#7A2C14","brown","Pantone 175 C"],
  ["Pantone 176 C","#F9A0A0","pink","Pantone 176 C"],["Pantone 177 C","#F87070","red","Pantone 177 C"],
  ["Pantone 178 C","#F55050","red","Pantone 178 C"],["Pantone 179 C","#E83830","red","Pantone 179 C"],
  ["Pantone 180 C","#E05240","red","Pantone 180 C"],["Pantone 181 C","#A63228","red","Pantone 181 C"],
  ["Pantone 182 C","#F9C8C8","pink","Pantone 182 C"],["Pantone 183 C","#F7A9A0","pink","Pantone 183 C"],
  ["Pantone 184 C","#F47878","pink","Pantone 184 C"],["Pantone 185 C","#E4002B","red","Pantone 185 C"],
  ["Pantone 186 C","#C8102E","red","Pantone 186 C"],["Pantone 187 C","#A4192B","red","Pantone 187 C"],
  ["Pantone 188 C","#7D2027","red","Pantone 188 C"],["Pantone 189 C","#F7A8B8","pink","Pantone 189 C"],
  ["Pantone 190 C","#F57898","pink","Pantone 190 C"],["Pantone 191 C","#F05080","pink","Pantone 191 C"],
  ["Pantone 192 C","#E82859","red","Pantone 192 C"],["Pantone 193 C","#E0394E","red","Pantone 193 C"],
  ["Pantone 194 C","#C03050","red","Pantone 194 C"],["Pantone 195 C","#8A2040","red","Pantone 195 C"],
  ["Pantone 196 C","#F5C0C8","pink","Pantone 196 C"],["Pantone 197 C","#F08098","pink","Pantone 197 C"],
  ["Pantone 198 C","#E84870","pink","Pantone 198 C"],["Pantone 199 C","#D91B5B","red","Pantone 199 C"],
  ["Pantone 200 C","#D22630","red","Pantone 200 C"],["Pantone 201 C","#B22234","red","Pantone 201 C"],
  ["Pantone 202 C","#9A2334","red","Pantone 202 C"],["Pantone 203 C","#F5B0C8","pink","Pantone 203 C"],
  ["Pantone 204 C","#EE7EA0","pink","Pantone 204 C"],["Pantone 205 C","#E85880","pink","Pantone 205 C"],
  ["Pantone 206 C","#D5003F","red","Pantone 206 C"],["Pantone 207 C","#B0003A","red","Pantone 207 C"],
  ["Pantone 208 C","#8E003A","red","Pantone 208 C"],["Pantone 209 C","#6C002C","red","Pantone 209 C"],
  // 210–249 Pinks & Magentas
  ["Pantone 210 C","#F9A4B4","pink","Pantone 210 C"],["Pantone 211 C","#F7768E","pink","Pantone 211 C"],
  ["Pantone 212 C","#F24E79","pink","Pantone 212 C"],["Pantone 213 C","#E0004D","pink","Pantone 213 C"],
  ["Pantone 214 C","#C2004F","pink","Pantone 214 C"],["Pantone 215 C","#980042","pink","Pantone 215 C"],
  ["Pantone 216 C","#740030","red","Pantone 216 C"],["Pantone 217 C","#F4A8C0","pink","Pantone 217 C"],
  ["Pantone 218 C","#EE78A8","pink","Pantone 218 C"],["Pantone 219 C","#E24E96","pink","Pantone 219 C"],
  ["Pantone 220 C","#BC0064","pink","Pantone 220 C"],["Pantone 221 C","#9E0062","pink","Pantone 221 C"],
  ["Pantone 222 C","#7A0050","purple","Pantone 222 C"],["Pantone 223 C","#F4A0C0","pink","Pantone 223 C"],
  ["Pantone 224 C","#EE78B0","pink","Pantone 224 C"],["Pantone 225 C","#E864A0","pink","Pantone 225 C"],
  ["Pantone 226 C","#DA1984","pink","Pantone 226 C"],["Pantone 227 C","#C2006E","pink","Pantone 227 C"],
  ["Pantone 228 C","#A0005A","pink","Pantone 228 C"],["Pantone 229 C","#7C0046","purple","Pantone 229 C"],
  ["Pantone 230 C","#F4A0C8","pink","Pantone 230 C"],["Pantone 231 C","#F078BC","pink","Pantone 231 C"],
  ["Pantone 232 C","#F064AC","pink","Pantone 232 C"],["Pantone 233 C","#D83284","pink","Pantone 233 C"],
  ["Pantone 234 C","#B81870","pink","Pantone 234 C"],["Pantone 235 C","#980060","purple","Pantone 235 C"],
  ["Pantone 236 C","#F5A0CC","pink","Pantone 236 C"],["Pantone 237 C","#F070C0","pink","Pantone 237 C"],
  ["Pantone 238 C","#EC4CAC","pink","Pantone 238 C"],["Pantone 239 C","#E0289A","pink","Pantone 239 C"],
  ["Pantone 240 C","#C01888","pink","Pantone 240 C"],["Pantone 241 C","#A00878","purple","Pantone 241 C"],
  ["Pantone 242 C","#780060","purple","Pantone 242 C"],["Pantone 243 C","#E8A8D4","pink","Pantone 243 C"],
  ["Pantone 244 C","#DC80C4","pink","Pantone 244 C"],["Pantone 245 C","#D060B4","pink","Pantone 245 C"],
  ["Pantone 246 C","#BE0089","pink","Pantone 246 C"],["Pantone 247 C","#AA0078","purple","Pantone 247 C"],
  ["Pantone 248 C","#900070","purple","Pantone 248 C"],["Pantone 249 C","#6A0058","purple","Pantone 249 C"],
  // 250–290 Purples & Blues
  ["Pantone 250 C","#E8B8DC","pink","Pantone 250 C"],["Pantone 251 C","#D890CC","purple","Pantone 251 C"],
  ["Pantone 252 C","#C868C0","purple","Pantone 252 C"],["Pantone 253 C","#AF2FA0","purple","Pantone 253 C"],
  ["Pantone 254 C","#981488","purple","Pantone 254 C"],["Pantone 255 C","#720070","purple","Pantone 255 C"],
  ["Pantone 256 C","#E0C0E0","purple","Pantone 256 C"],["Pantone 257 C","#CC9CCC","purple","Pantone 257 C"],
  ["Pantone 258 C","#A458B0","purple","Pantone 258 C"],["Pantone 259 C","#800090","purple","Pantone 259 C"],
  ["Pantone 260 C","#660080","purple","Pantone 260 C"],["Pantone 261 C","#540070","purple","Pantone 261 C"],
  ["Pantone 262 C","#440058","purple","Pantone 262 C"],["Pantone 263 C","#DED4EC","purple","Pantone 263 C"],
  ["Pantone 264 C","#BEB0E0","purple","Pantone 264 C"],["Pantone 265 C","#9B7DD4","purple","Pantone 265 C"],
  ["Pantone 266 C","#7C62C5","purple","Pantone 266 C"],["Pantone 267 C","#5E3FA3","purple","Pantone 267 C"],
  ["Pantone 268 C","#4A2A7C","purple","Pantone 268 C"],["Pantone 269 C","#3D1F6A","purple","Pantone 269 C"],
  ["Pantone 270 C","#C8C0E4","purple","Pantone 270 C"],["Pantone 271 C","#AAA0D8","purple","Pantone 271 C"],
  ["Pantone 272 C","#8878C0","purple","Pantone 272 C"],["Pantone 273 C","#250A6B","purple","Pantone 273 C"],
  ["Pantone 274 C","#1C0660","blue","Pantone 274 C"],["Pantone 275 C","#180450","blue","Pantone 275 C"],
  ["Pantone 276 C","#D0D0EC","blue","Pantone 276 C"],["Pantone 277 C","#A0B8E4","blue","Pantone 277 C"],
  ["Pantone 278 C","#78A0DA","blue","Pantone 278 C"],["Pantone 279 C","#5B92E5","blue","Pantone 279 C"],
  ["Pantone 280 C","#002D72","blue","Pantone 280 C"],["Pantone 281 C","#002664","blue","Pantone 281 C"],
  ["Pantone 282 C","#00205C","blue","Pantone 282 C"],["Pantone 283 C","#9CC0E8","blue","Pantone 283 C"],
  ["Pantone 284 C","#6EB0E4","blue","Pantone 284 C"],["Pantone 285 C","#0071CE","blue","Pantone 285 C"],
  ["Pantone 286 C","#0038A8","blue","Pantone 286 C"],["Pantone 287 C","#003087","blue","Pantone 287 C"],
  ["Pantone 288 C","#002776","blue","Pantone 288 C"],["Pantone 289 C","#001F5C","blue","Pantone 289 C"],
  ["Pantone 290 C","#BDD6E6","blue","Pantone 290 C"],["Pantone 291 C","#8EC4E8","blue","Pantone 291 C"],
  ["Pantone 292 C","#5EAEE0","blue","Pantone 292 C"],["Pantone 293 C","#0047BA","blue","Pantone 293 C"],
  ["Pantone 294 C","#003A8C","blue","Pantone 294 C"],["Pantone 295 C","#003374","blue","Pantone 295 C"],
  ["Pantone 296 C","#002657","blue","Pantone 296 C"],
  // 297–320 Teals & Cyans
  ["Pantone 297 C","#6EC6E8","blue","Pantone 297 C"],["Pantone 298 C","#48C8E8","cyan","Pantone 298 C"],
  ["Pantone 299 C","#00A0E3","blue","Pantone 299 C"],["Pantone 300 C","#0068B4","blue","Pantone 300 C"],
  ["Pantone 301 C","#005C96","blue","Pantone 301 C"],["Pantone 302 C","#004C78","blue","Pantone 302 C"],
  ["Pantone 303 C","#003F5C","blue","Pantone 303 C"],["Pantone 304 C","#A8DCF0","cyan","Pantone 304 C"],
  ["Pantone 305 C","#68C8F0","cyan","Pantone 305 C"],["Pantone 306 C","#00C0F3","cyan","Pantone 306 C"],
  ["Pantone 307 C","#009DD9","teal","Pantone 307 C"],["Pantone 308 C","#007DB7","teal","Pantone 308 C"],
  ["Pantone 309 C","#00607A","teal","Pantone 309 C"],["Pantone 310 C","#78D4E8","cyan","Pantone 310 C"],
  ["Pantone 311 C","#28CCE8","cyan","Pantone 311 C"],["Pantone 312 C","#00A9CE","teal","Pantone 312 C"],
  ["Pantone 313 C","#0096B4","teal","Pantone 313 C"],["Pantone 314 C","#007A99","teal","Pantone 314 C"],
  ["Pantone 315 C","#006480","teal","Pantone 315 C"],["Pantone 316 C","#004E5E","teal","Pantone 316 C"],
  ["Pantone 317 C","#BCF0F0","cyan","Pantone 317 C"],["Pantone 318 C","#7AE4E8","teal","Pantone 318 C"],
  ["Pantone 319 C","#28D4D4","teal","Pantone 319 C"],["Pantone 320 C","#009EAE","teal","Pantone 320 C"],
  ["Pantone 321 C","#007B8A","teal","Pantone 321 C"],["Pantone 322 C","#006472","teal","Pantone 322 C"],
  ["Pantone 323 C","#005D5D","teal","Pantone 323 C"],
  // 324–370 Greens
  ["Pantone 324 C","#8DD4CB","teal","Pantone 324 C"],["Pantone 325 C","#4DC8B4","teal","Pantone 325 C"],
  ["Pantone 326 C","#00B59B","teal","Pantone 326 C"],["Pantone 327 C","#008675","teal","Pantone 327 C"],
  ["Pantone 328 C","#007060","teal","Pantone 328 C"],["Pantone 329 C","#005C50","teal","Pantone 329 C"],
  ["Pantone 330 C","#004C40","teal","Pantone 330 C"],["Pantone 331 C","#B0E8D8","teal","Pantone 331 C"],
  ["Pantone 332 C","#78D8C0","teal","Pantone 332 C"],["Pantone 333 C","#62C8B0","green","Pantone 333 C"],
  ["Pantone 334 C","#00977D","green","Pantone 334 C"],["Pantone 335 C","#00826A","green","Pantone 335 C"],
  ["Pantone 336 C","#006A58","teal","Pantone 336 C"],["Pantone 337 C","#A8DCC8","green","Pantone 337 C"],
  ["Pantone 338 C","#70CCA8","green","Pantone 338 C"],["Pantone 339 C","#28BC90","green","Pantone 339 C"],
  ["Pantone 340 C","#5AB88C","green","Pantone 340 C"],["Pantone 341 C","#009F75","green","Pantone 341 C"],
  ["Pantone 342 C","#00835A","green","Pantone 342 C"],["Pantone 343 C","#006844","green","Pantone 343 C"],
  ["Pantone 344 C","#A8DCB4","green","Pantone 344 C"],["Pantone 345 C","#78CC8C","green","Pantone 345 C"],
  ["Pantone 346 C","#4EC078","green","Pantone 346 C"],["Pantone 347 C","#00A050","green","Pantone 347 C"],
  ["Pantone 348 C","#007A3E","green","Pantone 348 C"],["Pantone 349 C","#006633","green","Pantone 349 C"],
  ["Pantone 350 C","#244C2C","green","Pantone 350 C"],["Pantone 351 C","#BCECB8","green","Pantone 351 C"],
  ["Pantone 352 C","#88E490","green","Pantone 352 C"],["Pantone 353 C","#60DC70","green","Pantone 353 C"],
  ["Pantone 354 C","#00B140","green","Pantone 354 C"],["Pantone 355 C","#009440","green","Pantone 355 C"],
  ["Pantone 356 C","#007A33","green","Pantone 356 C"],["Pantone 357 C","#185C30","green","Pantone 357 C"],
  ["Pantone 358 C","#B8E48C","green","Pantone 358 C"],["Pantone 359 C","#A0E070","green","Pantone 359 C"],
  ["Pantone 360 C","#64CC3C","green","Pantone 360 C"],["Pantone 361 C","#50C878","green","Pantone 361 C"],
  ["Pantone 362 C","#43AA4E","green","Pantone 362 C"],["Pantone 363 C","#388C44","green","Pantone 363 C"],
  ["Pantone 364 C","#2E7038","green","Pantone 364 C"],["Pantone 365 C","#D0ECA0","green","Pantone 365 C"],
  ["Pantone 366 C","#BEE880","green","Pantone 366 C"],["Pantone 367 C","#9CDC60","green","Pantone 367 C"],
  ["Pantone 368 C","#74C044","green","Pantone 368 C"],["Pantone 369 C","#58A618","green","Pantone 369 C"],
  ["Pantone 370 C","#3F8220","green","Pantone 370 C"],
  // 371–390 Yellow-Greens
  ["Pantone 371 C","#2C5C10","green","Pantone 371 C"],["Pantone 372 C","#CCED8C","green","Pantone 372 C"],
  ["Pantone 373 C","#BFEA68","green","Pantone 373 C"],["Pantone 374 C","#A8E43C","green","Pantone 374 C"],
  ["Pantone 375 C","#9FCA3C","green","Pantone 375 C"],["Pantone 376 C","#84C226","green","Pantone 376 C"],
  ["Pantone 377 C","#62A00C","green","Pantone 377 C"],["Pantone 378 C","#4A7800","green","Pantone 378 C"],
  ["Pantone 379 C","#D8E840","yellow","Pantone 379 C"],["Pantone 380 C","#CDE018","yellow","Pantone 380 C"],
  ["Pantone 381 C","#C0D800","yellow","Pantone 381 C"],["Pantone 382 C","#B0CC00","yellow","Pantone 382 C"],
  ["Pantone 383 C","#8CA800","yellow","Pantone 383 C"],["Pantone 384 C","#6E8A00","yellow","Pantone 384 C"],
  ["Pantone 385 C","#546800","green","Pantone 385 C"],
  // Blacks & Grays
  ["Pantone Black C","#2B2B2C","gray","Pantone Black C"],["Pantone Black 2 C","#2C2A29","gray","Pantone Black 2 C"],
  ["Pantone Black 3 C","#1B1C20","gray","Pantone Black 3 C"],["Pantone Black 4 C","#1C1714","gray","Pantone Black 4 C"],
  ["Pantone Black 5 C","#1F1A17","gray","Pantone Black 5 C"],["Pantone Black 6 C","#101820","gray","Pantone Black 6 C"],
  ["Pantone Black 7 C","#1D1D1B","gray","Pantone Black 7 C"],["Pantone White","#F4F5F0","white","Pantone White"],
  ["Pantone Cool Gray 1 C","#E8E8E6","gray","Pantone Cool Gray 1 C"],
  ["Pantone Cool Gray 2 C","#DDDEDD","gray","Pantone Cool Gray 2 C"],
  ["Pantone Cool Gray 3 C","#D3D3D1","gray","Pantone Cool Gray 3 C"],
  ["Pantone Cool Gray 4 C","#C8C9C7","gray","Pantone Cool Gray 4 C"],
  ["Pantone Cool Gray 5 C","#B5B6B4","gray","Pantone Cool Gray 5 C"],
  ["Pantone Cool Gray 6 C","#A7A8A9","gray","Pantone Cool Gray 6 C"],
  ["Pantone Cool Gray 7 C","#989898","gray","Pantone Cool Gray 7 C"],
  ["Pantone Cool Gray 8 C","#888B8D","gray","Pantone Cool Gray 8 C"],
  ["Pantone Cool Gray 9 C","#76767A","gray","Pantone Cool Gray 9 C"],
  ["Pantone Cool Gray 10 C","#63666A","gray","Pantone Cool Gray 10 C"],
  ["Pantone Cool Gray 11 C","#53565A","gray","Pantone Cool Gray 11 C"],
  ["Pantone Warm Gray 1 C","#E0DBD1","gray","Pantone Warm Gray 1 C"],
  ["Pantone Warm Gray 2 C","#D5CFC8","gray","Pantone Warm Gray 2 C"],
  ["Pantone Warm Gray 3 C","#C6BEB4","gray","Pantone Warm Gray 3 C"],
  ["Pantone Warm Gray 4 C","#BAB0A8","gray","Pantone Warm Gray 4 C"],
  ["Pantone Warm Gray 5 C","#AFA89E","gray","Pantone Warm Gray 5 C"],
  ["Pantone Warm Gray 6 C","#A69B8C","gray","Pantone Warm Gray 6 C"],
  ["Pantone Warm Gray 7 C","#9C9285","gray","Pantone Warm Gray 7 C"],
  ["Pantone Warm Gray 8 C","#928880","gray","Pantone Warm Gray 8 C"],
  ["Pantone Warm Gray 9 C","#7E7063","gray","Pantone Warm Gray 9 C"],
  ["Pantone Warm Gray 10 C","#726258","brown","Pantone Warm Gray 10 C"],
  ["Pantone Warm Gray 11 C","#6A5D52","brown","Pantone Warm Gray 11 C"],
  // Special/Metallic approximations
  ["Pantone 871 C","#8B6914","brown","Pantone 871 C"],["Pantone 872 C","#9C7A1C","brown","Pantone 872 C"],
  ["Pantone 873 C","#A68C1C","brown","Pantone 873 C"],["Pantone 874 C","#B09828","brown","Pantone 874 C"],
  ["Pantone 875 C","#B09C38","brown","Pantone 875 C"],["Pantone 876 C","#B0A048","brown","Pantone 876 C"],
  ["Pantone 877 C","#8A8D8F","gray","Pantone 877 C"],
  // Popular named
  ["Pantone Orange 021 C","#FE5000","orange","Pantone Orange 021 C"],
  ["Pantone Red 032 C","#EF3340","red","Pantone Red 032 C"],
  ["Pantone Warm Red C","#F9423A","red","Pantone Warm Red C"],
  ["Pantone Rubine Red C","#CE0058","red","Pantone Rubine Red C"],
  ["Pantone Rhodamine Red C","#E0118F","pink","Pantone Rhodamine Red C"],
  ["Pantone Pink C","#D62598","pink","Pantone Pink C"],
  ["Pantone Purple C","#BB29BB","purple","Pantone Purple C"],
  ["Pantone Violet C","#440099","purple","Pantone Violet C"],
  ["Pantone Blue 072 C","#10069F","blue","Pantone Blue 072 C"],
  ["Pantone Reflex Blue C","#001A72","blue","Pantone Reflex Blue C"],
  ["Pantone Process Blue C","#0085CA","blue","Pantone Process Blue C"],
  ["Pantone Green C","#00A550","green","Pantone Green C"],
  ["Pantone Yellow C","#FEDD00","yellow","Pantone Yellow C"],
  ["Pantone Yellow 012 C","#FFD700","yellow","Pantone Yellow 012 C"],
  ["Pantone Cyan C","#00B5E2","cyan","Pantone Cyan C"],
  ["Pantone Magenta C","#D0006F","pink","Pantone Magenta C"],
];

// ── NCS Natural Color System — Extended ────────────────────
const NCS = [
  // Pure hues
  ["NCS S 0300-N","#F0F0F0","white","NCS S 0300-N"],["NCS S 0500-N","#EBEBEB","white","NCS S 0500-N"],
  ["NCS S 0502-Y","#EDEDEA","white","NCS S 0502-Y"],["NCS S 0502-R","#F0EAEB","white","NCS S 0502-R"],
  ["NCS S 1000-N","#D8D8D8","gray","NCS S 1000-N"],["NCS S 1002-Y","#D9D7D0","gray","NCS S 1002-Y"],
  ["NCS S 1002-R","#DAD2D2","gray","NCS S 1002-R"],["NCS S 1002-B","#D0D3D8","gray","NCS S 1002-B"],
  ["NCS S 1002-G","#D2D8D3","gray","NCS S 1002-G"],["NCS S 1500-N","#C4C4C4","gray","NCS S 1500-N"],
  ["NCS S 2000-N","#B5B5B5","gray","NCS S 2000-N"],["NCS S 2005-Y","#B6B3AC","gray","NCS S 2005-Y"],
  ["NCS S 2005-R","#B8ADAE","gray","NCS S 2005-R"],["NCS S 2005-B","#AAAFB8","gray","NCS S 2005-B"],
  ["NCS S 2005-G","#AAAFAB","gray","NCS S 2005-G"],["NCS S 2500-N","#A0A0A0","gray","NCS S 2500-N"],
  ["NCS S 3000-N","#8E8E8E","gray","NCS S 3000-N"],["NCS S 3005-Y","#908D87","gray","NCS S 3005-Y"],
  ["NCS S 3005-R","#918B8B","gray","NCS S 3005-R"],["NCS S 3005-B","#888B91","gray","NCS S 3005-B"],
  ["NCS S 3005-G","#898E89","gray","NCS S 3005-G"],["NCS S 3500-N","#7A7A7A","gray","NCS S 3500-N"],
  ["NCS S 4000-N","#6E6E6E","gray","NCS S 4000-N"],["NCS S 4500-N","#5C5C5C","gray","NCS S 4500-N"],
  ["NCS S 5000-N","#4E4E4E","gray","NCS S 5000-N"],["NCS S 5500-N","#404040","gray","NCS S 5500-N"],
  ["NCS S 6000-N","#343434","gray","NCS S 6000-N"],["NCS S 6500-N","#2A2A2A","gray","NCS S 6500-N"],
  ["NCS S 7000-N","#202020","gray","NCS S 7000-N"],["NCS S 8000-N","#181818","gray","NCS S 8000-N"],
  ["NCS S 9000-N","#101010","gray","NCS S 9000-N"],
  // Y (Yellow) series
  ["NCS S 0520-Y","#F5E8B0","yellow","NCS S 0520-Y"],["NCS S 0540-Y","#F5DA60","yellow","NCS S 0540-Y"],
  ["NCS S 0560-Y","#F5CC00","yellow","NCS S 0560-Y"],["NCS S 0580-Y","#F5C000","yellow","NCS S 0580-Y"],
  ["NCS S 1010-Y","#EAD89A","yellow","NCS S 1010-Y"],["NCS S 1020-Y","#E8D498","yellow","NCS S 1020-Y"],
  ["NCS S 1030-Y","#E8CE70","yellow","NCS S 1030-Y"],["NCS S 1040-Y","#E8C04A","yellow","NCS S 1040-Y"],
  ["NCS S 1060-Y","#E8A800","yellow","NCS S 1060-Y"],["NCS S 1080-Y","#E89600","orange","NCS S 1080-Y"],
  ["NCS S 2005-Y","#C8BEA0","yellow","NCS S 2005-Y"],["NCS S 2010-Y","#C8B880","yellow","NCS S 2010-Y"],
  ["NCS S 2020-Y","#C8A860","yellow","NCS S 2020-Y"],["NCS S 2030-Y","#C89A40","yellow","NCS S 2030-Y"],
  ["NCS S 2040-Y","#C89030","yellow","NCS S 2040-Y"],["NCS S 2050-Y","#C87C10","orange","NCS S 2050-Y"],
  ["NCS S 2060-Y","#C87800","orange","NCS S 2060-Y"],["NCS S 2070-Y","#C87000","orange","NCS S 2070-Y"],
  ["NCS S 2080-Y","#C86400","orange","NCS S 2080-Y"],["NCS S 3010-Y","#A89870","brown","NCS S 3010-Y"],
  ["NCS S 3020-Y","#A07840","brown","NCS S 3020-Y"],["NCS S 3030-Y","#A07030","brown","NCS S 3030-Y"],
  ["NCS S 3040-Y","#A06418","orange","NCS S 3040-Y"],["NCS S 3050-Y","#A05808","orange","NCS S 3050-Y"],
  ["NCS S 3060-Y","#A05000","orange","NCS S 3060-Y"],["NCS S 4010-Y","#787060","brown","NCS S 4010-Y"],
  ["NCS S 4020-Y","#785030","brown","NCS S 4020-Y"],["NCS S 4030-Y","#784520","brown","NCS S 4030-Y"],
  ["NCS S 4040-Y","#783808","brown","NCS S 4040-Y"],["NCS S 5010-Y","#584A40","brown","NCS S 5010-Y"],
  ["NCS S 5020-Y","#583020","brown","NCS S 5020-Y"],["NCS S 6010-Y","#3C3028","brown","NCS S 6010-Y"],
  // Y10R
  ["NCS S 0520-Y10R","#F5E0A0","yellow","NCS S 0520-Y10R"],["NCS S 0540-Y10R","#F5CC60","yellow","NCS S 0540-Y10R"],
  ["NCS S 0560-Y10R","#F5B820","orange","NCS S 0560-Y10R"],["NCS S 0580-Y10R","#F5A800","orange","NCS S 0580-Y10R"],
  ["NCS S 1040-Y10R","#E8B840","orange","NCS S 1040-Y10R"],["NCS S 1060-Y10R","#E8A000","orange","NCS S 1060-Y10R"],
  ["NCS S 1080-Y10R","#E88800","orange","NCS S 1080-Y10R"],["NCS S 2040-Y10R","#C89030","orange","NCS S 2040-Y10R"],
  ["NCS S 2060-Y10R","#C87800","orange","NCS S 2060-Y10R"],["NCS S 3040-Y10R","#A06018","brown","NCS S 3040-Y10R"],
  // Y20R
  ["NCS S 0520-Y20R","#F5D8A0","yellow","NCS S 0520-Y20R"],["NCS S 0540-Y20R","#F5C460","orange","NCS S 0540-Y20R"],
  ["NCS S 0560-Y20R","#F5A828","orange","NCS S 0560-Y20R"],["NCS S 0580-Y20R","#F59800","orange","NCS S 0580-Y20R"],
  ["NCS S 1040-Y20R","#E8A840","orange","NCS S 1040-Y20R"],["NCS S 1060-Y20R","#E89000","orange","NCS S 1060-Y20R"],
  ["NCS S 1080-Y20R","#E87800","orange","NCS S 1080-Y20R"],["NCS S 2040-Y20R","#C87828","orange","NCS S 2040-Y20R"],
  ["NCS S 2060-Y20R","#C86400","orange","NCS S 2060-Y20R"],["NCS S 3040-Y20R","#A04E18","brown","NCS S 3040-Y20R"],
  // Y30R
  ["NCS S 0520-Y30R","#F5D4A0","yellow","NCS S 0520-Y30R"],["NCS S 0540-Y30R","#F5C060","orange","NCS S 0540-Y30R"],
  ["NCS S 0560-Y30R","#F5A828","orange","NCS S 0560-Y30R"],["NCS S 0580-Y30R","#F59000","orange","NCS S 0580-Y30R"],
  ["NCS S 1040-Y30R","#E89840","orange","NCS S 1040-Y30R"],["NCS S 1060-Y30R","#E87818","orange","NCS S 1060-Y30R"],
  ["NCS S 1080-Y30R","#E86000","orange","NCS S 1080-Y30R"],["NCS S 2040-Y30R","#C87030","brown","NCS S 2040-Y30R"],
  ["NCS S 2060-Y30R","#C85010","orange","NCS S 2060-Y30R"],["NCS S 3040-Y30R","#A04820","brown","NCS S 3040-Y30R"],
  // Y50R (strong orange)
  ["NCS S 0560-Y50R","#F59060","orange","NCS S 0560-Y50R"],["NCS S 0580-Y50R","#F57828","orange","NCS S 0580-Y50R"],
  ["NCS S 1060-Y50R","#E86030","orange","NCS S 1060-Y50R"],["NCS S 1080-Y50R","#E84800","red","NCS S 1080-Y50R"],
  ["NCS S 2060-Y50R","#C84020","red","NCS S 2060-Y50R"],["NCS S 2080-Y50R","#C83000","red","NCS S 2080-Y50R"],
  ["NCS S 3060-Y50R","#A02818","red","NCS S 3060-Y50R"],["NCS S 4050-Y50R","#7A2010","brown","NCS S 4050-Y50R"],
  // Y70R (red-orange)
  ["NCS S 0560-Y70R","#F07060","red","NCS S 0560-Y70R"],["NCS S 0580-Y70R","#F05030","red","NCS S 0580-Y70R"],
  ["NCS S 1060-Y70R","#E04030","red","NCS S 1060-Y70R"],["NCS S 1080-Y70R","#E03018","red","NCS S 1080-Y70R"],
  ["NCS S 2060-Y70R","#B83020","red","NCS S 2060-Y70R"],["NCS S 3060-Y70R","#902018","red","NCS S 3060-Y70R"],
  // Y90R (red)
  ["NCS S 0560-Y90R","#F06060","red","NCS S 0560-Y90R"],["NCS S 0580-Y90R","#F04040","red","NCS S 0580-Y90R"],
  ["NCS S 1060-Y90R","#E03030","red","NCS S 1060-Y90R"],["NCS S 1080-Y90R","#E01818","red","NCS S 1080-Y90R"],
  ["NCS S 2060-Y90R","#C02020","red","NCS S 2060-Y90R"],["NCS S 3060-Y90R","#901818","red","NCS S 3060-Y90R"],
  // R (Red) series
  ["NCS S 0520-R","#F5C8C8","pink","NCS S 0520-R"],["NCS S 0540-R","#F59898","pink","NCS S 0540-R"],
  ["NCS S 0560-R","#F56868","red","NCS S 0560-R"],["NCS S 0580-R","#F53838","red","NCS S 0580-R"],
  ["NCS S 1010-R","#E8B0B0","pink","NCS S 1010-R"],["NCS S 1020-R","#E89898","pink","NCS S 1020-R"],
  ["NCS S 1030-R","#E88080","red","NCS S 1030-R"],["NCS S 1040-R","#E07070","red","NCS S 1040-R"],
  ["NCS S 1060-R","#E04040","red","NCS S 1060-R"],["NCS S 1080-R","#E01010","red","NCS S 1080-R"],
  ["NCS S 2010-R","#C09090","pink","NCS S 2010-R"],["NCS S 2020-R","#B87878","pink","NCS S 2020-R"],
  ["NCS S 2030-R","#B86060","red","NCS S 2030-R"],["NCS S 2040-R","#B84848","red","NCS S 2040-R"],
  ["NCS S 2060-R","#B81818","red","NCS S 2060-R"],["NCS S 3010-R","#907070","brown","NCS S 3010-R"],
  ["NCS S 3020-R","#905858","brown","NCS S 3020-R"],["NCS S 3030-R","#904040","red","NCS S 3030-R"],
  ["NCS S 3040-R","#902828","red","NCS S 3040-R"],["NCS S 4020-R","#683838","brown","NCS S 4020-R"],
  ["NCS S 4030-R","#682020","brown","NCS S 4030-R"],["NCS S 5020-R","#483030","brown","NCS S 5020-R"],
  ["NCS S 6010-R","#302020","brown","NCS S 6010-R"],
  // R10B (Red-Pink)
  ["NCS S 0540-R10B","#F090C0","pink","NCS S 0540-R10B"],["NCS S 0560-R10B","#F068B0","pink","NCS S 0560-R10B"],
  ["NCS S 1040-R10B","#D878A8","pink","NCS S 1040-R10B"],["NCS S 1060-R10B","#D04890","pink","NCS S 1060-R10B"],
  ["NCS S 2040-R10B","#B06088","pink","NCS S 2040-R10B"],["NCS S 2060-R10B","#A83070","pink","NCS S 2060-R10B"],
  // R20B
  ["NCS S 0540-R20B","#F088C8","pink","NCS S 0540-R20B"],["NCS S 0560-R20B","#E860B8","pink","NCS S 0560-R20B"],
  ["NCS S 1040-R20B","#D070A8","pink","NCS S 1040-R20B"],["NCS S 1060-R20B","#C83898","pink","NCS S 1060-R20B"],
  ["NCS S 2040-R20B","#A85888","pink","NCS S 2040-R20B"],["NCS S 2060-R20B","#A02878","purple","NCS S 2060-R20B"],
  // R30B (Pink-Purple)
  ["NCS S 0540-R30B","#F090C8","pink","NCS S 0540-R30B"],["NCS S 0560-R30B","#E858B0","pink","NCS S 0560-R30B"],
  ["NCS S 1040-R30B","#D068A8","pink","NCS S 1040-R30B"],["NCS S 1060-R30B","#C03890","pink","NCS S 1060-R30B"],
  ["NCS S 2040-R30B","#A84888","purple","NCS S 2040-R30B"],["NCS S 2060-R30B","#981878","purple","NCS S 2060-R30B"],
  // R50B (Violet)
  ["NCS S 0540-R50B","#D090D0","purple","NCS S 0540-R50B"],["NCS S 0560-R50B","#C060C0","purple","NCS S 0560-R50B"],
  ["NCS S 1040-R50B","#B868B8","purple","NCS S 1040-R50B"],["NCS S 1060-R50B","#A83AA8","purple","NCS S 1060-R50B"],
  ["NCS S 2040-R50B","#904890","purple","NCS S 2040-R50B"],["NCS S 2060-R50B","#801880","purple","NCS S 2060-R50B"],
  ["NCS S 3040-R50B","#683068","purple","NCS S 3040-R50B"],["NCS S 4030-R50B","#502050","purple","NCS S 4030-R50B"],
  // R70B
  ["NCS S 0540-R70B","#B0A0D8","purple","NCS S 0540-R70B"],["NCS S 0560-R70B","#8870C8","purple","NCS S 0560-R70B"],
  ["NCS S 1040-R70B","#8068B8","purple","NCS S 1040-R70B"],["NCS S 1060-R70B","#6040A8","purple","NCS S 1060-R70B"],
  ["NCS S 2040-R70B","#604890","purple","NCS S 2040-R70B"],["NCS S 2060-R70B","#401878","purple","NCS S 2060-R70B"],
  ["NCS S 3040-R70B","#483070","purple","NCS S 3040-R70B"],
  // R90B (Blue-Purple)
  ["NCS S 0540-R90B","#9898D8","blue","NCS S 0540-R90B"],["NCS S 0560-R90B","#6868C8","blue","NCS S 0560-R90B"],
  ["NCS S 1040-R90B","#6868B8","blue","NCS S 1040-R90B"],["NCS S 1060-R90B","#3838A8","blue","NCS S 1060-R90B"],
  ["NCS S 2040-R90B","#484898","blue","NCS S 2040-R90B"],["NCS S 2060-R90B","#283080","blue","NCS S 2060-R90B"],
  // B (Blue) series
  ["NCS S 0520-B","#C0D8F0","blue","NCS S 0520-B"],["NCS S 0540-B","#88B8E8","blue","NCS S 0540-B"],
  ["NCS S 0560-B","#5898E0","blue","NCS S 0560-B"],["NCS S 0580-B","#2878D8","blue","NCS S 0580-B"],
  ["NCS S 1010-B","#A8C8E0","blue","NCS S 1010-B"],["NCS S 1020-B","#90B8D8","blue","NCS S 1020-B"],
  ["NCS S 1030-B","#78A8D0","blue","NCS S 1030-B"],["NCS S 1040-B","#70A8D0","blue","NCS S 1040-B"],
  ["NCS S 1060-B","#3888C0","blue","NCS S 1060-B"],["NCS S 1080-B","#0868B8","blue","NCS S 1080-B"],
  ["NCS S 2010-B","#8090A8","blue","NCS S 2010-B"],["NCS S 2020-B","#6880A0","blue","NCS S 2020-B"],
  ["NCS S 2030-B","#5878A0","blue","NCS S 2030-B"],["NCS S 2040-B","#4878A0","blue","NCS S 2040-B"],
  ["NCS S 2060-B","#1858A0","blue","NCS S 2060-B"],["NCS S 3020-B","#485878","blue","NCS S 3020-B"],
  ["NCS S 3040-B","#285878","blue","NCS S 3040-B"],["NCS S 4020-B","#384858","blue","NCS S 4020-B"],
  ["NCS S 5020-B","#283040","blue","NCS S 5020-B"],["NCS S 6010-B","#182028","gray","NCS S 6010-B"],
  // B20G
  ["NCS S 0540-B20G","#68C8D8","teal","NCS S 0540-B20G"],["NCS S 0560-B20G","#38B8C8","teal","NCS S 0560-B20G"],
  ["NCS S 1040-B20G","#60A8B8","teal","NCS S 1040-B20G"],["NCS S 2040-B20G","#408090","teal","NCS S 2040-B20G"],
  ["NCS S 3040-B20G","#286878","teal","NCS S 3040-B20G"],
  // B30G
  ["NCS S 0540-B30G","#60C0C0","teal","NCS S 0540-B30G"],["NCS S 0560-B30G","#30A8A8","teal","NCS S 0560-B30G"],
  ["NCS S 1040-B30G","#50A0A0","teal","NCS S 1040-B30G"],["NCS S 2040-B30G","#307878","teal","NCS S 2040-B30G"],
  ["NCS S 3040-B30G","#205858","teal","NCS S 3040-B30G"],["NCS S 4030-B30G","#184848","teal","NCS S 4030-B30G"],
  // B50G (Teal)
  ["NCS S 0540-B50G","#50C8A0","teal","NCS S 0540-B50G"],["NCS S 0560-B50G","#28B888","teal","NCS S 0560-B50G"],
  ["NCS S 1040-B50G","#40A080","teal","NCS S 1040-B50G"],["NCS S 1060-B50G","#189870","teal","NCS S 1060-B50G"],
  ["NCS S 2040-B50G","#208060","teal","NCS S 2040-B50G"],["NCS S 3040-B50G","#186050","teal","NCS S 3040-B50G"],
  // B70G
  ["NCS S 0540-B70G","#40C880","green","NCS S 0540-B70G"],["NCS S 0560-B70G","#18B868","green","NCS S 0560-B70G"],
  ["NCS S 1040-B70G","#30A860","green","NCS S 1040-B70G"],["NCS S 1060-B70G","#089850","green","NCS S 1060-B70G"],
  ["NCS S 2040-B70G","#188040","green","NCS S 2040-B70G"],["NCS S 3040-B70G","#106030","green","NCS S 3040-B70G"],
  // G (Green) series
  ["NCS S 0520-G","#C0E8C0","green","NCS S 0520-G"],["NCS S 0540-G","#80D080","green","NCS S 0540-G"],
  ["NCS S 0560-G","#48B848","green","NCS S 0560-G"],["NCS S 0580-G","#10A010","green","NCS S 0580-G"],
  ["NCS S 1010-G","#A8C8A8","green","NCS S 1010-G"],["NCS S 1020-G","#A0C8A0","green","NCS S 1020-G"],
  ["NCS S 1030-G","#80C080","green","NCS S 1030-G"],["NCS S 1040-G","#60B060","green","NCS S 1040-G"],
  ["NCS S 1060-G","#289828","green","NCS S 1060-G"],["NCS S 1080-G","#008800","green","NCS S 1080-G"],
  ["NCS S 2010-G","#7A9878","green","NCS S 2010-G"],["NCS S 2020-G","#789878","green","NCS S 2020-G"],
  ["NCS S 2030-G","#589060","green","NCS S 2030-G"],["NCS S 2040-G","#489048","green","NCS S 2040-G"],
  ["NCS S 2060-G","#187818","green","NCS S 2060-G"],["NCS S 3010-G","#587058","green","NCS S 3010-G"],
  ["NCS S 3020-G","#507050","green","NCS S 3020-G"],["NCS S 3030-G","#386840","green","NCS S 3030-G"],
  ["NCS S 3040-G","#306030","green","NCS S 3040-G"],["NCS S 4020-G","#385038","green","NCS S 4020-G"],
  ["NCS S 4030-G","#304030","green","NCS S 4030-G"],["NCS S 5020-G","#283828","green","NCS S 5020-G"],
  ["NCS S 6010-G","#202820","green","NCS S 6010-G"],
  // G10Y
  ["NCS S 0540-G10Y","#88D870","green","NCS S 0540-G10Y"],["NCS S 0560-G10Y","#60C850","green","NCS S 0560-G10Y"],
  ["NCS S 1040-G10Y","#78C060","green","NCS S 1040-G10Y"],["NCS S 2040-G10Y","#58A040","green","NCS S 2040-G10Y"],
  ["NCS S 3040-G10Y","#3E7830","green","NCS S 3040-G10Y"],
  // G20Y
  ["NCS S 0540-G20Y","#A0D870","green","NCS S 0540-G20Y"],["NCS S 0560-G20Y","#78C848","green","NCS S 0560-G20Y"],
  ["NCS S 1040-G20Y","#88C050","green","NCS S 1040-G20Y"],["NCS S 2040-G20Y","#68A030","green","NCS S 2040-G20Y"],
  ["NCS S 3040-G20Y","#4E7820","green","NCS S 3040-G20Y"],
  // G30Y
  ["NCS S 0540-G30Y","#B8D868","green","NCS S 0540-G30Y"],["NCS S 0560-G30Y","#98C840","green","NCS S 0560-G30Y"],
  ["NCS S 1040-G30Y","#A0C040","green","NCS S 1040-G30Y"],["NCS S 2040-G30Y","#809820","green","NCS S 2040-G30Y"],
  ["NCS S 3040-G30Y","#607010","green","NCS S 3040-G30Y"],
  // G50Y (Yellow-Green)
  ["NCS S 0540-G50Y","#D0D860","yellow","NCS S 0540-G50Y"],["NCS S 0560-G50Y","#B8C828","yellow","NCS S 0560-G50Y"],
  ["NCS S 1040-G50Y","#C0C030","yellow","NCS S 1040-G50Y"],["NCS S 2040-G50Y","#A0A010","yellow","NCS S 2040-G50Y"],
  ["NCS S 3040-G50Y","#787800","yellow","NCS S 3040-G50Y"],
  // G70Y
  ["NCS S 0540-G70Y","#E0D850","yellow","NCS S 0540-G70Y"],["NCS S 0560-G70Y","#D0C810","yellow","NCS S 0560-G70Y"],
  ["NCS S 1040-G70Y","#D0C820","yellow","NCS S 1040-G70Y"],["NCS S 2040-G70Y","#B0A800","yellow","NCS S 2040-G70Y"],
  ["NCS S 3040-G70Y","#888000","yellow","NCS S 3040-G70Y"],
  // G90Y (Yellow)
  ["NCS S 0540-G90Y","#F0E050","yellow","NCS S 0540-G90Y"],["NCS S 0560-G90Y","#E8D000","yellow","NCS S 0560-G90Y"],
  ["NCS S 1040-G90Y","#E0C820","yellow","NCS S 1040-G90Y"],["NCS S 2040-G90Y","#C0A800","yellow","NCS S 2040-G90Y"],
  ["NCS S 3040-G90Y","#988000","yellow","NCS S 3040-G90Y"],
];

// ── DB class ───────────────────────────────────────────────
class ColorDB {
  constructor() { this.data = null; this._load(); }

  _load() {
    if (fs.existsSync(DB_PATH)) {
      try {
        this.data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
        console.log(`Loaded ${this.data.colors.length} colors from database`);
        return;
      } catch (e) { console.warn("DB corrupt, re-seeding:", e.message); }
    }
    this._seed();
  }

  _seed() {
    let id = 1;
    const now = new Date().toISOString();
    const colors = [];

    for (const [name, hex, family] of CSS)
      colors.push({ id: id++, name, hex: hex.toUpperCase(), family, source: "css", code: null, created_at: now });

    for (const [name, hex, family, code] of RAL_CLASSIC)
      colors.push({ id: id++, name, hex: hex.toUpperCase(), family, source: "ral_classic", code, created_at: now });

    for (const [name, hex, family, code] of RAL_DESIGN)
      colors.push({ id: id++, name, hex: hex.toUpperCase(), family, source: "ral_design", code, created_at: now });

    for (const [name, hex, family, code] of PANTONE)
      colors.push({ id: id++, name, hex: hex.toUpperCase(), family, source: "pantone", code, created_at: now });

    for (const [name, hex, family, code] of NCS)
      colors.push({ id: id++, name, hex: hex.toUpperCase(), family, source: "ncs", code, created_at: now });

    this.data = { version: 3, colors };
    this._save();
    console.log(`Seeded: ${CSS.length} CSS · ${RAL_CLASSIC.length} RAL Classic · ${RAL_DESIGN.length} RAL Design · ${PANTONE.length} Pantone · ${NCS.length} NCS`);
    console.log(`Total: ${colors.length} colors`);
  }

  _save() { fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2)); }

  getAll({ source, family } = {}) {
    let c = [...this.data.colors];
    if (source) c = c.filter(x => x.source === source);
    if (family) c = c.filter(x => x.family === family);
    return c.sort((a, b) => a.family.localeCompare(b.family) || a.name.localeCompare(b.name));
  }

  getSources() {
    const map = {};
    for (const c of this.data.colors) map[c.source] = (map[c.source] || 0) + 1;
    return Object.entries(map).map(([source, count]) => ({ source, count }))
      .sort((a, b) => a.source.localeCompare(b.source));
  }

  getFamilies() {
    const map = {};
    for (const c of this.data.colors) map[c.family] = (map[c.family] || 0) + 1;
    return Object.entries(map).map(([family, count]) => ({ family, count }))
      .sort((a, b) => b.count - a.count);
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
