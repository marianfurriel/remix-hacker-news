export interface ILocation {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state?: Object, 
}

export interface IStory {
  author: string,
  id: number,
  descendants?: number,
  children?: IComment,
  kids?: number[],
  score?: number,
  time?: number,
  created_at_i?: number,
  title: string,
  type: string,
  url?: string,
  text?: string,
  points?: number,
};

export interface IJob {
  by: string,
  id: number, 
  score: number,
  text: string,
  time: number,
  title: string,
  type: string,
  url?: string,
}

export interface IComment {
  author: string;
  children: IComment[];
  created_at: string;
  created_at_i: number;
  id: number;
  parent_id?: number;
  points: number;
  story_id?: number;
  text?: string;
  title: string;
  type: string;
  url: string;
}