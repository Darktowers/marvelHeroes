<template>
  <div class="Main">
    <router-view></router-view>
  </div>
</template>
<script>
import Spinner from './components/Spinner.vue'
export default {
  name: 'Main',
  components:{
    Spinner
  }
}
</script>