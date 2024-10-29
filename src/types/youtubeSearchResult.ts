export type YoutubeSearchResult = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
};

export type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

export type Item = {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
};

export type Id = {
  kind: string;
  videoId: string;
};

export type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
};

export type Thumbnails = {
  default: Default;
  medium: Medium;
  high: High;
};

export type Default = {
  url: string;
  width: number;
  height: number;
};

export type Medium = {
  url: string;
  width: number;
  height: number;
};

export type High = {
  url: string;
  width: number;
  height: number;
};
