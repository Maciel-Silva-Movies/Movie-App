const getAllMovies = () => {
    const URL = "https://agreeable-tide-wolverine.glitch.me/movies";
    return fetch(URL).then(res => res.json());
}

console.log(getAllMovies());