import { useLayoutEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import gsap from "gsap";

import Getwords from "./components/Getwords";
import Footer from "./components/Footer";
import GetBookInfinity_data from "./components/GetBook_infinity_data";
import Seachbar from "./components/SearchBar/Searchbar";
import ScrollGallery from "./components/ScrollGallery";


function App() {





	return (<>
		<div className="flex  items-center justify-center mx-auto  pt-14 sm:w-full h-100 overflow-hidden">
			<div className="mx-auto  z-10 px-3">
				<Getwords></Getwords>
			</div>
			<img src="main.png" className="absolute  mx-auto  w-44 z-0 " />
		</div>

		<div className="mt-2 mb-5 mx-2 sm:mx-36">
			<GetBookInfinity_data></GetBookInfinity_data>
		</div>

		<div className="absolute text-white left-5 top-3">tendertree</div>
	</>
	);
}

export default App;
