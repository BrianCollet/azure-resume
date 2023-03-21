function getVisitorCount() {
	const count = document.getElementById('count');
	const url = 'http://localhost:7071/api/GetVisitorCount';

	fetch(url)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			count.innerHTML = data.count;
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});
}
