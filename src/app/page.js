"use client";

import React from "react";
import { Navbar, Content, Footer, LoadingContent } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/hooks/usePost";

export default function Home() {
  const title = "The Blog";
  const subtitle = "Blog created using next js.";
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
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
