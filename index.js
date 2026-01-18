const api_key = config.api;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
   Authorization: `Bearer ${api_key}`
  }
};
const movieForm = document.querySelector(".movieForm");
const movieInput = document.querySelector(".movieInput");
const container = document.querySelector(".container");

movieForm.addEventListener("submit", async event => {

    event.preventDefault();

    const movie = movieInput.value;

    if(movie){
        try{
            const movieData = await getMovieData(movie);
            displayMovie(movieData.results);
        }
        catch(error){
            console.error(error);
            
        }
    }
})

document.addEventListener('DOMContentLoaded', async () =>{

    const popular_url = `https://api.themoviedb.org/3/trending/movie/week`;
    
    const response = await fetch(popular_url, options);

    const data = await response.json();

    displayMovie(data.results);
    

})



async function getMovieData(movie) {

    const apiUrl= `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`

    const response = await fetch(apiUrl, options);

    if(!response.ok){
        throw new Error("Could not fetch movie");
    }

    return await response.json();
    


}

function displayMovie(movies) {

    container.textContent = "";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";

    movies.forEach((movie) => {
        const {title, poster_path, release_date, vote_average,} = movie;

        
        const card = document.createElement("div");
        card.classList.add("movieCard"); 
        const movieDisplay = document.createElement("h1");
        //const overviewDisplay = document.createElement("p");
        const posterDisplay = document.createElement("img");
        const releaseDisplay = document.createElement("p");
        const voteDisplay = document.createElement("p");

        card.addEventListener('click', () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        movieDisplay.textContent = title;
        //overviewDisplay.textContent = overview;
        voteDisplay.textContent = `Rating: ${Math.floor(vote_average * 10)/10}`;

        const dateObj = new Date(release_date);

        const formattedDate = dateObj.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        releaseDisplay.textContent = formattedDate;
        if(poster_path){
            posterDisplay.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
            posterDisplay.style.width = "100%";
        }

        card.appendChild(movieDisplay);
        card.appendChild(posterDisplay);
        //card.appendChild(overviewDisplay);
        card.appendChild(voteDisplay);
        card.appendChild(releaseDisplay);
        

        container.appendChild(card);



    });
    

}

