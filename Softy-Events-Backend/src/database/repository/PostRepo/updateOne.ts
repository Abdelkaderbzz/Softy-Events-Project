import IPost, { PostModel } from "../../model/post";
const updateOne = async (
  postId: object,
  report: object
): Promise<IPost | null> => {
  return await PostModel.findOneAndUpdate(
    postId,
    { $set: report },
    { new: true, runValidators: true }
  );
};
export default updateOne;
