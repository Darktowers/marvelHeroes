<template>
  <div class="Main">
    <menu-marvel></menu-marvel>
    <router-view></router-view>
  </div>
</template>
<script>
import MenuMarvel from './components/MenuMarvel.vue'
import Spinner from './components/Spinner.vue'

export default {
  name: 'Main',
  components:{
    MenuMarvel,
    Spinner
  }
}
</script>