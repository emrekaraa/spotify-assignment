import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiPauseButton } from "react-icons/gi";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import {
  setIsLiked,
  setIsNowPlaying,
  setNowPlaying,
} from "../redux/slice/playlistSlice";
import { FiPlay } from "react-icons/fi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { playTrackApiCall } from "../redux/api/playlistApiCall";
import nookies from "nookies";
import { useNavigate } from "react-router-dom";

const SpotifyPlayerSDK = ({ onLogOut }) => {
  const { tracks, nowPlaying } = useSelector((state) => state.playlist);
  const { authToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);
  const [isPause, setPaused] = useState(false);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(authToken);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
      });

      setPlayer(player);

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setPaused(state.paused);
      });

      player.connect();
    };
  }, [authToken, dispatch, navigate]);

  useEffect(() => {
    if (nowPlaying.id && deviceId) {
      dispatch(
        playTrackApiCall({
          spotifyUri: `spotify:track:${nowPlaying.id}`,
          deviceId,
        })
      );
    } else {
      player?.pause();
    }
  }, [nowPlaying.id, deviceId, dispatch, player]);

  useEffect(() => {
    if (onLogOut) {
      player?.pause();
      nookies.destroy(null, "authToken");
      navigate("/");
    }
  }, [onLogOut, navigate, player]);

  return (
    <>
      {nowPlaying.id && (
        <div className="sticky px-3 bottom-0 ">
          <div className="bg-[#3d3a39] py-3 rounded-t">
            <div className="flex items-center gap-3 justify-between px-2">
              <div className="flex items-center gap-3">
                <img
                  alt="track"
                  className="w-[38px] h-[38px]"
                  src={nowPlaying.image}
                />

                <div className="flex flex-col justify-center">
                  <h3 className="text-sm text-[#c2c2c2]">{nowPlaying.name}</h3>
                  <p className="text-xs text-[#8d8d8d]">{nowPlaying.artist}</p>
                </div>
              </div>

              <div className="flex justify-end items-center gap-3">
                <div>
                  {isPause ? (
                    <FiPlay
                      onClick={() => player.togglePlay()}
                      // onClick={() => setPlay(true)}
                      className="text-[#dbdbd9] text-2xl"
                    />
                  ) : (
                    <GiPauseButton
                      // onClick={() => setPlay(false)}
                      onClick={() => player.togglePlay()}
                      className="text-[#dbdbd9] text-2xl"
                    />
                  )}
                </div>

                <AiFillCaretLeft
                  onClick={() => {
                    tracks.forEach((track, index) => {
                      if (track.id === nowPlaying.id) {
                        dispatch(setNowPlaying(tracks[index - 1].id));
                        dispatch(setIsNowPlaying(tracks[index - 1].id));
                      }
                    });
                  }}
                  className="text-[#dbdbd9] text-3xl"
                />
                {nowPlaying.isLiked ? (
                  <IoMdHeart
                    onClick={() => dispatch(setIsLiked())}
                    className="text-green-500 text-3xl"
                  />
                ) : (
                  <IoMdHeartEmpty
                    onClick={() => dispatch(setIsLiked())}
                    className="text-[#dbdbd9] text-3xl"
                  />
                )}

                <AiFillCaretRight
                  onClick={() => {
                    tracks.forEach((track, index) => {
                      if (track.id === nowPlaying.id) {
                        dispatch(setNowPlaying(tracks[index + 1].id));
                        dispatch(setIsNowPlaying(tracks[index + 1].id));
                      }
                    });
                  }}
                  className="text-[#dbdbd9] text-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotifyPlayerSDK;
