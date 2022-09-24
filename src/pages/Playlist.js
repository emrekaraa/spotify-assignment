import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TrackItem from "../components/TrackItem";
import { getPlaylistCall } from "../redux/api/playlistApiCall";
import { GiPauseButton } from "react-icons/gi";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { FiLogOut, FiPlay } from "react-icons/fi";
import {
  deleteTrack,
  setIsLiked,
  setIsNowPlaying,
  setNowPlaying,
} from "../redux/slice/playlistSlice";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import SpotifyPlayer from "react-spotify-web-playback";
import nookies from "nookies";
import { setModalOpen } from "../redux/slice/modalSlice";
import Modal from "../components/Modal";
import SortableTracks from "../components/SortableTracks";

const Playlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authToken } = useSelector((state) => state.auth);
  const { albumName, tracks, nowPlaying } = useSelector(
    (state) => state.playlist
  );
  const { isOpen, deletedTrack } = useSelector((state) => state.modal);

  const [play, setPlay] = useState(true);

  useEffect(() => {
    if (authToken?.length < 150) {
      navigate("/");
    } else {
      dispatch(getPlaylistCall());
    }
  }, [navigate, dispatch, authToken]);

  return (
    <>
      <div className=" h-screen flex flex-col justify-center items-center px-4">
        {albumName && (
          <div className="relative lg:min-w-[480px] bg-[#0f0f0f] rounded min-h-[500px] max-h-[80vh] overflow-auto scrollHidden">
            <div className="bg-[#27282a] min-h-[40px] font-semibold rounded flex items-center justify-center">
              <h1 className="text-[#dadbdd]">{albumName}</h1>
            </div>

            <SortableTracks />

            {nowPlaying.id && (
              <div className="sticky px-3 bottom-0 ">
                <div className="hidden">
                  <SpotifyPlayer
                    token={authToken}
                    uris={[`spotify:track:${nowPlaying.id}`]}
                    autoPlay={false}
                    showSaveIcon={true}
                    play={play}
                  />
                </div>

                <div className="bg-[#3d3a39] py-3 rounded-t">
                  <div className="flex items-center gap-3 justify-between px-2">
                    <div className="flex items-center gap-3">
                      <img
                        alt="track"
                        className="w-[38px] h-[38px]"
                        src={nowPlaying.image}
                      />

                      <div className="flex flex-col justify-center">
                        <h3 className="text-sm text-[#c2c2c2]">
                          {nowPlaying.name}
                        </h3>
                        <p className="text-xs text-[#8d8d8d]">
                          {nowPlaying.artist}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end items-center gap-3">
                      <div>
                        {play ? (
                          <GiPauseButton
                            onClick={() => setPlay(false)}
                            className="text-[#dbdbd9] text-2xl"
                          />
                        ) : (
                          <FiPlay
                            onClick={() => setPlay(true)}
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
          </div>
        )}
        {!albumName && tracks.length === 0 && (
          <p className="text-center text-white text-xl">
            Please contact emrekara.dev@gmail.com <br /> to verify your e-mail
            address.
          </p>
        )}

        <button
          onClick={() => {
            nookies.destroy(null, "authToken");
            navigate("/");
          }}
          className="bg-green-500 hover:bg-green-600 text-white mt-4 py-2 px-10 rounded-full flex items-center gap-1"
        >
          <FiLogOut /> Log Out
        </button>
      </div>

      <Modal
        fade={isOpen}
        text={`${deletedTrack.name} will be deleted. <br/> Are you sure?`}
        onClose={() => {
          dispatch(setModalOpen(false));
        }}
        onCancel={() => {
          dispatch(setModalOpen(false));
        }}
        onApply={() => {
          dispatch(deleteTrack(deletedTrack.id));
          dispatch(setModalOpen(false));
        }}
      />
    </>
  );
};

export default Playlist;
