interface LoginMutationResult {
  login: string; // JWT token returned by your backend
}

interface LoginMutationVars {
  input: {
    username: string;
    password: string;
  };
}

// Response from register mutation
interface RegisterMutationResult {
  register: {
    id: string;
    username: string;
  };
}

// Variables for register mutation
interface RegisterMutationVars {
  input: {
    username: string;
    password: string;
  };
}

// Response from "me" query
interface MeQueryResult {
  me: {
    id: string;
    username: string;
  } | null;
}

// Response from logout mutation
interface LogoutMutationResult {
  logout: boolean;
}


