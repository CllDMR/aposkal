"use client";

import type { FC } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const trPathName: Record<string, string> = {
  home: "Ana Sayfa",
  settings: "Ayarlar",
  users: "Kullanıcılar",
  new: "Yeni",
  income: "Satış",
};

const createBreadCrumb = (paths: string, root: string) => {
  if (!paths) return;
  const pathArr = paths.split("/").filter((path) => path !== "");
  // remove first 2 element
  pathArr.shift();
  pathArr.shift();
  const obj = pathArr.map((path, index) => {
    const href = `${root}/${pathArr.slice(0, index + 1).join("/")}`;
    const pathName = trPathName[path];
    if (pathName)
      return {
        name: pathName,
        href: href,
        current: href === paths,
      };
    else return "";
  });
  const filtered = obj
    .flatMap((val) => (typeof val === "string" ? [] : val))
    .filter((item) => item);
  return filtered;
};

export const BreadCrumb: FC = () => {
  const paths = usePathname();
  const params = useParams();
  let root = "";
  if (typeof params.companyId === "string") root = `/app/${params.companyId}`;
  else if (
    Array.isArray(params.companyId) &&
    typeof params.companyId[0] === "string"
  )
    root = `/app/${params.companyId[0]}`;
  const pages = createBreadCrumb(paths, root) ?? [];

  return (
    <nav className="ml-8 flex lg:ml-0" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link href={root} className="text-gray-400 hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>

              {page.current ? (
                <span
                  //   href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </span>
              ) : (
                <Link
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
