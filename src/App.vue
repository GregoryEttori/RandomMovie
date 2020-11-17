<template>
  <div id="app">

      <Header></Header>

    <div class="app__contain">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header";
import {mapGetters} from 'vuex';
import axios from "axios";

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
  mounted(){
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' +process.env.VUE_APP_API_MOVIE_KEY
        +'&language=en-US%2C%20FR&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=6&without_genres=99',
        {withCredentials: false})
        .then(response => (this.moviesContent = response.data))
        .catch(err => console.error(err))
    this.$store.dispatch('fetchMovieGenres');
  }
}
</script>

<style lang="scss">

@import '~reset.css/reset.css';


#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;

}

.app__contain{
    margin-left: 320px;
    min-height: 100vh;
    flex: 1;
}

.general{
  &__title{
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 81px;
    font-style: normal;
    font-weight: 900;
    font-size: 64px;
    line-height: 77px;
    color: #5E81F4;
    cursor: default;
  }
}

.regularText {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #011F3B;
  cursor: default;
}


body{
  background-color: #F5F5FB;
}

@media screen and (max-width: 1200px){
  .app__contain{
    margin-left: 0;
  }
}

</style>
