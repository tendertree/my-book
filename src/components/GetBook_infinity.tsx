import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Card from "./Card";
import {
  Suspense,
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";


type Book = {
  title: string;
  image: string;
  description: string;
};

const GetBookInfinity = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [ref, isView] = useInView();
  const boxRef = useRef([]);

  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(() => {
    const tween = gsap.from(".books", { duration: 1, opacity: 0 });
   const bookDiv = document.querySelector(".books");

// Check if the bookDiv exists and remove the ".books" class
if (bookDiv) {
  bookDiv.classList.remove("books");
}
  }, [books]);
  useEffect(() => {
    // let ctx = gsap.context(() => {
    // 	gsap.from("#box", 1.4, {
    // 		opacity: 0,
    // 		x: 40,
    // 		ease: "power3.inOut",
    // 		stagger: 0.2,
    // 		delay: 0.2,
    // 		ScrollTrigger: {
    // 			trigger: "#box",
    // 			start: "top center",
    // 			scrub: 1,
    // 			toggleAction: "reverse none reverse pause",
    // 		},
    // 	});
    // });
    //
    // return () => ctx.revert();
  }, []);
  const getNextPage = () => {
    fetchNextPage();
    let begin = boxRef.current.length;
    for (let i = 0; i < 10; i++) {
      let current = boxRef.current[i + begin];
    }
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["bookData"],
      async ({ pageParam = 1 }) => {
        const response = await fetch(
          `/v1/search/book.json?query=행복&display=10&start=${
            (pageParam - 1) * 10 + 1
          }`,
          {
            method: "GET",
            headers: new Headers({
              "X-Naver-Client-Id": "DX8HfBFLotM13_Vw3L31",
              "X-Naver-Client-Secret": SECRET_KEY,
            }),
          }
        );
        const data = await response.json();
        return {
          items: data.items,
          nextPage: pageParam + 1,
        };
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        onSuccess: (data) => {
          setBooks((prevBooks) => {
            //...prevBooks,
            //...data.pages.flatMap((page) => page.items),
            const newItems = data.pages.flatMap((page) => page.items);
            const allItems = [...prevBooks, ...newItems];
            const uniqueItems = Array.from(new Set(allItems));
            return uniqueItems;
          });
        },
      }
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4">
        <Suspense>
           {books.map((m, index) => (
             <div
              id="box2"
              key={index}
              ref={(ref) => (boxRef.current[index] = ref)}
            >
              <div>
                <Card
                  className=" transition-colors ease-in-out delay-150"
                  title={m.title}
                  image={m.image}
                  description={m.description}
                ></Card>
              </div>
            </div>
          ))}
					
        </Suspense>
        {hasNextPage && (
          <button onClick={() => getNextPage()}>Load more</button>
        )}
      </div>
    </>
  );
};

export default GetBookInfinity;
