"use server";

import { JobFilterParams } from "@/types/action";
import handleError from "../handlers/error";
import { normalize } from "path";
import { normalizeJobData } from "../utils";
import { API_NAME } from "@/constants";

const APIs = [
  {
    name: API_NAME.HIRING_MANAGER,
    url: (query: string, page: string, location: string) =>
      `https://hiring-manager-api.p.rapidapi.com/recruitment-manager-24h?advanced_title_filter=${query}&location_filter=${location}&page=${page}&limit=8`,
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
      "X-RapidAPI-Host": "hiring-manager-api.p.rapidapi.com",
    },
  },
  {
    name: API_NAME.INDEED_JOBS,
    url: (query: string, page: string, location: string) =>
      `https://indeed-jobs-api-sweden.p.rapidapi.com/indeed-se/?offset=0&keyword=${query}&location=${location}&page=${page}&limit=8`,
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
      "X-RapidAPI-Host": "indeed-jobs-api-sweden.p.rapidapi.com",
    },
  },
  {
    name: API_NAME.INTERNSHIPS,
    url: (query: string, page: string, location: string) =>
      `https://internships-api.p.rapidapi.com/active-jb-7d?title_filter=${query}&location_filter=${location}&page=${page}&limit=8`,
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
      "X-RapidAPI-Host": "internships-api.p.rapidapi.com",
    },
  },
  {
    name: API_NAME.UPWORK_JOBS,
    url: (query: string, page: string, location: string) =>
      `https://upwork-jobs-api2.p.rapidapi.com/active-freelance-1h?location_filter=${location}&&limit=8&page=${page}`,
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
      "X-RapidAPI-Host": "upwork-jobs-api2.p.rapidapi.com",
    },
  },
];

export async function fetchCountries() {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const countries = await data.json();
  return countries;
}
export async function fetchLocation() {
  const response = await fetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_oQLARKHzi407qZYZv6s0IzhPcF4tC&"
  );
  const data = await response.json();
  return data.location.country;
}

interface FetchJobProps {
  query: string;
  page: string;
  location: string;
}

export async function fetchJobs({
  query,
  page,
  location,
}: FetchJobProps): Promise<ActionResponse<Job[]>> {
  const errors: { api: string; error: Error }[] = [];
  for (const api of APIs) {
    try {
      const response = await fetch(api.url(query, page, location), {
        headers: api.headers,
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(`Error fetching from ${api.name}`);
        if (
          result.message &&
          result.message.includes("You have exceeded the MONTHLY quota")
        ) {
          throw new Error(
            `API quota exceeded for ${api.name}. Please upgrade your plan.`
          );
        }
        throw new Error(
          `${api.name} API request failed with status: ${response.status}`
        );
      }
      console.log(`Success fetching from ${api.name}`);
      console.log(result, "Reason for knowing fact");

      if (result.length === 0) {
        throw new Error(`There is no data from ${api.name}`);
      }

      const normalizedJobs = result.map((job: any) =>
        normalizeJobData(api.name, job)
      );

      return { success: true, data: normalizedJobs };
    } catch (error) {
      const formattedError =
        error instanceof Error ? error : new Error(String(error));
      errors.push({ api: api.name, error: formattedError });
    }
  }
  const formatError = errors.map((e) => e.error.message).join(", ");
  const finalError = new Error(formatError);
  return handleError(finalError) as ErrorResponse;
}
