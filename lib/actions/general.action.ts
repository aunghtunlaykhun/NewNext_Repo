"use server";

import { GlobalSearchParams } from "@/types/action";
import action from "../handlers/action";
import { GlobalSearchSchema } from "../validation";
import handleError from "../handlers/error";
import { Answer, Question, TagQuestion, User, Tag } from "@/database";
import { Types } from "mongoose";

export async function globalSearch(params: GlobalSearchParams) {
  try {
    console.log(params);
    const validationResult = await action({
      params,
      schema: GlobalSearchSchema,
    });

    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndType = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "question" },
      { model: Tag, searchField: "name", type: "tag" },
    ];
    const typeLower = type?.toLowerCase();
    const SearchableTypes = ["question", "user", "answer", "tag"];

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelsAndType) {
        const queryResult = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResult.map((item) => ({
            title:
              type === "answer"
                ? `Answer containing ${query}`
                : item[searchField],
            type,
            id: type === "answer" ? item.question : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndType.find((item) => item.type === type);
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }
      const queryResult = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);
      results = queryResult.map((item) => ({
        title:
          type === "answer"
            ? `Answer containing ${query}`
            : item[modelInfo.searchField],
        type,
        id: type === "answer" ? item.question : item._id,
      }));
    }
    return {
      success: true,
      data: JSON.parse(JSON.stringify(results)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
