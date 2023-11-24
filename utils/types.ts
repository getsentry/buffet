export enum ItemType {
  IMAGE = "image", // just link to resource URI
  INSTAGRAM = "instagram",
  MASTODON = "mastodon",
  REDDIT = "reddit",
  TWITTER = "twitter",
  THREADS = "threads",
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

// TODO: split creation and display types
export type Plate = {
  id: number;
  user_id: string | null; // null in v1
  date_created?: string;
  last_updated?: string;
  plate_ids?: string[]; // remixed plates
  fingerprint: string; // hash or custom string (future)
  title: string;
  description: string;
  author: AuthorProfile;
};

export type UrlMetaData = {
  title: string | null;
  description: string | null;
  favicon: string | null;
  openGraphImageUrl: string | null;
};

export type Item = {
  id: number;
  user_id: string | null; // null in v1
  date_created?: string;
  last_updated?: string;
  plate_id: number;
  url: string;
  type: ItemType; // default ItemType.URL
  metaData: UrlMetaData;
  description: string; // limit to 140 chars
};
