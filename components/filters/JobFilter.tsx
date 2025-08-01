"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import LocalSearch from "../search/LocalSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/url";

interface JobFilterProps {
  countriesList: Country[];
}

const JobFilter = ({ countriesList }: JobFilterProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleUpdateParams = (value: string) => {
    console.log(value);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "location",
      value,
    });
    router.push(newUrl);
  };
  return (
    <div className="relative mt-11 flex w-full justify-between gap-5 max-sm:flexx-col sm:items-center">
      <LocalSearch
        imgSrc="/icons/job-search.svg"
        placeholder="Job Title,Company or Keywords"
        route={pathname}
        iconPosition="left"
        otherClasses="flex-1 max-sm:w-full"
      />
      <Select onValueChange={(value) => handleUpdateParams(value)}>
        <SelectTrigger className="body-regular light-border background-light800_dark300 text-dark500_light700 line-clamp-1 flex min-h-[56px] items-center gap-3 border p-4 sm:max-w-[210px]">
          <Image
            src="/icons/location.svg"
            alt="location"
            width={18}
            height={18}
          />
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select location" />
          </div>
        </SelectTrigger>
        <SelectContent className="body-semibold max-h-[350px] max-w-[250px]">
          <SelectGroup>
            {countriesList ? (
              countriesList
                .sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((country: Country) => (
                  <SelectItem
                    key={country.name.common}
                    value={country.name.common}
                    className="px-4 py-3"
                  >
                    <p className="flex gap-2">
                      {country.flag}
                      <span>{country.name.common}</span>
                    </p>
                  </SelectItem>
                ))
            ) : (
              <SelectItem value="No Result Found">No Result Found</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobFilter;
