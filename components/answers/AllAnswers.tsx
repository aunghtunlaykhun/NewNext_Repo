import React from "react";

import { EMPTY_ANSWERS } from "@/constants/state";

import AnswerCard from "../cards/AnswerCard";
import DataRenderer from "../DataRenderer";
import CommonFilter from "../filters/CommonFilter";
import { AnswerFilters } from "@/constants/filters";
import Pagination from "../Pagination";

interface Props extends ActionResponse<Answer[]> {
  isNext: boolean;
  page: number;
  totalAnswers: number;
}

const AllAnswers = ({
  data,
  success,
  error,
  totalAnswers,
  page,
  isNext,
}: Props) => {
  return (
    <div className="mt-11 ">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answer"}
        </h3>
        <CommonFilter
          filters={AnswerFilters}
          otherClasses="sm:min-w-32 "
          containerClasses="max-xs:w-full"
        />
      </div>

      <DataRenderer
        data={data}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)
        }
      />
      <Pagination isNext={isNext || false} page={page} />
    </div>
  );
};

export default AllAnswers;
