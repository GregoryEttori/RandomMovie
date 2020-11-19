<template>
<div class="profile">
  <div class="profile__header">
    <div class="profile__header--icon"></div>
    <div class="profile__title--name">{{getUserInfos.name}}</div>
    <div class="profile__header--email">{{getUserInfos.email}}</div>
  </div>

  <div class="general__title profile__title">WISHLIST</div>

  <div class="profile__wishlist" >
    <div v-for="film in getWishList" :key="film.id">
      <img
          :src="'https://image.tmdb.org/t/p/w500/'+ film.poster_path"
          :alt=film.title
          class="profile__wishlist--image"
          @click="movieContent(film.filmId.toString())"
      >
        <modal :name="film.filmId.toString()" :width="600"
               height="auto"
               :adaptive="true"
               :scrollable="true"
        >
          <div class="profile__wishlist--content">
            <div class="movieContent__infos">
              <div v-if="film.title" class="movieContent__infos--title">{{film.title.toUpperCase()}}</div>
              <div class="movieContent__infos--year">({{film.year}})</div>
              <hr>
              <div class="movieContent__infos--overview">{{film.overview}}</div>
            </div>

            <div class="profile__alignButton">
            <div class="profile__button--deleteFilm" @click="deleteMovie(film.filmId)">Delete</div>
            </div>

          </div>
          <img
              :src="'https://image.tmdb.org/t/p/w500/'+ film.poster_path"
              :alt=film.title
              class="profile__wishlist--content--background"
          >
        </modal>

    </div>

  </div>

  <div class="profile__alignButton">
    <div class="profile__button--deleteAccount" @click="deleteUser(getUserInfos)">Delete my account</div>
  </div>


</div>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from "axios";

export default {
name: "Profile",
  data() {
  return {
    isClicked: false,
    deleteMovieConfirmation: ""
  }
  },
  computed: {
  ...mapGetters([
      'getUserInfos',
      'getWishList'
  ])
  },
  methods: {
  deleteUser(userInfo){
    let message = {
      title: "Delete Account",
      body: "Are you sure you want to delete your account and loose all your data ?"
    };
    let options = {
      okText: 'Delete',
      cancelText: 'Close',
    }
    this.$dialog
        .confirm(message, options)
        .then(function() {
          console.log('Clicked on proceed');
          axios.post("http://192.168.1.19:3000/delete-user", userInfo )
              .then(response => {
                console.log(response.data.message);
                this.$store.commit('setUserInfos', {data: {
                    name : "",
                    email: ""
                  }
                })
                this.$store.commit('setIsLogged', false);
                this.$store.commit('setWishList', []);
                this.$router.push(response.data.path);
              })
              .catch(err => console.log(err))
        })
        .catch(function() {
          console.log('Clicked on cancel');
        });
    },
    deleteMovie(filmId){
      console.log(filmId);
      axios.post("http://192.168.1.19:3000/user-actions/delete-movie", {data: {filmId}} )
          .then(response => {
            console.log(response.data);
            this.$store.commit('setWishList', response.data.wishList);
            this.deleteMovieConfirmation = response.data.message;
            this.$toasted.error(response.data.message,{
              theme: "bubble",
              position: "bottom-left",
              duration : 2000,
              className: "filmDeleted",
            });
      })
          .catch(err => console.log(err))
    },
    movieContent(filmId){
      this.$modal.show(filmId.toString());
    }
  }
}


</script>

<style lang="scss">
.profile{
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 54px 70px 45px 70px;
  height: 100%;
  box-sizing: border-box;


  &__header{

    display: flex;
    flex-direction: column;
    align-items: center;

    &--email{
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: #011F3B;
    }

    &--icon{
      background-image: url("../../public/img/profileIcon.png");
      background-repeat: round;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      opacity: 40%;
    }

  }

  &__title{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 80px 0 50px 0;

    &--name{
      text-align: center;
      font-style: normal;
      font-weight: 900;
      font-size: 38px;
      line-height: 31px;
      color: #5E81F4;
      cursor: default;
      text-transform: uppercase;
      margin-top: -20px;
      z-index: 1;
    }
  }

  &__wishlist{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 80px;


    &--image{
      display: flex;
      position: relative;
      width: 220px;
      border-radius: 10px;
      content: "";
      background-size: cover;
      background-repeat: no-repeat;
      margin: 0 21px 30px 0;
    }

    &--content{
      padding: 40px;
      position: relative;
      z-index: 2;
      overflow: hidden;

      &--background{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        margin-top: -200px;
        opacity: 15%;
      }
    }
  }

  &__button{
    &--deleteAccount{
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 21px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      width: 200px;
      height: 62px;
      border-radius: 57px;
      background: #FE6969;
      padding: 0 50px 0 50px;

      &:hover {
        transform: scale(1.03);
      }
    }

    &--deleteFilm{
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 21px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      width: 130px;
      height: 50px;
      border-radius: 57px;
      background: #FE6969;
      padding: 0 50px 0 50px;

      &:hover {
        transform: scale(1.03);
      }
    }
  }

  &__alignButton{
    display: flex;
    justify-content: center;
  }

  .movieContent__infos{
    margin-right: 0;
  }


}
</style>