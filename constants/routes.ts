const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    COMUNITY: "/community",
    COLLECTION: "/collection",
    JOBS: "/find-jobs",
    TAGS: (id:string) => `/tags/${id}`,
    PROFILE: (id:string) => `/profile/${id}`,
    ASK_QUESTION: "/ask-question",
    QUESTION:(id:string) => `/questions/${id}`
  };
  
  export default ROUTES;