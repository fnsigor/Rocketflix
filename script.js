const getRandomNumber = () => Math.floor(Math.random() * 9000)


function getFormatedReleaseDate(apiDate){
    const date = apiDate.split('-')
    const year = date[0]
    const mounth = date[1]
    const day = date[2]

    return `${mounth}/${day}/${year}`
}


function removeLastCaractere(string){
    string =  string.split(',')
    string.pop()
    return string.join(', ')
}


function setMovieSecondaryInfo(object, getFormatedReleaseDate, removeLastCaractere){
    let genresSpan = ''
    let productionCountries = ''

    for(let genre of object.genres){
        genresSpan += `<span class="api-span">${genre.name}</span>, `
    }


    for(let country of object.production_countries){
        productionCountries += `<span class="api-span">${country.name}</span>, `
    }

    document.getElementById('li-genres').innerHTML = `<span class="span-title">Genres:</span> ${removeLastCaractere(genresSpan)}`
    document.getElementById('original-title').innerHTML = `<span class="span-title">Original title:</span> <span class="api-span">${object.original_title}</span>`
    document.getElementById('release-date').innerHTML = `<span class="span-title">Release date:</span> <span class="api-span">${getFormatedReleaseDate(object.release_date)}</span>`
    document.getElementById('production-countries').innerHTML = `<span class="span-title">Production countries:</span> ${removeLastCaractere(productionCountries)}`
}

async function setMoviePoster(path){
    try {
         const response = await axios.get(`https://image.tmdb.org/t/p/w500/${path}`)
         document.getElementById('movie-poster').style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${response.request.responseURL})`
    } catch (error) {
        document.getElementById('movie-poster').style.backgroundImage = `url(assets/interrogacao.jpg)`
    }
    
}

function setMovieMainInfo(title, description, posterPath, object, getFormatedReleaseDate, removeLastCaractere, setMoviePoster){
    
    document.getElementById('movie-title').innerText = title
    document.getElementById('movie-description').innerText = description
    setMoviePoster(posterPath)
    setMovieSecondaryInfo(object, getFormatedReleaseDate, removeLastCaractere)
}


async function searchRandomMovie() {
    try {
        //getRandomNumber está sendo buscada no escopo global, contra os padrões do paradigma funcional, onde as funcoes devem passadas como parametro
        const json = await axios.get(`https://api.themoviedb.org/3/movie/${getRandomNumber()}?api_key=7bd52ba876f696e68d8505e5fa820bc1`)
        setMovieMainInfo(json.data.title, json.data.overview, json.data.poster_path, json.data, getFormatedReleaseDate, removeLastCaractere, setMoviePoster)
    } catch (error) {
        searchRandomMovie()
    }
}


document.querySelector('button').addEventListener('click', searchRandomMovie)

