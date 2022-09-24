import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../redux/slice/authSlice";
import nookies from "nookies";
import { AUTH_URL } from "../redux/api/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { authToken } = nookies.get(null, "authToken");

    if (authToken?.length > 150) {
      dispatch(setAuthToken(authToken));
      navigate("/playlist");
    } else {
      const token = new URLSearchParams(window.location.hash).get(
        "#access_token"
      );
      if (token) {
        dispatch(setAuthToken(token));
        nookies.set(null, "authToken", token, {
          path: "/",
          maxAge: 60 * 10,
        });
      }
    }
  }, [dispatch, navigate]);

  const handleConnect = () => {
    const scope = [
      "streaming",
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-library-modify",
      "user-read-playback-state",
      "user-modify-playback-state",
    ];

    const clientId = "c705ea256eff48a6a29a2d65b4117025";
    const redirectUrl = "http://localhost:3000/";

    window.location.href = `${AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&show_dialog=true&scope=${scope.join(
      "%20"
    )}`;
  };
  return (
    <div className="h-screen flex justify-center items-center bg-green-500 px-4">
      <div className="flex flex-col gap-8 justify-center items-center">
        <img
          alt="track"
          className="max-h-[20vh]"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        />
        <button
          onClick={handleConnect}
          className="bg-black text-xl text-green-500 py-3 px-20 rounded-full font-semibold shadow-xl hover:bg-white transition-all duration-200"
        >
          Connect Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
