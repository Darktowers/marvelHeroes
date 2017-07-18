<template>
    <div id="heroes">
        <header class="header">
            <img class="header-logo" src="src/assets/marvel.svg" alt="">
            <div class="header-search">
                <input v-model="search" type="text" class="header-search-input" placeholder="Search character...">
                <i class="fa fa-search" aria-hidden="true"></i>
            </div>
        </header>
        <spinner v-show="loading"></spinner>
        <div v-if="showModal" class="modalContainer">
            <div class="modal">
                <div @click="cerrarComic" class="closeModal"><img src="src/assets/btn-close.png" alt=""></div>
                <div class="containerComic">
                    <div class="content">
                        <div class="col">
                            <div class="image">
                                <img :src="comic[0].images[0].path+'.'+comic[0].images[0].extension" alt="">
                            </div>
                        </div>
                        <div class="col">
                            <h3 class="title">{{comic[0].title}}</h3>
                            <p class="descx">{{comic[0].description}}</p>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="btn btn-favoritos" @click="agregarFavoritos"><img src="src/assets/btn-favourites-default.png" alt=""> Add to favourites</button>
                        <a target="_blank" :href="comic[0].urls[0].url" class="btn btn-buy"><img src="src/assets/shopping-cart-primary.png" alt=""> Buy for $ {{comic[0].prices[0].price}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-wrap">
            <div class="col1" v-if="!loading">
                <div class="titleContainer">
                    <img src="src/assets/characters.png" alt="">
                    <h2>Characters</h2>
                </div>
                <paginate name="heroesComp" :list="heroes" :per="10" tag="div" class="heroesContainer">
                    <div class="hero" v-for="hero in paginated('heroesComp')">
                        <div class="hero-container">
                            <div class="hero-container-description">
                                <h2 class="title">{{hero.name}}</h2>
                                <p class="description">{{hero.description}}</p>
                                <button class="btn-red btn">VIEW MORE</button>
                            </div>
                            <div class="hero-image">
                                <img :src="hero.thumbnail.path+'.'+hero.thumbnail.extension" alt="">
                            </div>
                        </div>
                        <div class="comics">
                            <h3>Related comics</h3>
                            <div class="comics-container">
                                <li v-for="comic in hero.comics.items">
                                    <a href="" @click="mostrarComic" class="comic" :data-comic="comic.resourceURI">{{comic.name}}</a>
                                </li>
                            </div>
                        </div>
                    </div>
                </paginate>
                <paginate-links for="heroesComp" :async="true"></paginate-links>
            </div>
            <div class="col2" v-if="!loading">
                <div class="favoritos">
                    <div class="titleContainer">
                        <img src="src/assets/favourites.png" alt="">
                        <h2>My Favourites</h2>
                    </div>
                    <div class="favoritos-container">
                        <div class="favorito" v-for="favorito in favoritos">
                            <div class="thrash" @click="removeFavorito" :data-id="favorito.id">
                                <img src="src/assets/btn-delete.png" alt="">
                            </div>
                            <div class="comic-container">
                                <div class="comic-image">
                                    <img :src="favorito.imagen" alt="">
                                </div>
                            </div>
                            <p class="comic-name">{{favorito.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
@import "stylus/main.styl"
</style>
<script>
import Spinner from './components/Spinner.vue'
import api from './api'
export default {
    name: 'heroes',
    data() {
        return {
            heroes: [],
            loading: true,
            loadingComic: true,
            offset: 0,
            limit: 100,
            paginate: ['heroesComp'],
            comic: '',
            showModal: false,
            search: '',
            backHeroes: [],
            favoritos: []
        }
    },
    components: {
        Spinner
    },
    methods: {
        refreshHeroes() {
            const self = this
            this.loading = true
            this.heroes = []
            this.backHeroes = []
            api.getHeroes(this.limit, this.offset)
                .then(function (heroes) {
                    self.heroes = heroes
                    self.backHeroes = heroes
                    self.loading = false
                })
        },
        mostrarComic(item) {
            item.preventDefault();
            let main = document.getElementsByClassName('main-wrap');
            let header = document.getElementsByClassName('header');
            header[0].classList.add("blur");
            main[0].classList.add("blur");
            const self = this;
            this.comic = [];
            this.loadingComic = true;
            let itemx = item.currentTarget;
            let comic = itemx.getAttribute("data-comic");
            api.getComic(comic)
                .then(function (returnComic) {
                    self.comic = returnComic
                    self.loadingComic = false
                    self.showModal = true;
                })
        },
        cerrarComic(item) {
            item.preventDefault();
            let main = document.getElementsByClassName('main-wrap');
            let header = document.getElementsByClassName('header');
            header[0].classList.remove("blur");
            main[0].classList.remove("blur");
            this.showModal = false;
            this.comic = [];
        },
        removeFavorito(item) {
            let itemx = item.currentTarget;
            let comicID = itemx.getAttribute("data-id");
            let self = this;
            let exist = false;
            let newFavoritos = [];
            this.favoritos.filter(function (favoritox) {
                if (favoritox.id == comicID) {
                    console.log("Eliminado");
                } else {
                    newFavoritos.push(favoritox);
                }
            });
            this.favoritos = newFavoritos;
            let favoritosJSON = JSON.stringify(this.favoritos);
            localStorage.setItem('favoritos', favoritosJSON);
        },
        agregarFavoritos(item) {
            let self = this;
            let exist = false;
            this.favoritos.filter(function (favorito) {
                if (favorito.name.toLowerCase().indexOf(self.comic[0].title.toLowerCase()) >= 0) {
                    exist = true;
                }
            });
            if (exist == true) {
                console.log("Existe");
            } else {
                let favorito = {
                    id: this.comic[0].id,
                    name: this.comic[0].title,
                    imagen: this.comic[0].images[0].path + '.' + this.comic[0].images[0].extension
                }
                item.preventDefault();
                this.favoritos.push(favorito);
                let favoritosJSON = JSON.stringify(this.favoritos);
                localStorage.setItem('favoritos', favoritosJSON);
            }
        }

    },
    watch: {
        search(newEl, oldEl) {
            if (newEl == "") {
                this.heroes = this.backHeroes;
            } else {
                let newHeroes = [];
                this.heroes.filter(function (hero) {
                    if (hero.name.toLowerCase().indexOf(newEl.toLowerCase()) >= 0) {
                        newHeroes.push(hero);
                    }
                });
                this.heroes = newHeroes;
            }
        }
    },
    mounted: function () {
        this.refreshHeroes();
        let objFavoritos;
        if (localStorage.getItem("favoritos") === null) {
            localStorage.setItem("favoritos", '');
            objFavoritos = localStorage.getItem("favoritos");
            this.favoritos = JSON.parse(objFavoritos);
        } else {
            objFavoritos = localStorage.getItem("favoritos");
            this.favoritos = JSON.parse(objFavoritos);
        }
    }
}
</script>