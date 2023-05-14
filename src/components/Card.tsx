import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
export default function Card({
  title,
  description,
  image,
  showModal,
  setBook,
}) {
  const boxRef = useRef(null);
  const handleMouseEnter = () => {
    gsap.to(boxRef.current, { scale: 1.05, duration: 0.3 });
  };
  const handleMouseLeave = () => {
    gsap.to(boxRef.current, {
      scale: 1, // revert back to original size
      duration: 0.3,
    });
  };
  const onClick = () => {
    setBook({
      title: title,
      description: description,
    });
    showModal();
  };




  return (
    <div
      id="box"
      ref={boxRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="books w-56 max-w-sm mx-auto bg-[#EEDA9C] items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <div className="h-64 px-1 py-1 overflow-hidden">
          <img className="rounded-t-lg " src={image} alt="" />
        </div>
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-sm sm:text-md md:text-md font-bold tracking-tight  overflow-hidden text-ellipsis whitespace-nowrap text-gray-900 dark:text-white">
{title}

          </h5>
        </a>
        <p className="mb-3 font-normal text-sm text-gray-600 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </p>
      </div>
    </div>
  );
}
