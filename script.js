const getRandomNumber = () => Math.floor(Math.random() * 9000)


function getFormatedReleaseDate(apiDate) {
    const date = apiDate.split('-')
    const year = date[0]
    const mounth = date[1]
    const day = date[2]

    return `${mounth}/${day}/${year}`
}


function updateLoadingStatus(){
    document.getElementById('loadingIcon').classList.toggle('hide')
    document.querySelector('main').classList.toggle('hide')
}


function removeLastCaractere(string) {
    string = string.split(',')
    string.pop()
    return string.join(', ')
}


async function setMoviePoster(path) {
    try {
        const response = await axios.get(`https://image.tmdb.org/t/p/w500/${path}`)
        document.getElementById('movie-poster').style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${response.request.responseURL})`
    } catch (error) {
        document.getElementById('movie-poster').style.backgroundImage = `url(assets/interrogacao.jpg)`
    }
    updateLoadingStatus()

}

function setMovieInfo(data) {

    let genresSpan = ''
    let productionCountries = ''

    for (let genre of data.genres) {
        genresSpan += `<span class="api-span">${genre.name}</span>, `
    }


    for (let country of data.production_countries) {
        productionCountries += `<span class="api-span">${country.name}</span>, `
    }

    document.getElementById('li-genres').innerHTML = `<span class="span-title">Genres:</span> ${removeLastCaractere(genresSpan)}`
    document.getElementById('original-title').innerHTML = `<span class="span-title">Original title:</span> <span class="api-span">${data.original_title}</span>`
    document.getElementById('release-date').innerHTML = `<span class="span-title">Release date:</span> <span class="api-span">${getFormatedReleaseDate(data.release_date)}</span>`
    document.getElementById('production-countries').innerHTML = `<span class="span-title">Production countries:</span> ${removeLastCaractere(productionCountries)}`

    document.getElementById('movie-title').innerText = data.title
    document.getElementById('movie-description').innerText = data.overview

    
    setMoviePoster(data.poster_path)
}


async function searchRandomMovie() {
    try {
        const json = await axios.get(`https://api.themoviedb.org/3/movie/${getRandomNumber()}?api_key=7bd52ba876f696e68d8505e5fa820bc1`)
        setMovieInfo(json.data)
    } catch (error) {
        searchRandomMovie()
    }
}


document.querySelector('button').addEventListener('click', searchRandomMovie)
document.querySelector('button').addEventListener('click', updateLoadingStatus)

