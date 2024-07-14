import React, { useState, useEffect } from "react";

function App() {
	const [images, setImages] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [count, setCount] = useState(0);
	const [disableButton, setDisableButton] = useState(false);

	async function fetchImages() {
		try {
			setLoaded(true);
			const response = await fetch(
				`https://dummyjson.com/products?limit=20&skip=${
					count === 0 ? 0 : count * 20
				}`
			);
			const result = await response.json();
			const data = result.products;

			if (data && data.length) {
				setImages((prevData) => [...prevData, ...data]);
				setLoaded(false);
			}
			console.log(result);
		} catch (err) {
			console.log(err);
			setErrorMsg(err);
			setLoaded(false);
		}
	}

	useEffect(() => {
		fetchImages();
	}, [count]);

	useEffect(() => {
		if (images && images.length >= 100) {
			setDisableButton(true);
		}
	}, [images]);

	if (loaded) {
		return <div>Loading... Please wait</div>;
	}

	if (errorMsg !== null) {
		return <div>Error occurred! {errorMsg}</div>;
	}

	return (
		<div className="container">
			<div className="products">
				{images && images.length
					? images.map((imageItem, index) => (
							<div className="item-div">
								<img
									key={imageItem.id}
									src={imageItem.thumbnail}
									alt={imageItem.title}
								/>
								<p className="item-info">{imageItem.title}</p>
							</div>
					  ))
					: null}
			</div>
			<button
				disabled={disableButton}
				onClick={() => setCount(count + 1)}
				className="load-btn">
				Load more products
			</button>
			{disableButton ? (
				<div className="limit-reach">
					Maximum limit reached(100)! No more products can be fetched
				</div>
			) : null}
		</div>
	);
}

export default App;
