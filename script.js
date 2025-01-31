// Function to edit a movie
window.editMovie = function (index) {
    const movie = movies[index];
    document.getElementById("title").value = movie.title;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("director").value = movie.director;
    document.getElementById("rating").value = movie.rating;
    document.getElementById("description").value = movie.description;

    // Remove the movie from the list
    movies.splice(index, 1);
    saveMovies();
    renderMovies();
};

// Function to delete a movie
window.deleteMovie = function (index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce film?")) {
        movies.splice(index, 1);
        saveMovies();
        renderMovies();
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("movie-form");
    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    // Function to save movies to localStorage
    function saveMovies() {
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // Function to render movies
    function renderMovies() {
        const movieContent = document.getElementById("movie-content");
        if (!movieContent) return; // Exit if the element doesn't exist

        movieContent.innerHTML = ""; // Clear the content

        const movies = JSON.parse(localStorage.getItem("movies")) || [];

        if (movies.length === 0) {
            movieContent.innerHTML = `<p style="text-align: center; color: #888;">Aucun film disponible.</p>`;
            return;
        }

        movies.forEach((movie, index) => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie");
            movieDiv.innerHTML = `
                <img src="https://placehold.co/300x450" alt="Movie poster">
                <h1>${movie.title}</h1>
                <p>${movie.description}</p>
                <div class="details">
                    <p><strong>Rating:</strong> ${movie.rating}/10</p>
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    <p><strong>Réalisateur:</strong> ${movie.director}</p>
                </div>
                ${movie.video ? `<video controls><source src="${movie.video}" type="video/mp4">Votre navigateur ne supporte pas la vidéo.</video>` : ''}
                <button onclick="editMovie(${index})">Modifier</button>
                <button onclick="deleteMovie(${index})">Supprimer</button>
            `;
            movieContent.appendChild(movieDiv);
        });
    }

    // Function to handle form submission (Create)
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the form from submitting the traditional way

            // Get form values
            const title = document.getElementById("title").value;
            const genre = document.getElementById("genre").value;
            const director = document.getElementById("director").value;
            const rating = document.getElementById("rating").value;
            const description = document.getElementById("description").value;
            const videoUrl = document.getElementById("video").value;
            const videoFile = document.getElementById("video-file").files[0];

            // Validate form inputs
            if (!title || !genre || !director || !rating || !description) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            // Handle video upload
            let video = videoUrl;
            if (videoFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    video = e.target.result;
                    saveMovie(title, genre, director, rating, description, video);
                };
                reader.readAsDataURL(videoFile);
            } else {
                saveMovie(title, genre, director, rating, description, video);
            }
        });
    }

    // Function to save movie data
    function saveMovie(title, genre, director, rating, description, video) {
        const newMovie = {
            title: title,
            genre: genre,
            director: director,
            rating: rating,
            description: description,
            video: video,
        };

        // Add the new movie to the movies array
        movies.push(newMovie);

        // Save the updated movies array to localStorage
        saveMovies();

        // Reset the form
        form.reset();

        // Notify the user
        alert("Film ajouté avec succès!");

        // Redirect to the home page (optional)
        window.location.href = "accuiel.html";
    }

    // Call renderMovies when the page loads
    renderMovies();
});