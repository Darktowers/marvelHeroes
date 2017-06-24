<template>
    <div id="heroes">
        <spinner v-show="loading"></spinner>
        <div class="main-wrap">
        <div class="col1">
          <div class="titleContainer">
            <img src="src/assets/characters.png" alt="">
            <h2>Characters</h2>
          </div>
          
        <paginate v-if="!loading"
          name="heroesComp"
          :list="heroes"
          :per="10"
          tag="div"
          class="heroesContainer"
        >
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
                            <a href="" class="comic" :data-comic="comic.resourceURI" >{{comic.name}}</a>              
                          </li>
                        </div>
                      </div>
                  
                  </div>
                  
                </paginate>
                <paginate-links for="heroesComp" :async="true" ></paginate-links>
                
              </div>
            <div class="col2">
              <div class="favoritos">
                <div class="titleContainer">
                  <img src="src/assets/favourites.png" alt="">                  
                  <h2>My Favourites</h2>
                </div>
                <div class="favoritos-container">
                  <div class="favorito">
                    <div class="thrash">
                      <img src="" alt="">                      
                    </div>
                    <div class="comic-container">
                      <img src="" alt="">
                    </div>
                    <p class="comic-name"></p>
                  </div>
                </div>
              </div>
            </div>
        </div>

    </div>
</template>
<style lang="stylus">
rojo = #ec1d23
font-size = 16px;
line-height = 1;
lines-to-show = 2;
.btn
  color white
  font-weight bold
  padding 1em
  border 0
  margin-top 1em
  transition all .3s ease-in-out
  cursor pointer
  &-red
    background rojo
    &:hover
      background #D32F2F
.main-wrap
  display: flex;
  max-width: 100%;
  .titleContainer
    display: flex;
    align-items: center;
    img
      margin-right: 1em;
  h2
    letter-spacing 2px
    color #3d3332
  .col1
    width 80% 
    padding-left:1em;     
  .col2
    width 20%
#heroes
  .heroesComp
    display: flex;
    list-style: none;
    padding: 0;
    align-items: center;
    justify-content: center;
    li
      a
        padding: 1em;
        display: block;
      &.number
        color: #c5c1c2;
        width: 50px;
        height: 50px;
        text-align: center;
        padding: 0;
        box-shadow: 2px 2px 5px 0px #BDBDBD;
        margin: .5em;
        background: white;
        cursor: pointer;
        transition all .3s ease-in-out
        &:hover
          background: rojo;
          color: white;
          box-shadow: 2px 2px 5px 0px #E0E0E0;
        &.active
          background: white;
          color: black;
          box-shadow: 2px 2px 5px 0px #E0E0E0;
      
  .heroesContainer
    display flex
    flex-wrap: wrap
    justify-content: space-around;
    .hero
      background: white;
      padding: 0 1.5em 3em 1.5em;
      max-width: 430px;
      width: 100%;
      color: #463e3c;
      margin: 1.4em;
      .comics
        h3
          color: #796d6d;
        &-container
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          li
            list-style: none;
            .comic
              color: inherit;
              text-decoration: none;
              width: 170px;
              display: inline-block;
              margin: 0 .5em .5em 0;
              transition all .3s ease-in-out
              display: block; /* Fallback for non-webkit */
              display: -webkit-box;
              height: font-size*line-height*lines-to-show; /* Fallback for non-webkit */
              font-size: font-size;
              line-height: line-height;
              -webkit-line-clamp: lines-to-show;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              &:hover
                color rojo
      &-container
        display: flex;
        position: relative;
        min-height: 180px;
        .hero-image
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          left: -3em;
          top: -1em;
          box-shadow: 2px 1px 5px 1px #afa8ab;
          img
            position: absolute;
            height: 100%;
        &-description
          width: 100%;
          margin-left: 10em;
          position: relative;
          top: -1.8em;
          .title
            margin: .5em 0;
          .description
            margin: 0;
    

</style>
<script>
import Spinner from './components/Spinner.vue'

import getHeroes from './api'
export default {
  name: 'heroes',
  data () {
    return {
      heroes:[],
      loading:true,
      offset:0,
      limit:100,
      paginate: ['heroesComp']
    }
  },
  components:{
    Spinner
  },
  methods:{
    refreshHeroes(){
        const self = this
        this.loading = true
        this.heroes = []
        getHeroes(this.limit,this.offset)
          .then(function(heroes){
            self.heroes = heroes
            self.loading = false
          })
    }
  },
  watch:{
    selectedCountry:function(){
      this.refreshHeroes();
    }
  },
  mounted:function(){
      this.refreshHeroes();    
  }
}
</script>