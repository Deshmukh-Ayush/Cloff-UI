import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex items-center justify-between border-t border-dashed border-neutral-300 px-10 py-10 dark:border-neutral-700">
      <div>
        <h2 className="text-3xl font-semibold text-blue-500">Cloff UI</h2>
        <p className="text-xs text-neutral-500">A product by Cloff Studio.</p>
        <p className="text-xs text-neutral-500">
          Be a part of the community at{" "}
          <span className="text-neutral-800">@CloffStudio</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8 text-xs text-neutral-500">
        <div className="flex flex-col gap-2">
          <p className="mb-4 text-neutral-800">Company</p>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Pricing
          </Link>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Components
          </Link>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Blogs
          </Link>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Changelogs
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="mb-4 text-neutral-800">Products</p>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Cloff Studio
          </Link>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Cloff UI Pro
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="mb-4 text-neutral-800">Socials</p>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            X
          </Link>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Discord
          </Link>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Linkedin
          </Link>
          <Link
            className="transition-all duration-200 ease-in-out hover:text-neutral-800"
            href="/"
          >
            Instagram
          </Link>
        </div>
      </div>
    </div>
  );
};
