import IPost, { PostModel } from "../../model/post";

const create = async (report: object): Promise<IPost> => {
  return await (
    await PostModel.create(report)
  ).populate({
    path: "createdBy",
  });
};
export default create;
