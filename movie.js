const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTE5MmMzN2U1MzMwOTUyZjUyNGRjZDdiYjk0MTliZiIsIm5iZiI6MTc2ODczMDkzMy4wNjA5OTk5LCJzdWIiOiI2OTZjYjEzNTQ0YTk3MTUzYTczNmFkYWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.c6xKJ9N5WiITTaGFVlVyuvcyBOTF5qKlef2VCIjhBlg'
  }
};
const img_path = 'https://image.tmdb.org/t/p/w1280';

const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

document.addEventListener(`DOMContentLoaded`, async () => {

    if(movieId){
        try{

            const movie = await getMovieDetails(movieId);
            console.log(movie);
            displayMovieDetails(movie);                 

        }catch (error){
            console.error(error);
        }
    }
    
});

async function getMovieDetails(movieId) {

    const url = `https://api.themoviedb.org/3/movie/${movieId}`;

    const response = await fetch(url, options);


    return await response.json();

}

function displayMovieDetails(movie){

    const container = document.getElementById("movie-details-container");
    container.textContent = "";

    const{budget, genres, original_title, overview, poster_path, 
        backdrop_path, release_date, revenue, runtime, 
        tagline,  vote_average } = movie;

    const budgeDisplay = document.createElement("p");
    const titleDisplay = document.createElement("h1");
    const overviewDisplay = document.createElement("p");
    const posterDisplay = document.createElement("img");
    const voteDisplay = document.createElement("p");
    const revenueDisplay = document.createElement("p");
    const runtimeDispaly = document.createElement("p");
    const taglineDisplay = document.createElement("h2");
    const genreContainer = document.createElement("div");

    genreContainer.classList.add("genre-list");
    genres.forEach(genre => {
        const genreTag = document.createElement("span");
        genreTag.textContent = genre.name; 
        genreTag.classList.add("genre-tag"); 
        genreContainer.appendChild(genreTag);
    });

    const content = document.createElement("div");
    content.classList.add("content");

    const leftColumn = document.createElement("div");
    leftColumn.classList.add("left-col");

    const rightColumn = document.createElement("div");
    rightColumn.classList.add("right-col");

    titleDisplay.textContent = `${original_title} (${release_date.split('-')[0]})`;
    titleDisplay.classList.add("title");

    taglineDisplay.textContent = tagline;
    taglineDisplay.classList.add("movie-tagline");

    runtimeDispaly.textContent = `Runtime: ${runtime} min`;
    runtimeDispaly.classList.add("runtime");

    const formatedrevenue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits : 0
    }).format(revenue);

    revenueDisplay.textContent = `Revenue: ${formatedrevenue}`;
    revenueDisplay.classList.add("revenue");

    voteDisplay.textContent = `Rating: ${Math.floor(vote_average)}`;
    voteDisplay.classList.add("vote");

    const overviewHeader = document.createElement("h2");
    overviewHeader.textContent = "Overview";

    overviewDisplay.textContent = overview;
    overviewDisplay.classList.add("overview");
   
    const formatedBudget = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits : 0
    }).format(budget);
    budgeDisplay.textContent = `Budget: ${formatedBudget}`;
    budgeDisplay.classList.add("budget");


    if(backdrop_path){
        container.style.backgroundImage= `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`;
        container.style.backgroundSize = "cover";
        container.style.backgroundPosition = "center";
    }

    if(poster_path){
        posterDisplay.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        posterDisplay.classList.add("movie-poster");
    }

    leftColumn.appendChild(posterDisplay);

    rightColumn.appendChild(titleDisplay);
    rightColumn.appendChild(genreContainer);
    rightColumn.appendChild(taglineDisplay);
    rightColumn.appendChild(overviewHeader);
    rightColumn.appendChild(overviewDisplay);
    rightColumn.appendChild(voteDisplay);
    rightColumn.appendChild(runtimeDispaly);
    rightColumn.appendChild(revenueDisplay);
    rightColumn.appendChild(budgeDisplay);
    
    content.appendChild(leftColumn);
    content.appendChild(rightColumn);

    container.appendChild(content);

   
}