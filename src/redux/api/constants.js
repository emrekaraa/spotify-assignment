export const ROOT_URL = "https://api.spotify.com/v1";
export const AUTH_URL = "https://accounts.spotify.com/authorize";

export const HEADERS_WITH_TOKEN = (authToken) => {
  return {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };
};

export const HEADERS_UNAUTHORIZED = () => {
  return {
    "Content-Type": "application/json",
  };
};
