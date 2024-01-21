import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCommentByPostId, createComment } from "@/hooks/useComment";

export const Comment = (props) => {
  const { postId } = props;
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => await getCommentByPostId(postId),
    enabled: !!postId,
  });

  const { mutate } = useMutation({
    mutationFn: async ({comment, post}) => {
      await createComment({comment, post});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleComment = (event) => {
    event.preventDefault();
    const post = postId
    mutate({comment, post})
    setComment("");
  };
  return (
    <div className="bg-white px-6 py-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <ul role="list" className="space-y-6">
          {comments?.map((item) => (
            <li key={item._id} className="relative flex gap-x-4">
              <div className="h-6 absolute left-0 top-0 flex w-6 justify-center"></div>
              <>
                <img
                  src="https://cdn.pixabay.com/photo/2013/07/12/14/36/man-148582_640.png"
                  alt="person"
                  className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                />
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">Person</span>{" "}
                      commented
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-gray-500">
                    {item.comment}
                  </p>
                </div>
              </>
            </li>
          ))}
        </ul>

        {/* New comment form */}
        <div className="mt-6 flex gap-x-3">
          <form onSubmit={handleComment} className="relative flex-auto">
            <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                rows={2}
                name="comment"
                id="comment"
                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Add your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <div className="flex items-center space-x-5"></div>
              <button
                type="submit"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
