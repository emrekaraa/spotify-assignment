import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPlaylistCall } from "../redux/api/playlistApiCall";
import { FiLogOut } from "react-icons/fi";
import { deleteTrack } from "../redux/slice/playlistSlice";
import { setModalOpen } from "../redux/slice/modalSlice";
import Modal from "../components/Modal";
import SortableTracks from "../components/SortableTracks";
import SpotifyPlayerSDK from "../components/SpotifyPlayerSDK";

const Playlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authToken } = useSelector((state) => state.auth);
  const { albumName, tracks } = useSelector((state) => state.playlist);
  const { isOpen, deletedTrack } = useSelector((state) => state.modal);
  const [onLogOut, setOnLogOut] = useState(false);

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

            <SpotifyPlayerSDK onLogOut={onLogOut} />
          </div>
        )}

        {!albumName && tracks.length === 0 && (
          <div>
            <p className="text-center text-white text-xl">
              Please contact emrekara.dev@gmail.com <br /> to verify your e-mail
              address.
            </p>
          </div>
        )}

        <div>
          <button
            onClick={() => {
              setOnLogOut(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white mt-4 py-2 px-10 rounded-full flex items-center gap-1"
          >
            <FiLogOut /> Log Out
          </button>
        </div>
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
