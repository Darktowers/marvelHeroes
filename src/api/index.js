import config from './config'
const CryptoJS = require("crypto-js");
const apiKey = config.apiKey
const apiKey2 = config.apiKey2
const priKey = config.priv

let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + priKey + apiKey2).toString();

const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`
const HEROES = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${apiKey2}&hash=${hash}`

export default function getHeroes(){
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