import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagCard from "../cards/TagCard";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/actions/tag.actions";

const RightSidebar = async () => {
  const [
    { success, data: hotQuestions, error },
    { success: tagSuccess, data: tags, error: tagError },
  ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex flex-col h-screen w-[350px] gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900 ">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          <DataRenderer
            empty={{
              title: "No Questions Found",
              message: "No Questions have been asked yet..",
            }}
            data={hotQuestions}
            success={success}
            error={error}
            render={(hotQuestions) => (
              <div className="mt-7 w-full flex flex-col gap-[30px] ">
                {hotQuestions.map(({ _id, title }) => (
                  <Link
                    key={_id}
                    href={ROUTES.QUESTION(_id)}
                    className="flex cursor-pointer items-center justify-between gap-7"
                  >
                    <p className="body-medium text-dark500_light700 line-clamp-2">
                      {title}
                    </p>
                    <Image
                      src="/icons/chevron-right.svg"
                      alt="Chevron"
                      className="invert-colors"
                      width={20}
                      height={20}
                    />
                  </Link>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular tags</h3>
        <DataRenderer
          empty={{
            title: "No Tags Found",
            message: "No Tags have been created yet..",
          }}
          data={tags}
          success={tagSuccess}
          error={tagError}
          render={(tags) => (
            <div className="flex flex-col gap-4">
              {tags.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions}
                  showCount
                  compact
                />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
