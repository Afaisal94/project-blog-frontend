"use client";

import React from "react";
import { Navbar, Content, Footer, LoadingContent } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getPostByCategoryName } from "@/hooks/usePost";

export default function Category({ params }) {
  const category = params.category;
  const title = "The Blog";
  const subtitle = `All posts with category : ${category}`;
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", category],
    queryFn: async () => await getPostByCategoryName({ category }),
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
