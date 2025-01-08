const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  about: "/about",
  dashboard: "/auth/dashboard",
  promotion: "/auth/promotion",
  privacy: "/auth/privacypolicy",
  terms: "/termsandconditions",
  goals: "/auth/goals",

  // Use for later for specific pages for users
  // userProfile: (id) => `/user/${id}`, // Dynamic route example
  // userDashboard: (id) => `/user/${id}/dashboard`,
  // userTransactions: (id) => `/user/${id}/transactions`,
};

export default routes;
