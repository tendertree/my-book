import { useQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import splitType from "split-type";

interface WordData {
  respond: string[];
}

function WordAnimation({ data }: { data: WordData }): JSX.Element {
  const ourText = new splitType("p.our-text", { types: "chars" });
  const chars = ourText.chars;

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (data && data[1].respond.length >= 3) {
        gsap.fromTo(
          chars,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 2,
            ease: "power4.out",
          }
        );
      }
    });
    return () => ctx.revert();
  }, [data, chars]);

  return (
    <div>
      <p className="our-text">{data[1].respond}</p>
    </div>
  );
}

export default function Getwords(): JSX.Element {
  const [currentword, setCurrentword] = useState("");
  const getGoodword = async () => {
    const response = await fetch("/api/request/helpful_text?apikey=guest", {
      method: "GET",
      mode: "cors",
      headers: new Headers({}),
    });

    const data = await response.json();
    return data;
  };
  const { data, isLoading, isError, error } = useQuery<WordData, Error>(
    ["getWord"],
    getGoodword,
    { }
  );
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
    if (data) {
      setCurrentword(splitIntoParagraps(data[1].respond,100));
			console.log(currentword);
			console.log("worpd");
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return <div className="overflow-hidden items-center  h-40 text-white z-10"><WordAnimation data={data} /></div>;
}
