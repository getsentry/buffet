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
  author: string; // raw input assuming we are not using auth
  items: Item[];
  socialLinks: {
    twitter?: string; // optional
    youtube?: string; // optional
    mastodon?: string; // optional
    bsky?: string; // optional
    instagram?: string; // optional
    tiktok?: string; // optional
    discord?: string; // optional
    reddit?: string; // optional
    linkedin?: string; // optional
    website?: string; // optional
    threads?: string; // optional
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
