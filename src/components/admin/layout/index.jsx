import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut } from "next-auth/react";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterhref="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leavehref="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterhref="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leavehref="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterhref="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leavehref="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul className="-mx-2 space-y-1">
                            <li key="Dashboard">
                              <Link
                                href={"/admin/dashboard"}
                                className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-800 hover:text-white"
                              >
                                <HomeIcon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                Dashboard
                              </Link>
                            </li>
                            <li key="Category">
                              <Link
                                href={"/admin/categories"}
                                className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-800 hover:text-white"
                              >
                                <FolderIcon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                Categories
                              </Link>
                            </li>
                            <li key="Post">
                              <Link
                                href={"/admin/posts"}
                                className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-800 hover:text-white"
                              >
                                <FolderIcon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                Posts
                              </Link>
                            </li>
                            <li key="Comment">
                              <Link
                                href={"/admin/comments"}
                                className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-800 hover:text-white"
                              >
                                <UsersIcon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                Comments
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="mt-auto" style={{ display: "none" }}>
                          <button
                            onClick={() => signOut()}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <ArrowRightCircleIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    <li key="Dashboard">
                      <Link
                        href={"/admin/dashboard"}
                        className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-800 hover:text-white"
                      >
                        <HomeIcon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        Dashboard
                      </Link>
                    </li>
                    <li key="Category">
                      <Link
                        href={"/admin/categories"}
                        className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-800 hover:text-white"
                      >
                        <FolderIcon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        Categories
                      </Link>
                    </li>
                    <li key="Post">
                      <Link
                        href={"/admin/posts"}
                        className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-800 hover:text-white"
                      >
                        <FolderIcon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        Posts
                      </Link>
                    </li>
                    <li key="Comment">
                      <Link
                        href={"/admin/comments"}
                        className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-gray-800 hover:text-white"
                      >
                        <UsersIcon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        Comments
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="mt-auto">
                  <button
                    onClick={() => signOut()}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <ArrowRightCircleIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <h1 style={{ fontSize: "20px" }}>ADMIN PANEL</h1>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Your content */}
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
