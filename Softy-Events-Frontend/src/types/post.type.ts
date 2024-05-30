export type IPost = {
  _id?:string;
  title: string
  content: string
  postType: PostType
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  postPicUrl: string
  date: Date
}
export enum PostType {
  NEWS = 'NEWS',
  EVENT = 'EVENT',
  ARTICLE = 'ARTICLE',
}
