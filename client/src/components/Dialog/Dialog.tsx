import React from "react";
import ReactDOM from "react-dom";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-y-auto">
      <div className="bg-black rounded-lg p-4 relative w-11/12 max-w-6xl h-5/6 mx-auto my-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold p-2 rounded-full hover:bg-indigo-600"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
