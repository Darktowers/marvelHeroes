<template>
  <div id="app">
    <spinner v-show="loading"></spinner>
    <paginate v-if="!loading"
      name="languages"
      :list="langs"
      :per="2"
    >
      <li v-for="lang  in paginated('languages')">
        {{ lang  }}
      </li>
    </paginate>
    <paginate-links for="languages" :async="true" ></paginate-links>
  </div>
</template>
<script>
import Spinner from './components/Spinner.vue'
import Artist from './components/Artist.vue'
import getArtists from './api'
export default {
  name: 'app',
  data () {
    return {
      loading:true,
      langs: ['JavaScript', 'PHP', 'HTML', 'CSS', 'Ruby', 'Python', 'Erlang'],
      paginate: ['languages']
    }
  },
  components:{
    Spinner
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>

<style lang="stylus">
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  .artistas
    display flex
    align-items center
    flex-wrap wrap
    justify-content space-around


h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
