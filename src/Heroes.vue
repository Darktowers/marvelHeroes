<template>
    <div id="heroes">
        <h1>Heroes</h1>
        <div class="hero" v-for="hero in heroes">
            <h3>{{hero.name}}</h3>
            <img :src="hero.thumbnail.path+'.'+hero.thumbnail.extension" alt="">
        </div>
    </div>
</template>
<style lang="stylus">
#heroes
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
      loading:true
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
        getHeroes()
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