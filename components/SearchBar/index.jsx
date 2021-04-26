import React, { useEffect, useState } from "react";

export default function SearchBar({movieList, setmovieList}) {
	const [title, settitle] = useState("");
	const [movieID, setmovieID] = useState("");
	const [year, setyear] = useState("");
	const [pageNum, setpageNum] = useState(1);
	const [totalResult, settotalResult] = useState("");
	

	const getMovie = () => {
		if(Number(title) === 0){
			return;
		}else{
			fetch(`http://www.omdbapi.com/?s=${title}&page=${pageNum}&apikey=f734a0c0`)
			.then(response => response.json())
			.then(result => {
				if(result.Response === "False"){
					console.log("you got an error");
					alert("Please enter valid name");
					return;
				}else{
					console.log(result);
				}
				settotalResult(result.totalResults);
				let newArr = result.Search;
				let newList = [...movieList, ...newArr];
				setmovieList(newList);
			})
		}
			
	}
	useEffect(() => {
		let totalPageResult = movieList.length;
		if(totalResult === totalPageResult){
			return;
		}
		window.addEventListener('scroll', () =>{
      	if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
			 setpageNum(pageNum + 1);
			 getMovie();
      		}

     	})
    	return () => {
			window.removeEventListener('scroll', ()=>{});
	  	}
	}, [pageNum])
	

	return (
		<div className="relative shadow-lg my-10 p-5 rounded-md mx-5">
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}>
				<div className="field-group grid grid-cols-2 md:grid-cols-4 gap-4 ">
					<input
						type="search"
						name="s"
						className="py-2 text-sm col-span-2 md:col-auto text-gray-600 bg-gray-100 rounded-md px-2  focus:outline-none focus:ring focus:border-purple-600 focus:bg-white focus:text-gray-900"
						placeholder="Search Title"
						autoComplete="off"
						onInput = {(e) => settitle(e.target.value)}
					/>
					<input
						type="search"
						name="y"
						className="py-2 text-sm text-gray-600 bg-gray-100 rounded-md px-2  focus:outline-none focus:ring focus:border-purple-600 focus:bg-white focus:text-gray-900"
						placeholder="Year"
						autoComplete="off"
						onChange = {(e) => setyear(e.target.value)}
					/>
					<input
						type="search"
						name="i"
						className="py-2 text-sm  text-gray-600 bg-gray-100 rounded-md px-2  focus:outline-none focus:ring focus:border-purple-600 focus:bg-white focus:text-gray-900"
						placeholder="ID"
						autoComplete="off"
						onChange = {(e) => setmovieID(e.target.value)}
					/>
					<button
						type="submit"
						className=" search-btn text-white font-bold p-1 rounded col-span-2 md:col-auto bg-yellow-400 focus:outline-none focus:shadow-outline"
						onClick = {getMovie}>
						Search
					</button>
				</div>
			</form>
		</div>
	);
}
