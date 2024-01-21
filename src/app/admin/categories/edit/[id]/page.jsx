"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "@/components";
import { useRouter } from "next/navigation";
import { getCategoryById, updateCategory } from "@/hooks/useCategory";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function EditCategory({ params }) {
  const id = params.id;
  const router = useRouter();
  const [name, setName] = useState("");
  const { data } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => await getCategoryById(id),
  });

  useEffect(() => {
    if (data) {
      setName(data?.name);
    }
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCategory({ id, name });
    router.push("/admin/categories");
  };
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Edit Category
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please fill in all the forms below to add data.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <Link
              href={"/admin/categories"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}
