"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "@/components";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPostById, updatePost } from "@/hooks/usePost";
import { getCategories } from "@/hooks/useCategory";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";

export default function AddPost({ params }) {
  const id = params.id;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [preview, setPreview] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => await getPostById(id),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setDescription(post.description);
      setCategory(post.category?._id);
      setCategoryName(post.category?.name);
      setPreview(post.imageUrl);
    }
  }, [post]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleChange = (content, editor) => {
    setContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSave(true);
    await updatePost({ id, title, content, image, description, category });
    setLoadingSave(false);
    router.push("/admin/posts");
  };
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Edit Post
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please fill in all the forms below to add data.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Category Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <select
                        id="categoryId"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value={category}>{categoryName}</option>
                        <option>- SELECT -</option>
                        {categories?.docs.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <textarea
                        rows={5}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Content
                  </label>
                  <Editor
                    apiKey="iwmuala1e6yzv3l6kd4j7dukn0esq2uo27eyinmxxyqzcogb"
                    value={content}
                    init={{
                      menubar: false,
                    }}
                    onEditorChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Image
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="file"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        onChange={loadImage}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {preview ? (
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <Image
                      src={preview}
                      alt="preview-image"
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <Link
              href={"/admin/posts"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loadingSave ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}
