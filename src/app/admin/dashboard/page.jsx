"use client";

import { Layout } from "@/components";
import React from "react";
import { getCategories } from "@/hooks/useCategory";
import { getPosts } from "@/hooks/usePost";
import { getComments } from "@/hooks/useComment";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });
  return (
    <>
      <Layout>
        <div>
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:max-w-none">
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    The Blog
                  </h2>
                  {/* <p className="mt-4 text-lg leading-8 text-gray-600">
											Lorem ipsum dolor sit amet consect
											adipisicing possimus.
										</p> */}
                </div>
                <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-1 lg:grid-cols-3">
                  <div className="flex flex-col bg-gray-400/5 p-8">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">
                      Categories
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                      {categories?.totalDocs}
                    </dd>
                  </div>
                  <div className="flex flex-col bg-gray-400/5 p-8">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">
                      Posts
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                      {posts?.totalDocs}
                    </dd>
                  </div>
                  <div className="flex flex-col bg-gray-400/5 p-8">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">
                      Comments
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                      {comments?.totalDocs}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
