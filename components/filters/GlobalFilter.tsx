import { GlobalSearchFilter } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";

const GlobalFilter = () => {
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");
  const router = useRouter();
  const handleFilter = (value: string) => {
    let newUrl = "";
    if (value === typeParams) {
      setActive("");
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: value.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type:</p>
      <div className="flex gap-3">
        {GlobalSearchFilter.map((filter) => (
          <Button
            key={filter.value}
            type="button"
            className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize ${
              active === filter.value
                ? "bg-primary-500 text-light-900"
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500 dark:text-light-800 dark:hover:text-primary-500"
            }`}
            onClick={() => handleFilter(filter.value)}
          >
            {filter.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilter;
