<template>
    <header id="Header" class="header">
        <img class="header-logo" src="src/assets/marvel.svg" alt="">
        <div class="header-search">
          <input type="text" class="header-search-input" placeholder="Search character...">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
    </header>
</template>
<script>
export default {
    name: 'menu-marvel'
}
</script>
<style lang="stylus">
::-webkit-input-placeholder /* Chrome/Opera/Safari */
  color: #b4b4b4;

::-moz-placeholder  /* Firefox 19+ */
  color: #b4b4b4;

:-ms-input-placeholder  /* IE 10+ */
  color: #b4b4b4;

:-moz-placeholder  /* Firefox 18- */
  color: #b4b4b4;
*
  box-sizing: border-box
body
  margin 0
  font-size: 16px
  font-family 'Roboto'
  background: #f4f4f4
.header
  display flex
  align-items: center
  padding: 1em 1em;
  position: relative
  min-height: 60px
  width: 100%
  justify-content: center
  background: #2d2727
  box-shadow: 2px 4px 8px 1px #b1b1b1;
  &-logo
    max-height 60px
    position: absolute
    left: 0
    max-width 150px
    margin-left: 2em;    
  &-search
    position relative
    max-width: 610px
    width: 100%
    &-input
      font-family 'Roboto'
      font-size 20px
      margin: 0
      padding: 0 1em
      height: 50px
      width: 100%
      border-radius: .2em
      border: 0
    i
      position: absolute;
      right: .5em;
      top: .5em;
      font-size: 1.5em;
      color: #b4b4b4;
@media screen and (max-width: 1050px)
  .header
    flex-direction: column
    &-logo
      position: relative
      margin: 0 0 1em 0;
    


</style>