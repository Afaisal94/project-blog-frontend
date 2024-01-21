"use client";

import React from "react";
import { Layout } from "@/components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, deletePost } from "@/hooks/usePost";
import Link from "next/link";

export default function Posts() {
  const queryClient = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deletePost(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return (
    <>
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Posts
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the posts.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                href={"/admin/posts/add"}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add post
              </Link>
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
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Post Title
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {posts?.docs.map((item, index) => (
                        <tr key={item._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.category.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.title}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link
                              target="_blank"
                              href={`/post/${item.slug}`}
                              className="text-blue-600 hover:text-blue-900 px-3"
                            >
                              Preview
                            </Link>
                            <Link
                              href={`/admin/posts/edit/${item._id}`}
                              className="text-green-600 hover:text-green-900 px-3"
                            >
                              Edit
                            </Link>
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

                      {posts?.totalDocs == 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            <center>No Post</center>
                          </td>
                        </tr>
                      ) : null}
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
