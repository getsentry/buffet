export enum ItemType {
  IMAGE = "image", // just link to resource URI
  INSTAGRAM = "instagram",
  MASTODON = "mastodon",
  REDDIT = "reddit",
  TWITTER = "twitter",
  THREAD = "thread",
  TIKTOK = "tiktok",
  GITHUB = "github",
  URL = "url",
  YOUTUBE = "youtube",
  PLATE = "plate", // can only be added to a tray
}

export type Plate = {
  id: string;
  user_id: string | null; // null in v1
  plate_ids?: string[]; // remixed plates
  date_created?: string;
  last_updated?: string;
  title: string;
  description: string;
  author: {
    name: string;
    socialLinks: {
      twitter?: string;
      youtube?: string;
      mastodon?: string;
      bsky?: string;
      instagram?: string;
      tiktok?: string;
      discord?: string;
      reddit?: string;
      linkedin?: string;
      website?: string;
      threads?: string;
    };
  };
};

export type Item = {
  id: string;
  user_id: string | null; // null in v1
  plate_ids: string[]; // at least one
  date_created: string;
  last_updated: string;
  url: string;
  type: ItemType; // default ItemType.URL
  metaData: {
    // mainly for URL types
    metaTitle: string | null;
    metaDescription: string | null;
    favicon: string | null;
    openGraphImageUrl: string | null;
  };
  description: string | null; // limit to 140 chars
};
