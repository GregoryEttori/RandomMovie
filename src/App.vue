<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {mapGetters} from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'getIsLogged',
    ])
  },
   components: {
      Header
    },
}
</script>

<style lang="scss">
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}

.general{
  &__title{
    display: flex;
    justify-content: center;

    font-style: normal;
    font-weight: 900;
    font-size: 64px;
    line-height: 77px;
    color: #5E81F4;
  }
}

body{
  background-color: #F5F5FB;
}
</style>
