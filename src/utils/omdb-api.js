const apiEndpoint = 'https://www.omdbapi.com/';
// const apiKey = process.env.OMDB_API_KEY;
const apiKey = "9870ef96";

async function getMovies(searchTerm, asyncMovieStateUpdate) {
    // use a template literal string to piece together the fetch url (below), passing in the 
    // searchTerm from the React component calling this function
    const url = `${apiEndpoint}?s=${searchTerm}&apikey=${apiKey}`;
    const data = await fetch(url).then(res => res.json());

    // we also pass in a function defined in the React (class) component (because it will have to
    // hold state) that calls on getMovies (right now, this is App.js making the call); the function
    // passed in must be BOUND to 
    asyncMovieStateUpdate(data.Search);
    return;
}

export default getMovies;


