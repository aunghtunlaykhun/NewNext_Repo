import JobCard from "@/components/cards/JobCard";
import CommonFilter from "@/components/filters/CommonFilter";
import JobFilter from "@/components/filters/JobFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
} from "@/lib/actions/job.action";
import React from "react";

const Jobs = async ({ searchParams }: RouteParams) => {
  const { query, location, page } = await searchParams;
  const countries = await fetchCountries();
  const userLocation = await fetchLocation();

  const {
    success,
    data: jobs,
    error: fetchJobError,
  } = await fetchJobs({
    query: query ? query : "Developer",
    location: location ? location : "United States",
    page: "2",
  });
  console.log("job data after normalize", jobs);
  const parsedPage = parseInt(page ?? 1);

  if (!success) {
    return (
      <div className="bg-gray-900 p-10 rounded-md text-dark100_dark700">
        {fetchJobError?.message}
        <span>. Please try again later..</span>
      </div>
    );
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        <JobFilter countriesList={countries || {}} />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs.length > 0 ? (
          jobs
            .filter((job: Job) => job.job_title)
            .map((job: Job) => <JobCard key={job.job_id} job={job} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>
      {jobs?.length > 0 && (
        <Pagination page={parsedPage} isNext={jobs?.length === 10} />
      )}
    </>
  );
};

export default Jobs;
