"use client";

import React from "react";
import { Layout } from "@/components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, deleteComment } from "@/hooks/useComment";

export default function Posts() {
  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deleteComment(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  return (
    <>
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Comments
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the comments.
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Post Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Comment
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {comments?.docs.map((item, index) => (
                        <tr key={item._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.post.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.comment}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => {
                                mutate(item._id);
                              }}
                              className="text-red-600 hover:text-red-900 px-3"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                      {comments?.totalDocs == 0 ? (
                        <tr>
                          <td colSpan={4} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <center>No Comment</center>
                          </td>
                        </tr>
                      ):null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
