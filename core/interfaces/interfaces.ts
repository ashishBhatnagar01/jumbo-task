export interface ResponseInterface {
  data: any;
  message: string;
  httpStatus: number;
}

export interface UserInterface {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface WatchListInterface {
  id: string;
  video_id: string;
  user_id: string;
  video: {
    id: string;
    video_id: string;
    title: string;
    description: string;
    published_at: string;
    thumbnail_url: string;
    video_url: string;
  };
}
