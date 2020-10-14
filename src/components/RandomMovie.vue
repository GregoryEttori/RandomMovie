<template>
  <div>
    <MovieInfos v-if="displayMovieInfos"></MovieInfos>

    <label for="movieGenre"> Movie Genre </label>
    <select
        id="movieGenre"
        v-model="selectedMovieGenre">
      <option v-for="movieGenre in getMovieGenres" :key="movieGenre.name">
        {{movieGenre.name}}
      </option>
    </select>
    <label for="era"> Era </label>
    <select
        id="era"
        v-model="selectedMovieEra">
      <option v-for="era in movieEra" :key="era">
        {{era}}
      </option>
    </select>
    <div class="RandomMovieButton" @click="submitForm">Submit</div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import MovieInfos from "@/components/MovieInfos";

export default {
  name: "RandomButton",
  components: { MovieInfos },
  data(){
    return{
      moviesContent: {},
      displayMovieInfos: false,
      showUserInfos: false,
      filter: null,
      selectedMovieGenre: "",
      movieEra: ["50's","60's","70's","80's", "90's", "2000's", "2010's"],
      selectedMovieEra: "",
    }
  },
  computed: {
    ...mapGetters([
      'getMovieContent',
      'getMovieGenres',
      'getIsLogged'
    ]),
  },
  methods: {

    submitForm(){
      let startingDate = null;
      let endingDate = null;

      let genreId = this.getMovieGenres.find((genre) => {
        if(genre.name === this.selectedMovieGenre)
          return true;
      });

      switch (this.selectedMovieEra){
        case "50's":
          startingDate = "1950-01-01";
          endingDate = "1959-12-31";
          break;
        case "60's":
          startingDate = "1960-01-01";
          endingDate = "1969-12-31";
          break;
        case "70's":
          startingDate = "1970-01-01";
          endingDate = "1979-12-31";
          break;
        case "80's":
          startingDate = "1980-01-01";
          endingDate = "1989-12-31";
          break;
        case "90's":
          startingDate = "1990-01-01";
          endingDate = "1999-12-31";
          break;
        case "2000's":
          startingDate = "2000-01-01";
          endingDate = "2009-12-31";
          break;
        case "2010's":
          startingDate = "2010-01-01";
          endingDate = "2019-12-31";
          break;
      }
      const payload = {
        genre: genreId?.id,
        startingDate: startingDate,
        endingDate : endingDate
      };
      this.$store.dispatch('fetchMovieByYearRange', payload);
      this.displayMovieInfos = true;
    },
  },
  mounted(){
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' +process.env.VUE_APP_API_MOVIE_KEY +'&language=en-US%2C%20FR&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=6&without_genres=99')
        .then(response => (this.moviesContent = response.data))
        .catch(err => console.error(err))
    this.$store.dispatch('fetchMovieGenres');
  }
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

</script>

<style lang="scss">
.RandomMovieButton{
  background: red;
}
</style>