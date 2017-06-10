import config from './config'
const CryptoJS = require("crypto-js");
const API_KEY = config.API_KEY
const PRIV_KEY = config.PRIV_KEY

let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + PRIV_KEY + API_KEY).toString();

let HEROES = `https://gateway.marvel.com:443/v1/public/characters?limit=:limit&offset=:offset&ts=${ts}&apikey=${API_KEY}&hash=${hash}`

export default function getHeroes(limit,offset){
    HEROES = HEROES.replace(':limit', limit)
    HEROES = HEROES.replace(':offset', offset)    
    return fetch(HEROES)
        .then(res => res.json())
        .then(json => json.data.results)
}

// export default function getArtists(country){
//     const url = URL.replace(':country', country)
//     return fetch(url)
//         .then(res => res.json())
//         .then(json => json.topartists.artist)
// }