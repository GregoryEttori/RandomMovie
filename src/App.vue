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
@import "~vuejs-dialog/dist/vuejs-dialog.min.css";
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

.dg-content-body{
  border-bottom: none !important;
  text-align: center;
}

.dg-content-cont {
  font-family: Inter, Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #011F3B;
  cursor: default;
}

.dg-main-content{
  //changer le fond du alert
  max-width: 346px;
  height: 230px;
  border-radius: 20px !important;
  padding: 40px !important;
}

.dg-content-footer {
  position: relative;
  padding: 20px 0 0;
}

.dg-content{
  //changer font
  font-family: Inter, Helvetica, Arial, sans-serif !important;
  color: #9b9ea1;
}

.dg-title{
  font-family: Inter, Helvetica, Arial, sans-serif !important;
}

.dg-btn--cancel{
  color: #fefefe !important;
  background-color: #c2d4ef !important;
}

.dg-btn{
  font-family: Inter, Helvetica, Arial, sans-serif !important;
  font-weight: 500 !important;
  border-radius: 30px !important;
  min-width: 130px !important;
  min-height: 40px !important;

  &:hover{
    transform: scale(1.03);
  }
}

.dg-btn--ok{
  color: #f5f5f5 !important;
  background-color: #e64a3e !important;
  border-color: #e64a3e !important;
}

.vm--modal{
  border-radius: 30px !important;
  height: auto !important;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  font-family: Inter, Helvetica, Arial, sans-serif !important;
  font-weight: 500 !important;

  .tooltip-inner {
    background: rgba(94,129,244, 0.4);
    color: white;
    border-radius: 16px;
    padding: 10px 15px 9px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    border-color: rgba(94,129,244, 0.4);
    position: absolute;
    margin: 5px;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 15px;
    margin-right: 110px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #5E81F4;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}

.filmAdded{
  font-family: Inter, Helvetica, Arial, sans-serif !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  margin-bottom: 73px !important;
  margin-left: 400px !important;
}

.filmDeleted{
  font-family: Inter, Helvetica, Arial, sans-serif !important;
  font-weight: 500 !important;
  font-size: 14px !important;
}

.loginError{
  font-family: Inter, Helvetica, Arial, sans-serif !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  margin-left: 320px !important;

}

@media screen and (max-width: 1200px){
  .app__contain{
    margin-left: 0;
  }
}

</style>
