import React from "react";
import { IoMdClose } from "react-icons/io";

export default function Modal({ fade, text, onClose, onCancel, onApply }) {
  return (
    <div
      className={`bg-[rgba(45,45,45,0.7)] z-[99999] flex items-center bg-opacity-40 bg-gray-800 justify-center fixed top-0 left-0 w-screen h-screen transition-all duration-500 ${
        fade ? "block" : " hidden "
      }`}
    >
      <div className={"fixed top-0 left-0 w-screen h-screen"}></div>
      {fade ? (
        <div
          className={
            "z-50 max-w-md w-full rounded-3xl flex flex-col justify-center items-center mx-4"
          }
        >
          <div className={"relative flex justify-center items-center"}>
            <div className="bg-white px-10 pt-8 pb-6 rounded-md flex flex-col justify-center items-center gap-3">
              <span
                onClick={() => onClose()}
                className="cursor-pointer absolute top-2 right-3"
              >
                <IoMdClose />{" "}
              </span>
              <div>
                <h2
                  className="text-center"
                  dangerouslySetInnerHTML={{ __html: text }}
                ></h2>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => onCancel()}
                  className="bg-yellow-500 hover:bg-amber-500 py-2 px-4 rounded-md text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onApply()}
                  className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
