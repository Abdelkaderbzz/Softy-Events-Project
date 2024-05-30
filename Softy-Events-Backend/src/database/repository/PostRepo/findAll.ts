import IPost, { PostModel } from "../../model/post";
import { PaginationModel } from "mongoose-paginate-ts";
import APIFeatures from "../../../helpers/apiFeatures";
import { ApiOptions } from "app-request";

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: pagingObj,
  query: object,
  apiOptions: ApiOptions,
  post?: Object
): Promise<PaginationModel<IPost>> => {
  let findAllQuery = PostModel.find(post ? { post: post } : {});

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .search(["title","content"]);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  return (await PostModel.paginate(options)) as PaginationModel<IPost>;
};

export default findAll;
