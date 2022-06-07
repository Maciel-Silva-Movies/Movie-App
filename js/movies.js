const getAllMovies = () => {
    const URL = "https://agreeable-tide-wolverine.glitch.me/movies";
    return fetch(URL).then(res => res.json());
}

console.log(getAllMovies());

const renderMovieHTML = () => {
    console.log("Rendering Movie HTML")
    getAllMovies().then((data) => {
        let movieCards = data.map(movie => {
            return `
            <div>
            <h3>Title: ${movie.title}</h3>
            <p>Rating: ${movie.rating}</p>
            <button data-id="${movie.id}">Edit</button>
            <button data-id="${movie.id}">Delete</button>
            </div>
            `
        })
        console.log(movieCards);
        document.getElementById("library").innerHTML = movieCards.join("");
    })
}
renderMovieHTML();