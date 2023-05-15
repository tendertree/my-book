import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Card from "./Card";
import {
	Suspense,
	createRef,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useInView } from "react-intersection-observer";
import Modal from "./Modal";
import Seachbar from "./SearchBar/Searchbar";

type Book = {
	title: string;
	image: string;
	description: string;
};

const initialBookState: Book = {
	title: "",
	description: "",
	image: "",
};

const GetBookInfinity_data = () => {
	const [theme, setTheme] = useState("행복");
	const [book, setBook] = useState(initialBookState);
	const [keyword, setKeyword] = useState("");
	const [bottomRef, inView] = useInView();
	const boxRef: React.MutableRefObject<(HTMLElement | null)[]> = useRef([]);
	const fetchBooks = async ({ pageParam = 1, queryKey }) => {
		const [key, { theme }] = queryKey;
		const keyTest = import.meta.env.ID_KEY;
		console.log("env show?");
		console.log(keyTest);
		const response = await fetch(
			`v1/search/book.json?query=${theme}&display=30&start=${(pageParam - 1) * 30 + 1
			}`,
			{
				method: "GET",
				headers: new Headers({
					"X-Naver-Client-Id": import.meta.env.ID_KEY,
					"X-Naver-Client-Secret": import.meta.env.SECRET_KEY,
				}),
			}
		);

		const data = await response.json();
		return {
			items: data.items,
			nextPage: pageParam + 1,
		};
	};

	const useBooksInfiniteQuery = () => {
		return useInfiniteQuery<Book[], Error>(
			["bookData", { theme }],
			fetchBooks,
			{
				getNextPageParam: (lastPage) => lastPage.nextPage,
			}
		);
	};
	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useBooksInfiniteQuery();
	gsap.registerPlugin(ScrollTrigger);

	const books = data?.pages?.flatMap((page) => page.items) || [];

	const [modalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	useLayoutEffect(() => {
		const tween = gsap.from(".books", { duration: 1, y: 10 });

	}, [keyword, data, theme]);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView]);

	const filteredBooks = useMemo(() => {
		if (books) {
			return books.filter((book) => book.title.includes(keyword));
		}
	}, [books, keyword]);

	return (
		<div className="">
			<div className="mb-4">
				<button
					onClick={() => setTheme("행복")}
					className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
				>
					행복
				</button>
				<button
					onClick={() => setTheme("사랑")}
					className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
				>
					사랑
				</button>
				<button
					onClick={() => setTheme("가족")}
					className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
				>
					가족
				</button>
				<button
					onClick={() => setTheme("휴식")}
					className="bg-purple-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
				>
					휴식
				</button>
			</div>
			<div className="flex mx-auto justify-center w-72 sm:w-96 mb-10">
				<Seachbar search={keyword} setSearch={setKeyword}></Seachbar>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-2 ">
				<Suspense>
					{filteredBooks?.map((m, index) => (
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
									showModal={toggleModal}
									setBook={setBook}
								></Card>
							</div>
						</div>
					))}
				</Suspense>
				{hasNextPage && (
					<button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
						{isFetchingNextPage ? "Loading..." : "Load More"}
					</button>
				)}

				<Modal close={toggleModal} show={modalVisible} book={book} />
			</div>
			<div ref={bottomRef} />
		</div>
	);
};
export default GetBookInfinity_data;
