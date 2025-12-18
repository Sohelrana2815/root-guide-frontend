import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    headers: {
      ...headers,
      // ...(accessToken ? {"Authorization" :  `Bearer ${accessToken}`}: {}),
      // ...(accessToken ? {"Authorization" : accessToken : {}),
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
    ...restOptions,
  });
  return response;
};

// API method

export const serverFetch = {
  get: async (endPoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "GET" }),

  post: async (endPoint: string, options: RequestInit = {}):Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "POST" }),

 put: async (endPoint: string, options: RequestInit = {}):Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "PUT" }),
 
 patch: async (endPoint: string, options: RequestInit = {}):Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "PATCH" }),
 
 delete: async (endPoint: string, options: RequestInit = {}):Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "DELETE" }),

};
