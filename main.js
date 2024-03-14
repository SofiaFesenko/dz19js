let addButton = document.querySelector('.addButton')
let showButton = document.querySelector('.showFilms')
let deleteButton = document.querySelector('.deleteBtn')

let filmsOptions = document.querySelector('#film-select')

let table = document.querySelector('table')



function showFilmsFunc() {
    fetch("http://localhost:3000/movies", {
            method: "GET",
        }).then(response => response.json())
            .then(films => {
                table.innerHTML = ""
                for (const i of films) {
                    table.innerHTML += `
                        <tr>
                            <th>title</th>
                            <th>genre</th>
                            <th>director</th>
                            <th>year</th>
                        </tr>
                        <tr>
                            <td>${i.title}</td>
                            <td>${i.genre}</td>
                            <td>${i.director}</td>
                            <td>${i.year}</td>
                        </tr>`
                }
                
            })
            .catch(error => console.log(error));
}


function addFilmFunc() {    
    let title = document.querySelector('.title')
    let genre = document.querySelector('.genre')
    let director = document.querySelector('.director')
    let year = document.querySelector('.year')

    let postToAdd = {
        title: title.value,
        genre: genre.value,
        director: director.value,
        year: Number(year.value)
    };

    fetch("http://localhost:3000/movies", {
        method: "POST",
        body: JSON.stringify(postToAdd),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }}).then(response => response.json())
        .catch(error => console.log(error));
}


function deleteFilmFunc(idToDelete) {
    fetch(`http://localhost:3000/movies/${idToDelete}`, {
        method: "DELETE",
        }).then(response => response.json())
        .catch(error => console.log(error));
}

function loadFilmsToChoices() {
    fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(films => {
        for (const i of films) {
            filmsOptions.innerHTML += `<option>${i.title}</option>`
        }
    })
    .catch(error => console.log(error));
}

loadFilmsToChoices()

showButton.addEventListener('click', showFilmsFunc)

addButton.addEventListener('click', e => {
    e.preventDefault()
    addFilmFunc()
})

deleteButton.addEventListener('click', () => {
    let idToDelete

    fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(films => {
        for (const i of films) {
            if (filmsOptions.value == i.title) {
                idToDelete = i.id
            }
        }
        deleteFilmFunc(idToDelete)
    })
    .catch(error => console.log(error));
})