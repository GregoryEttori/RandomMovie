<template>
    <div v-if="getMovieContent">
      <div>
        <img :src="'https://image.tmdb.org/t/p/w500/'+ getMovieContent.poster_path" :alt=getMovieContent.title>
      </div>
      <div>{{getMovieContent.title}}</div>
      <div>{{year}}</div>
      <div>{{getMovieContent.overview}}</div>
      <div>Vote average: {{getMovieContent.vote_average}}</div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "MovieInfos",
  computed: {
    ...mapGetters([
      'getMovieContent'
    ]),
    year(){
      if(this.getMovieContent.release_date){
        return this.getMovieContent.release_date.split("-")[0];
      }
      return "";

    }
  },
}
</script>

<style lang="scss">

</style>