import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTON } from "@/constants/state";
import { getSavedQuestions } from "@/lib/actions/collection.action";
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Collection({ searchParams }: SearchParams) {
  // const session = await auth();
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { collection } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          imgSrc={"/icons/search.svg"}
          route={ROUTES.COLLECTION}
          placeholder="search questions..."
          otherClasses="flex-1"
        />
      </div>
      <DataRenderer
        success={success}
        error={error}
        data={collection}
        empty={EMPTY_QUESTON}
        render={(collection) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {collection.map((item) => (
              <QuestionCard key={item._id} question={item.question} />
            ))}
          </div>
        )}
      />
      {/* {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch questions"}
          </p>
        </div>
      )} */}
    </>
  );
}
