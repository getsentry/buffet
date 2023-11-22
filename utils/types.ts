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

export type AuthorProfile = {
  name: string;
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

export type Plate = {
  id: string;
  user_id: string | null; // null in v1
  date_created?: string;
  last_updated?: string;
  plate_ids?: string[]; // remixed plates
  fingerprint: string; // hash or custom string (future)
  title: string;
  description: string;
  author?: AuthorProfile;
};

export type Item = {
  id: number;
  user_id: string | null; // null in v1
  date_created: string;
  last_updated: string;
  plate: Plate;
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
