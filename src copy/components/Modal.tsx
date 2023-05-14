import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { gsap } from "gsap";

const Modal = (props) => {
  const tl = useRef(gsap.timeline({ paused: true }));
  let modalVeil = null;
  let modalWrapper = null;
  let modalContent = null;
  const [des, setDes] = useState<string[]>([]);
function splitIntoParagraps(text: string, maxChars: number): string[] {
  const paragraphs: string[] = [];

  text.split('.').forEach((sentence) => {
    let paragraph = paragraphs.pop() || '';

    if ((paragraph + sentence).length > maxChars) {
      paragraphs.push(paragraph.trim());
      paragraph = '';
    }

    paragraph += sentence.trim() + '. ';
    paragraphs.push(paragraph.trim() + '\n\n');
  });

  return paragraphs;
}






 useEffect(() => {
    gsap.set(modalContent, { yPercent: -80, xPercent: -50 });
    tl.current
      .to(modalVeil, 0.1, { autoAlpha: 0.85 })
      .to(modalWrapper, 0.05, { autoAlpha: 1 }, 0)
      .to(
        modalContent,
        0.25,
        {
          yPercent: -50,
          autoAlpha: 1,
        },
        0
      )
      .reverse();
  }, []);

useEffect(() => {
  let text = props.book.description as string;
  setDes(splitIntoParagraps(text,200));
}, [props.book.description]);


 useEffect(() => {
    tl.current.reversed(!props.show);
    if (props.show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [props.show]);

  return ReactDOM.createPortal(
    <div className="my-modal-wrapper " ref={(e) => (modalWrapper = e)}>
      <div
        className="my-modal-content bg-[#30A277]"
        ref={(e) => (modalContent = e)}
      >
        <h5 className="text-center font-extrabold tracking-tight text-white text-1xl mt-3 mb-5">
          {props.book.title}
       </h5>
        <div className=" ">
          <p className="h-72  overflow-scroll text-gray-300">
     
    {des && des.map((p, index) => (
     <div key={index} style={{ marginBottom: "1em", borderBottom: "1px solid white", paddingBottom: "10px" }}>{p}</div>    
    ))}
          </p>

        </div>
        <button
          className=" absolute top-3 right-4  btn btn-secondary"
          onClick={props.close}
        >
          <svg
            className="h-5 w-5 "
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />{" "}
            <line x1="15" y1="9" x2="9" y2="15" />{" "}
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
      </div>
      <div
        className="my-modal-veil"
        ref={(e) => (modalVeil = e)}
        onClick={props.close}
      />
    </div>,
    document.body
  );
};

export default Modal;
