"use client";

import React from "react";
import { Navbar, Content, Footer, LoadingContent } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getPostByKeyword } from "@/hooks/usePost";

export default function Search({ params }) {
  const keyword = params.keyword;
  const title = "The Blog";
  const subtitle = `All posts with contains keyword : ${keyword}`;
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", keyword],
    queryFn: async() => await getPostByKeyword(keyword),
  });
  return (
    <div>
      <Navbar />

      {isError ? error.message : null}

      {isLoading ? (
        <LoadingContent title={title} subtitle={subtitle} />
      ) : (
        <Content title={title} subtitle={subtitle} posts={posts} />
      )}

      <Footer />
    </div>
  );
}
