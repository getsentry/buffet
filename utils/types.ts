export const enumItemType = {
  IMAGE: "image", // just link to resource URI
  INSTAGRAM: "instagram",
  MASTODON: "mastodon",
  REDDIT: "reddit",
  TWITTER: "twitter",
  THREADS: "threads",
  TIKTOK: "tiktok",
  GITHUB: "github",
  URL: "url",
  YOUTUBE: "youtube",
  PLATE: "plate", // can only be added to a tray
} as const;

export type ItemType = (typeof enumItemType)[keyof typeof enumItemType];

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
  id: number | null; // null for /create
  ui_id: string;
  date_created?: string;
  last_updated?: string;
  plate_ids?: string[]; // remixed plates
  title: string;
  description: string;
  author_profile_id?: number;
};

export type UrlMetaData = {
  title: string | null;
  description: string | null;
  favicon: string | null;
  openGraphImageUrl: string | null;
};

export type Item = {
  ui_id: string;
  user_id: string | null; // null in v1
  date_created?: string;
  last_updated?: string;
  plate_id: number | null;
  url: string;
  type: ItemType; // default ItemType.URL
  metaData: UrlMetaData;
  description: string; // limit to 140 chars
};
