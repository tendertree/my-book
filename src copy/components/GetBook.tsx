import axios from "axios";
import { useQuery } from "react-query";
import gsap from "gsap";
import Card from "../components/card";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
const ID_KEY = "DX8HfBFLotM13_Vw3L31";
const SECRET_KEY = "IHwlAcIjrh";
// Usage example
//
type Book = {
	title: string;
	image: string;
	description: string;
};
const GetBook = () => {
	const [books, setBooks] = useState<Book[]>([]);
	useLayoutEffect(() => {
		let ctx = gsap.context(() => {
			gsap.from("#box", 1.4, {
				opacity: 0,
				x: 40,
				ease: "power3.inOut",
				stagger: 0.2,
				delay: 0.2,
			});
		});
		return () => ctx.revert();
	}, [books]);

	const { isLoading, error, data } = useQuery(
		"bookData",
		async () => {
			const response = await fetch("/v1/search/book.json?query=행복", {
				method: "GET",
				headers: new Headers({
					"X-Naver-Client-Id": "DX8HfBFLotM13_Vw3L31",
					"X-Naver-Client-Secret": SECRET_KEY,
				}),
			});
			const data = await response.json();

			return data.items;
		},
		{
			onSuccess: (data) => {
				setBooks(data);
			},
		}
	);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4">
				<Suspense>
					{books.map((m) => (
						<div id="box" key={m.title}>
							<div>
								<Card
									title={m.title}
									image={m.image}
									description={m.description}
									key={m.id}
								></Card>{" "}
							</div>
						</div>
					))}
				</Suspense>
			</div>
		</>
	);
};

export default GetBook;
