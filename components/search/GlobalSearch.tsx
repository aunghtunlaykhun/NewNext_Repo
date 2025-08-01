"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import GlobalResult from "../GlobalResult";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

const GlobalSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchContainerRef = useRef(null);
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const query = searchParams.get("global");
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        // @ts-expect-error Property 'contains' does not exist on type 'EventTarget | null'.
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchValue("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchValue) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: searchValue,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keyToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [searchValue, pathname, router, searchParams, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient flex min-h-[56px] grow items-center gap-2 rounded-xl px-4">
        <Image
          src="/icons/search.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
          placeholder="Search anything globally..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {searchValue && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
