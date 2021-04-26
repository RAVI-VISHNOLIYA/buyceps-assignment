  
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Data from '../../public/sampleData.json'
import { data } from "autoprefixer";
const SearchBar = dynamic(() => import("../SearchBar"));

export default function SearchPage({movieList, setmovieList}) {

	const showData = (arr) =>{
		return(arr.map((item, i) => (
			<div key = {i} className = "rounded rounded-4 grid grid-cols-2 md:grid-cols-2 gap-2" style = {{background:"#caf7e3"}}>
				<img className = "rounded rounded-4" src = {item.Poster} alt = {item.Title}/>
				<div>
					<h4>{item.Title}</h4>
					<h4>Type:{item.Type} {item.Year}</h4>
				</div>
				
			</div>
			
		)))
	}

	return (
		<>
			<p className="text-center my-10 text-3xl font-medium">Explore movies</p>
			<div className="boxed">
				<SearchBar 
					movieList = {movieList} 
					setmovieList = {setmovieList}
					/>
				<div>
				{movieList.length !== 0 ? (
						<div className = "grid grid-cols-2 md:grid-cols-3 gap-4">
							{showData(movieList)}
						</div>
					) : null}
				</div>
			</div>
		</>
	);
}
