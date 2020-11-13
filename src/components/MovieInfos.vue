<template>
    <div class="movieContent" v-if="getMovieContent">

      <div class="movieContent__infos">
        <div v-if="getMovieContent.title" class="movieContent__infos--title">{{getMovieContent.title.toUpperCase()}}</div>
        <div class="movieContent__infos--year">({{year}})</div>
        <hr>
        <div class="movieContent__infos--overview">{{getMovieContent.overview}}</div>

        <div class="randomMovie__next" @click="submitForm">NEXT !</div>
      </div>

      <div v-if="getMovieContent.poster_path" class="movieContent__image">
        <img :src="'https://image.tmdb.org/t/p/w500/'+ getMovieContent.poster_path"
             :alt=getMovieContent.title
             class="movieContent__image--fit">
      </div>


    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import submitNext from "@/mixins/submitNext";

export default {
  name: "MovieInfos",
  computed: {
    ...mapGetters([
      'getMovieContent',
      'getMovieGenres',
      'getIsLogged',
      'getGenresSelected',
      'getEraSelected'
    ]),
    year(){
      if(this.getMovieContent.release_date){
        return this.getMovieContent.release_date.split("-")[0];
      }
      return "";
    }
  },
  mixins: [submitNext]
}
</script>

<style lang="scss">
.movieContent{
  display: flex;
  padding: 0 70px 0 70px;

  &__infos{
    display: flex;
    flex-direction: column;
    margin-right: 50px;

    &--title{
      text-align: left;
      font-style: normal;
      font-weight: 900;
      font-size: 46px;
      line-height: 45px;
      color: #5E81F4;
      cursor: default;
    }

    &--year{
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: #717171;
      margin-bottom: 10px;
      cursor: default;
    }

    &--overview{
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 26px;
      display: flex;
      text-align: justify;
      color: #011F3B;
      margin-bottom: 40px;
      flex: 1;
      cursor: default;
    }

    hr{
      width: 100%;
      border: 3px solid #5E81F4;
      margin-bottom: 30px;
    }

  }

  &__image{

    &--fit{
      display: flex;
      position: relative;
      width: 300px;
      height: 479px;
      border-radius: 10px;
      content: "";
      background-size: cover;
      background-repeat: no-repeat;

      img{
        width: 100%;
        object-fit: cover;
      }
    }

  }

}
</style>