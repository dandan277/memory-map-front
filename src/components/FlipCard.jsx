import { useState } from "react";
import { motion } from "framer-motion";
import backside from "../assets/images/backside.png";

export default function FlipCard({ children, description, onClose }) {
  const [isFlipped, setIsFlipped] = useState(true);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/10"
      onClick={onClose}
    >
      <div className="flex flex-col ">
        <div className="mb-10 text-white text-2xl font-bold drop-shadow-lg">
          내 추억의 사진
        </div>
        <motion.div
          className="relative w-[266px] h-[527px] cursor-grab"
          style={{ perspective: "1000px" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="absolute w-full h-full bg-blue-500 rounded-lg flex items-center justify-center bg-white"
            animate={{
              rotateY: isFlipped ? 0 : 180,
            }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {children}
          </motion.div>
          <motion.div
            className="absolute w-full h-full bg-[#949498] rounded-xl flex items-center justify-center"
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden", rotateY: 180 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <img
              src={backside}
              alt="카드 뒷면"
              className="w-full h-full object-cover absolute left-0 top-0 rounded-xl"
              style={{ zIndex: 0 }}
            />
            <span className="relative z-10 text-white text-xl font-bold drop-shadow-lg">
              {description}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
