"use client";

import React, { useEffect, useState } from "react";
import { Navbar, Footer, LoadingArticle, Article, Comment } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/hooks/usePost";

export default function Post({ params }) {
  const slug = params.slug;
  const [postId, setPostId] = useState("");
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => await getPostBySlug(slug),
  });

  useEffect(() => {
    if (post) {
      setPostId(post._id);
    }
  });
  return (
    <div>
      <Navbar />

      {isError ? error.message : null}

      {isLoading ? <LoadingArticle /> : <Article post={post} />}

      <Comment postId={postId} />

      <Footer />
    </div>
  );
}
