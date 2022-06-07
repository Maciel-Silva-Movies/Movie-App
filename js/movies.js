setTimeout(() => {
    const box = document.getElementsByTagName('body').
    // 👇️ removes element from DOM
    box.style.display = 'none';
    // 👇️ hides element (still takes up space on page)
    // box.style.visibility = 'hidden';
}, 3000); // 👈️ time in milliseconds

document.getElementById('alrt').innerHTML='<img src="/images/EXfh.gif">';
const getAllMovies = () => {
    const URL = "https://agreeable-tide-wolverine.glitch.me/movies";
    return fetch(URL).then(res => res.json());
}
console.log(getAllMovies());
setTimeout(function() {document.getElementById('alrt').innerHTML='';},3000);


// const getAllMovies = () => {
//     const URL = "https://agreeable-tide-wolverine.glitch.me/movies";
//     return fetch(URL).then(res => res.json());
// }


//


const renderMovieHTML = () => {
    console.log("Rendering Movie HTML")
    getAllMovies().then((data) => {
        let movieCards = data.map(movie => {
            return `
            <div>
            <h3>Title: ${movie.title}</h3>
            <p>Rating: ${movie.rating}</p>
            <button class="editBtn" data-id="${movie.id}">Edit</button>
            <button class="delBtn" data-id="${movie.id}">Delete</button>
            </div>
            <br>
            `
        })
        console.log(movieCards);
        document.getElementById("library").innerHTML = movieCards.join("");
    }).then(() => {
        $(".delBtn").on("click", function () {
            deleteMovie($(this).data("id"))
        })
    });
}

renderMovieHTML()

// Edit function

const editMovie = (movie) => {
    const URL = "https://agreeable-tide-wolverine.glitch.me/movies";
    let options = {
        method: "PATCH",
        headers: {
            // Content-Type : tells the server what type of data we are sending with our request. When interacting with a JSON API, this will usually be in application/json.
            'Content-Type': 'application/json' // establishing the format in which we send the data.
        },
        body: JSON.stringify(movie) // convert the JS object into a JSON String before sending it to the server.
    }

    return fetch(`${URL}/${movie.id}`, options).then(resp => resp.json())
}

// let editedMovie = {
//     id: 1,
//     title: "Pulp Fiction",
// }

// editMovie(editedMovie);

// Add Function

const addMovie = (movieObj) => {
    const URL = "https://agreeable-tide-wolverine.glitch.me/movies";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObj)
    }
    return fetch(URL, options).then(res => res.json()).then(result => console.log("You've successfully created a new movie!", result))
}

document.getElementById("addMovie").addEventListener("click", function (e) {
    e.preventDefault();
    let newMovie = {
        title: document.getElementById("title").value,
        rating: document.getElementById("rating").value
    }
    addMovie(newMovie).then((res) => {
        console.log(res)
        document.getElementById("title").value = "";
        document.getElementById("rating").value = "";
        renderMovieHTML()
    })
})

const deleteMovie = (id) => {
    const URL = "https://agreeable-tide-wolverine.glitch.me/movies";
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${URL}/${id}`, options).then(() => console.log("The movie " + id + " has been deleted successfully")).then(renderMovieHTML)
}

