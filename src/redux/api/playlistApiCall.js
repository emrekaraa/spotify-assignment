import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsNowPlaying } from "../slice/playlistSlice";
import {
  HEADERS_UNAUTHORIZED,
  HEADERS_WITH_TOKEN,
  ROOT_URL,
} from "./constants";

export const getPlaylistCall = createAsyncThunk(
  "fetchPlaylist",
  async (args, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${ROOT_URL}/playlists/37i9dQZF1DX1tyCD9QhIWF`,
        {
          headers: HEADERS_WITH_TOKEN(getState().auth.authToken),
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getTrackCall = createAsyncThunk(
  "fetchTrack",
  async (trackId, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${ROOT_URL}/tracks/${trackId}`, {
        headers: HEADERS_WITH_TOKEN(getState().auth.authToken),
      });

      dispatch(setIsNowPlaying(response.data.id));

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const playTrackApiCall = createAsyncThunk(
  "playTrack",
  async ({ spotifyUri, deviceId }, { dispatch, getState }) => {
    try {
      axios.put(
        `${ROOT_URL}/me/player/play?device_id=${deviceId}`,
        {
          uris: [spotifyUri],
        },
        {
          headers: HEADERS_WITH_TOKEN(getState().auth.authToken),
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
