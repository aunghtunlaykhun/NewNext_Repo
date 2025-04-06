import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
  title: "No Data Found",
  message:
    "Looks like the database is taking a nap. Wake it up with some new entries.",
  button: {
    text: "Add Data",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Oops! Something went wrong",
  message: "Even our code can have a bad day. Give it another shot",
  button: {
    text: "Try again",
    href: ROUTES.HOME,
  },
};

export const EMPTY_QUESTON = {
  title: "Ahh, No question yet",
  message:
    "The question board is empty . Maybe it's waiting for you to ask something",
  button: {
    text: "Ask a question",
    href: ROUTES.ASK_QUESTION,
  },
};

export const EMPTY_COLLECTION = {
  title: "Collections are empty",
  message:
    "Looks like you haven't created any collection yet. Start creating something extaordinary today",
  button: {
    text: "Save to collection",
    href: ROUTES.COLLECTION,
  },
};

export const EMPTY_TAGS = {
  title: "No Tags Found",
  message: "The tag cloud is empty. Add some keywords to make it rain.",
  button: {
    text: "Create Tag",
    href: ROUTES.TAGS,
  },
};

export const EMPTY_ANSWERS = {
  title: "No Answers Found",
  message: "The answer is empty. Make it rain with your brilliant answer",
  // button: {
  //   text: "Answer",
  //   href: ROUTES.HOME,
  // },
};

export const EMPTY_USERS = {
  title: "No Users Found",
  message: "Your're alone.The only one here. More users are coming soon!",
};
