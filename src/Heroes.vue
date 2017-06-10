<template>
    <div id="heroes">
        <h1>Heroes</h1>
        <spinner v-show="loading"></spinner>
        <paginate v-if="!loading"
          name="heroesComp"
          :list="heroes"
          :per="10"
          tag="div"
          class="heroesContainer"
        >
          <div class="hero" v-for="hero in paginated('heroesComp')">
              <h3>{{hero.name}}</h3>
              <img :src="hero.thumbnail.path+'.'+hero.thumbnail.extension" alt="">
          </div>
        </paginate>
        <paginate-links for="heroesComp" :async="true" ></paginate-links>
    </div>
</template>
<style lang="stylus">
#heroes
  .heroesContainer
    display flex
    flex-wrap: wrap
    justify-content: space-around;
    .hero
      img
        max-width 400px
        width 100%

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