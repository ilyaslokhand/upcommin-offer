import * as cheerio from "cheerio";

export function removeInlineStyles(html = "") {
  if (!html) return "";

  // false prevents Cheerio from adding html/head/body wrappers
  const $ = cheerio.load(html, null, false);

  // Find every element containing style="..." and remove that attribute
  $("[style]").not("img").removeAttr("style");

  return $.html();
}
