import config from './config'
const CryptoJS = require("crypto-js");
const API_KEY = config.API_KEY
const PRIV_KEY = config.PRIV_KEY
let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + PRIV_KEY + API_KEY).toString();
let RESTURL = `&ts=${ts}&apikey=${API_KEY}&hash=${hash}`;
let HEROES = `https://gateway.marvel.com:443/v1/public/characters?limit=:limit&offset=:offset${RESTURL}`;
let COMIC = '';
let validURL = 'https://gateway.marvel.com:443/'
const funcs = {
    getHeroes(limit, offset) {
        HEROES = HEROES.replace(':limit', limit)
        HEROES = HEROES.replace(':offset', offset)
        return fetch(HEROES)
            .then(res => res.json())
            .then(json => json.data.results)
    },
    getComic(comicURL) {
        COMIC = `${comicURL}?${RESTURL}`;
        COMIC =  COMIC.replace('http://gateway.marvel.com/', validURL);
        return fetch(COMIC)
            .then(res => res.json())
            .then(json => json.data.results)
    } // here is the fix
}
export default funcs;
