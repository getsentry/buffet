import { H3Event } from "h3";
// import { JSDOM } from "jsdom";

export default defineEventHandler(async (event: H3Event) => {
  // const query = getQuery(event);
  // if (query.url !== undefined) {
  //   const pageAsText = await fetch(query.url as string).then((res) =>
  //     res.text()
  //   );
  //   const document = new JSDOM(pageAsText).window;
  //   const metaTags = document.getElementsByTagName("meta") as HTMLCollection;
  //   // THIS IS A PROOF OF CONCEPT
  //   // WE NEED TO USE A PACKAGE BECAUSE IT IS HELL
  //   // HOW ABOUT node-html-parser?
  //   // NOTE by Tess - Added package jsdom
  //   const collected = {};
  //   for (key in metaTags) {
  //     const metaTag = metaTags[key];
  //     const name = metaTag.attributes?.name;
  //     const property = metaTag.attributes?.property;
  //     const content = metaTag.attributes?.content;
  //     switch (name) {
  //       case "title":
  //       case "twitter:title":
  //         collected.title = content;
  //         break;
  //       case "description":
  //       case "twitter:description":
  //         collected.description = content;
  //         break;
  //     }
  //     switch (property) {
  //       case "og:image":
  //         collected.openGraphImageUrl = content.startsWith("http")
  //           ? content
  //           : "";
  //     }
  //   }
  //   if (!collected.title) {
  //     // NOTE by Tess - With this setup we have the pref for the meta tag tile content
  //     collected.title =
  //       document.getElementsByTagName("title")[0].outerText || "";
  //   }
  //   const faviconMatch = pageAsText.match(/rel="icon" href="(.*?)"/);
  //   const favicon =
  //     faviconMatch !== null ? `${query.url}/${faviconMatch[1]}` : "";
  //   const titleMatch = pageAsText.match(/<title>(.*?)<\/title>/);
  //   const title = titleMatch !== null ? titleMatch[1] : "";
  //   // this doesn't work lol
  //   // NOTE by Tess - Checked in the for loop
  //   // const metaDescMatch = pageAsText.match(
  //   //   /<meta name="description" content="(.*?)">/
  //   // );
  //   // const metaDesc = metaDescMatch !== null ? metaDescMatch[1] : "";
  //   // this works for meta tags that have property="og:image" content="https://..." in that order
  //   // need to work out how to do it for meta tags that have content="https://..." property="og:image" in that order
  //   // without capturing a billion characters in between
  //   // example: https://freecodecamp.org
  //   // NOTE by Tess - Checked in the for loop
  //   // const ogImageUrlMatch = pageAsText.match(
  //   //   /property="og:image" content="(.*?)"/
  //   // );
  //   // const ogImageUrl = ogImageUrlMatch !== null ? ogImageUrlMatch[1] : "";
  //   // const validOgImageUrl = ogImageUrl.startsWith("http") ? ogImageUrl : "";
  //   // NOTE by Tess - Retuned collected object
  //   // return {
  //   //   title: title,
  //   //   description: metaDesc,
  //   //   favicon: favicon,
  //   //   openGraphImageUrl: validOgImageUrl,
  //   // };
  //   return collected;
  // }
});
