import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);

  if (query.url !== undefined) {
    const pageAsText = await fetch(query.url as string).then((res) =>
      res.text()
    );

    // THIS IS A PROOF OF CONCEPT
    // WE NEED TO USE A PACKAGE BECAUSE IT IS HELL
    // HOW ABOUT node-html-parser?

    const faviconMatch = pageAsText.match(/rel="icon" href="(.*?)"/);
    const favicon =
      faviconMatch !== null ? `${query.url}/${faviconMatch[1]}` : "";

    const titleMatch = pageAsText.match(/<title>(.*?)<\/title>/);
    const title = titleMatch !== null ? titleMatch[1] : "";

    // this doesn't work lol
    const metaDescMatch = pageAsText.match(
      /<meta name="description" content="(.*?)">/
    );

    const metaDesc = metaDescMatch !== null ? metaDescMatch[1] : "";

    // this works for meta tags that have property="og:image" content="https://..." in that order
    // need to work out how to do it for meta tags that have content="https://..." property="og:image" in that order
    // without capturing a billion characters in between
    // example: https://freecodecamp.org
    const ogImageUrlMatch = pageAsText.match(
      /property="og:image" content="(.*?)"/
    );

    const ogImageUrl = ogImageUrlMatch !== null ? ogImageUrlMatch[1] : "";
    const validOgImageUrl = ogImageUrl.startsWith("http") ? ogImageUrl : "";

    return {
      title: title,
      description: metaDesc,
      favicon: favicon,
      openGraphImageUrl: validOgImageUrl,
    };
  }
});
