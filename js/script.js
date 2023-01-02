const URL = "https://api.adviceslip.com/advice";
const title = document.querySelector("h1");
const paragraph = document.querySelector("p");
const button = document.querySelector("button");
const divider = document.querySelector("picture img");

//fake delay for loader animation
const fakeDelay = (delay) => new Promise((res, rej) => setTimeout(res, delay));

const loadingAnimation = (loading) => {
	title.classList.toggle("loading", loading);
	divider.classList.toggle("loading", loading);
	paragraph.classList.toggle("loading", loading);
	button.classList.toggle("loader", loading);
	button.disabled = loading;
};

const dataReciever = (error, advice, id) => {
	if (!error) {
		title.textContent = `ADVICE #${id}`;
		paragraph.textContent = `${advice}`;
	} else {
		title.textContent = "ERROR";
		paragraph.textContent = `${error}`;
	}
};

const fetchAdvice = async () => {
	let error = false;
	let loading = true;
	loadingAnimation(loading);
	try {
		let data = await fetch(URL, {
			method: "GET",
		});
		await fakeDelay(4000);
		data = await data.json();
		const { id, advice } = data.slip;
		loading = false;
		loadingAnimation(loading);
		dataReciever(error, advice, id);
	} catch (er) {
		error = er.message;
		dataReciever(error);
	}
};

window.addEventListener("load", (e) => {
	fetchAdvice();
});

button.addEventListener("click", (e) => {
	fetchAdvice();
});
