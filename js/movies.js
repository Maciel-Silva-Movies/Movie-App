"use strict";
//Loading gif//
document.getElementById('alrt').innerHTML='<img src="/images/EXfh.gif">';

setTimeout(function() {document.getElementById('alrt').innerHTML='';},3000);
//initially hidden, now displays body of HTML//
let delay = 4000; // delay time in milliseconds
let timeoutId = setTimeout(function () {
    document.querySelector(".hide-first").style.visibility = "visible";
}, delay);

// let delay2 = 4000; // delay time in milliseconds
// let timeoutId2 = setTimeout(function () {
//     document.querySelector("#carouselExampleFade").style.visibility = "visible";
// }, delay2);
// Grabs glitch JSON website information (i.e. Objects)//
const getAllMovies = () => {
    const URL = "https://agreeable-tide-wolverine.glitch.me/movies";
    return fetch(URL).then(res => res.json());
}
console.log(getAllMovies());
//Long template string that includes movie attributes]]

const renderMovieHTML = () => {
    console.log("Rendering Movie HTML")
    getAllMovies().then((data) => {
        let movieCards = data.map(movie => {
            return `
            <div>
            <div class="w-50">${movie.image}</div>
            <br>
            <h3>Title: ${movie.title}</h3>
            <p>Rating: ${movie.rating}</p>
            <button class="editBtn" data-id="${movie.id}">Edit</button>
            <button class="delBtn" data-id="${movie.id}">Delete</button>
            </div>
            <br>
            `
        })
        console.log(movieCards);
        //Deletes movies//
        document.getElementById("library").innerHTML = movieCards.join("");
        })
        .then(() => {
        $(".delBtn").on("click", function () {
            deleteMovie($(this).data("id"))
        })
        // Edit movies//
    }).then(() => {
        $(".editBtn").on("click", function () {
            let newTitle = prompt("What is the new title?")
            let newRate = prompt("What is the new rating?")
            let movieObj = {
                id: $(this).data("id"),
                title: newTitle,
                rating: newRate
            }
            editMovie(movieObj);
        });
    })
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

    return fetch(`${URL}/${movie.id}`, options).then(resp => resp.json()).then(() => renderMovieHTML())
}
//Add movie//
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
//Add movie actions with "coming soon" img//
document.getElementById("addMovie").addEventListener("click", function (e) {
    e.preventDefault();
    let newMovie = {
        image: document.getElementById("title").innerHTML = '<img src="/images/coming-soon.jpeg">',
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

