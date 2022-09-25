import { createSlice } from "@reduxjs/toolkit";
import { getPlaylistCall, getTrackCall } from "../api/playlistApiCall";

const initialState = {
  albumName: "",
  tracks: [],
  nowPlaying: {},
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setIsLiked: (state, action) => {
      const { id } = state.nowPlaying;
      let likedTracks = JSON.parse(localStorage.getItem("likedTracks")) || [];

      state.tracks.forEach((track) => {
        if (track.id === id) {
          track.isLiked = !track.isLiked;
          state.nowPlaying.isLiked = !state.nowPlaying.isLiked;
        }
      });
      likedTracks = state.tracks
        .filter((track) => track.isLiked)
        .map((track) => track.id);
      localStorage.setItem("likedTracks", JSON.stringify(likedTracks));
    },
    deleteTrack: (state, action) => {
      const id = action.payload;
      state.tracks = state.tracks.filter((track) => track.id !== id);
      state.nowPlaying?.id === id && (state.nowPlaying = {});
    },
    setIsNowPlaying: (state, action) => {
      const id = action.payload;
      state.tracks.forEach((track) => {
        if (track.id === id) {
          track.isNowPlaying = true;
        } else {
          track.isNowPlaying = false;
        }
      });
    },

    setNowPlaying: (state, action) => {
      const id = action.payload;
      state.nowPlaying = state.tracks.find((track) => track.id === id);
    },

    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlaylistCall.fulfilled, (state, action) => {
      state.albumName = action.payload.name;
      state.tracks = action.payload.tracks.items.map((item) => {
        return {
          name: item.track.name,
          id: item.track.id,
          explicit: item.track.explicit,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          image: item.track.album.images[0].url,
          isNowPlaying: false,
          isLiked: localStorage.getItem("likedTracks")
            ? JSON.parse(localStorage.getItem("likedTracks")).includes(
                item.track.id
              )
            : false,
        };
      });
    });

    builder.addCase(getTrackCall.fulfilled, (state, action) => {
      state.nowPlaying = {
        name: action.payload.name,
        id: action.payload.id,
        explicit: action.payload.explicit,
        artist: action.payload.artists[0].name,
        album: action.payload.album.name,
        image: action.payload.album.images[0].url,
        isLiked: localStorage.getItem("likedTracks")
          ? JSON.parse(localStorage.getItem("likedTracks")).includes(
              action.payload.id
            )
          : false,
      };
    });
  },
});

export const {
  setIsLiked,
  setIsNowPlaying,
  deleteTrack,
  setNowPlaying,
  setTracks,
} = playlistSlice.actions;

export default playlistSlice.reducer;
