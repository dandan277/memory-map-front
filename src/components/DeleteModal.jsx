import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function DeleteModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white bg-opacity-70 rounded-2xl p-8 shadow-lg text-center min-w-[300px]">
        <FaArrowLeft size={16} className="mt-1 text-black" onClick={onCancel} />
        <div className="mb-6 mt-2 text-2xl text-black font-bold">
          정말 <span className="text-red-600">삭제</span> 하시겠습니까?
        </div>
        <button
          className="w-full py-3 bg-gray-200 rounded-xl border-4 border-white bg-opacity-80 text-black text-2xl font-bold shadow-sm hover:bg-gray-100 transition"
          onClick={onConfirm}
        >
          네
        </button>
      </div>
    </div>
  );
}
