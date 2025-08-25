// Response from login mutation
interface LoginMutationResult {
  login: string; 
}

// Variables for login mutation
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

// Response from logout mutation
interface LogoutMutationResult {
  logout: boolean;
}


// Response from "me" query
interface MeQueryResult {
  me: {
    id: string;
    username: string;
  } | null;
}