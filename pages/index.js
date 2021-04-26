import React, { useState } from 'react';
import Head from "next/head";
import dynamic from "next/dynamic";
const SearchPage = dynamic(() => import("../components/SearchPage"));


export default function Home(props) {
	const [movieList, setmovieList] = useState([]);
	return (
		<>
			<Head>
				<title>OMDB movies</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SearchPage movieList = {movieList} setmovieList ={setmovieList}/>
		</>
	);
}
