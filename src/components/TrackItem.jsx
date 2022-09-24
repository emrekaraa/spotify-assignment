import React from "react";
import { useDispatch } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getTrackCall } from "../redux/api/playlistApiCall";
import { setDeletedTrack, setModalOpen } from "../redux/slice/modalSlice";
const TrackItem = ({ track }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center cursor-pointer relative">
      <div
        onClick={() => dispatch(getTrackCall(track.id))}
        className="flex gap-3 flex-1 dragDropFixed"
      >
        <img alt="track" className="w-[48px] h-[48px]" src={track.image} />

        <div className="flex flex-col justify-center">
          <h3
            className={`${
              track.isNowPlaying ? "text-green-500" : "text-[#c2c2c2]"
            } text-sm `}
          >
            {track.name}
          </h3>
          <p className="text-xs text-[#8d8d8d]">
            <span className="bg-[#8d8d8d] text-[#0f0f0f] font-semibold text-[10px] rounded-[3px] px-[2px]">
              LYRICS
            </span>{" "}
            <span
              className={`${
                track?.explicit ? "inline" : "hidden"
              } bg-[#8d8d8d] text-[#0f0f0f] text-[10px] font-semibold rounded-[3px] px-[3px] `}
            >
              E
            </span>{" "}
            {track.artist}
          </p>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch(setDeletedTrack({ id: track.id, name: track.name }));
          dispatch(setModalOpen(true));
        }}
        className="cursor-pointer"
      >
        <BsThreeDotsVertical className="text-[#8d8d8d]" />
      </div>
    </div>
  );
};

export default TrackItem;
