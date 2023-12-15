import { H3Event } from "h3";
import urlMetadata from "url-metadata";
import { type UrlMetaData } from "../../utils/types";

function getValidOgImageUrl(fetchedUrl: string): string | null {
  try {
    const fullOgImage = new URL(fetchedUrl);
    return fetchedUrl;
  } catch (error) {
    return null;
  }
}

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);
  if (query.url !== undefined) {
    try {
      const fetchedMetadata = await urlMetadata(query.url as string, {
        mode: "cors",
      });
      return {
        title: fetchedMetadata.title,
        description: fetchedMetadata.description,
        favicon: null, //this is complicated
        openGraphImageUrl: getValidOgImageUrl(
          fetchedMetadata["og:image"] as string
        ),
      } as UrlMetaData;
    } catch (err) {
      console.log("fetch error:", err);
    }
  }
});
