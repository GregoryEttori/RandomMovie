<template>
  <div class="randomMovie">
    <div class="randomMovie__welcome" :class="getIsLogged ? 'main__withPadding' : ''" v-if="!displayMovieInfos">
      <div class="general__title">DON'T KNOW WHAT TO WATCH ?</div>
      <div class="user__submit" @click="submitForm">FIND A MOVIE !</div>
    </div>

    <div v-if="displayMovieInfos">
      <MovieInfos></MovieInfos>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import MovieInfos from "@/components/MovieInfos";
import submitNext from "@/mixins/submitNext";

export default {
  name: "RandomButton",
  components: { MovieInfos },
  data(){
    return{
      moviesContent: {},
      displayMovieInfos: false,
      showUserInfos: false,
      filter: null,
      selectedMovieEra: "",
    }
  },
  computed: {
    ...mapGetters([
      'getMovieContent',
      'getMovieGenres',
      'getIsLogged',
      'getGenresSelected',
      'getEraSelected'
    ]),
  },
  mixins: [submitNext]
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

</script>

<style lang="scss">
.randomMovie{
  display: flex;
  flex: 1;
  justify-content: center;

  &__welcome{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__withPadding{
      padding-top: 144px;
    }
  }

  &__container{
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 54px 0 45px;
  }

  &__next{
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
    background: #5E81F4;
    padding: 0 50px 0 50px;
  }
}


.main{


}

.general{
  &__title{
    font-size: 46px;
    line-height: 44px;
    cursor: default;
  }
}

</style>