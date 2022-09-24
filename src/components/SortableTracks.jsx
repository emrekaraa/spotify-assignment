import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTracks } from "../redux/slice/playlistSlice";
import { arrayMoveImmutable } from "array-move";
import TrackItem from "./TrackItem";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableTracks = () => {
  const dispatch = useDispatch();
  const { tracks } = useSelector((state) => state.playlist);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newArray = arrayMoveImmutable(tracks, oldIndex, newIndex);
    dispatch(setTracks(newArray));
  };

  const SortableItem = SortableElement(({ track }) => {
    return <TrackItem track={track} />;
  });

  const SortableList = SortableContainer(({ tracks }) => {
    return (
      <div className={`flex flex-col gap-4 p-4 text-white relative`}>
        {tracks?.length
          ? tracks?.map((track, index) => (
              <>
                <div className="relative" key={`tracks-${index}`}>
                  <SortableItem index={index} track={track} />
                </div>
              </>
            ))
          : null}
      </div>
    );
  });

  return (
    <>
      <SortableList
        tracks={tracks}
        pressDelay={300}
        axis="xy"
        onSortEnd={onSortEnd}
      />
    </>
  );
};

export default SortableTracks;
