<template>
    <div class="movieContent" v-if="getMovieContent">

      <div class="movieContent__infos">
        <div v-if="getMovieContent.title" class="movieContent__infos--title">{{getMovieContent.title.toUpperCase()}}</div>
        <div class="movieContent__infos--year">({{year}})</div>
        <hr>
        <div class="movieContent__infos--overview">{{getMovieContent.overview}}</div>

        <div class="movieContent__actions">
          <div class="randomMovie__next" @click="submitForm">NEXT !</div>
          <div v-if="getIsLogged" class="movieContent__actions--buttonAddFilm" @click="addToWishlist"
               v-tooltip="{
                content: msg,
                placement: 'top-center',
                classes: ['info'],
                targetClasses: ['it-has-a-tooltip'],
                delay: {
                  show: 300,
                },
              }">
            +
          </div>
        </div>
      </div>

      <div v-if="getMovieContent.poster_path" class="movieContent__image">
        <img :src="'https://image.tmdb.org/t/p/w500/'+ getMovieContent.poster_path"
             :alt=getMovieContent.title
             class="movieContent__image--fit">
      </div>


    </div>
</template>

<script>
import axios from 'axios';

import {mapGetters} from 'vuex';
import submitNext from "@/mixins/submitNext";

export default {
  name: "MovieInfos",
  data(){
    return {
      msg: "Add to your wishlist"
    }
  },
  computed: {
    ...mapGetters([
      'getMovieContent',
      'getMovieGenres',
      'getIsLogged',
      'getGenresSelected',
      'getEraSelected',
      'getUserInfos'
    ]),
    year(){
      if(this.getMovieContent.release_date){
        return this.getMovieContent.release_date.split("-")[0];
      }
      return "";
    }
  },
  methods: {
    addToWishlist(){
      const payload = {
        filmId: this.getMovieContent.id,
        title: this.getMovieContent.title,
        year: this.year,
        overview: this.getMovieContent.overview,
        poster_path: this.getMovieContent.poster_path
      }
      console.log(payload);
      axios.post('http://192.168.1.19:3000/user-actions/add-to-wishlist', payload ).then(response => {
        this.$store.commit('setWishList', response.data.wishlist);
        console.log(response.data.message);
        console.log(response.data.wishlist);
        this.$toasted.success("Film added to your profile",{
          theme: "bubble",
          position: "bottom-center",
          duration : 2000,
          className: "filmAdded",
        });
      }).catch(error => console.log(error));
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

  &__actions{
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--buttonAddFilm{
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 27px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      width: 61px;
      height: 61px;
      border-radius: 50%;
      background: #5E81F4;

      &:hover {
        transform: scale(1.03);
      }
    }
  }

}
</style>