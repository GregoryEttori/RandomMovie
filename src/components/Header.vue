<template>
  <div class="menu">
    <transition  name="slide" mode="out-in" type="animation">
      <div :class="selectMenu" v-if="!genreMenu && !eraMenu" key="general">
        <div  class="menu--general" >
          <div class="menu--title">
            <div class="menu--title__logo">
              <router-link to="/">
                <img src="../../public/img/film-roll.png" alt="logo">
              </router-link>
            </div>
            <div>RANDOM MOVIE</div>
          </div>
          <ul class="menu--categories">
            <li class="menu--categories__filter">Filters</li>
            <li @click="genresMenu">
              <a>Genres</a>
            </li>
            <ul v-if="genreSelection.length > 0" key="genreSelection" class="menu--selection">
              <li v-for="(genre, index) in genreSelection" :key="index" @click="clearGenre(genre)">{{genre}}</li>
            </ul>
            <!--<p v-if="genreSelection.length > 0" class="menu&#45;&#45;selection">{{genreSelection.toString()}}</p>-->
            <li @click="erasMenu">
              <a>Era</a>
            </li>
            <ul v-if="eraSelection" class="menu--selection" @click="closeEraMenu()">
              <li>{{eraSelection}}</li>
            </ul>
            <!--<p v-if="eraSelection">{{eraSelection}}</p>-->
          </ul>
          <ul class="menu--footer">
            <router-link v-if="!getIsLogged" to="/signup" tag="li" active-class="active"><a>Sign Up</a></router-link>
            <router-link v-if="!getIsLogged" to="/login" tag="li" active-class="active" exact><a>Login</a></router-link>
            <div v-if="getIsLogged" class="menu--categories__logOut" @click="logOut(getUserInfos)">Logout</div>
          </ul>
        </div>
      </div>

      <div v-else-if="genreMenu" class="menu--genres__content" key="genres">
        <div class="menu--genres__header">
          <div class="menu--close" @click="closeMenu">
            <a>CLEAR</a>
          </div>
          <div class="menu--ok" @click="selectedGenre()">
            <a>OK</a>
          </div>
        </div>

        <div v-for="genre in getMovieGenres" :key="genre.id">
          <input type="checkbox" :name="genre.id" :id="genre.id" :value="genre.name" v-model="genreSelection" :disabled="genreSelection.length > 2 && genreSelection.indexOf(genre.name) === -1"/>
          <label :id="genre.id" :for="genre.id">{{genre.name}}</label>
        </div>
      </div>

      <div v-else-if="eraMenu" class="menu--genres__content" key="era">
        <div class="menu--genres__header">
          <div class="menu--close" @click="closeEraMenu">
            <a>CLEAR</a>
          </div>
          <div class="menu--ok" @click="selectedEra()">
            <a>OK</a>
          </div>
        </div>

        <div v-for="era in eras" :key="era">
          <input type="radio" :name="era" :id="era" :value="era" v-model="eraSelection" />
          <label :id="era" :for="era">{{era}}</label>
        </div>
      </div>
    </transition>
  </div>



</template>

<script>
import {mapGetters} from 'vuex';
import axios from 'axios';

export default {
  name: "Header.vue",
  data(){
    return {
      genreSelection: [],
      eraSelection: "",
      genreMenu: false,
      eraMenu: false,
      eras : ["50's", "60's", "70's", "80's", "90's", "2000's", "2010's"]
    }
  },
  computed: {
    ...mapGetters([
      'getIsLogged',
      'getMovieGenres',
      'getUserInfos'
    ]),
    selectMenu(){
      if(this.genreMenu){
        return 'menu--genres'
      }
      else if(this.eraMenu){
        return 'menu--genres'
      }
      else{
        return 'menu--struct'
      }
    },

  },
  methods: {
    logOut(userInfo) {
      axios.post('http://192.168.1.19:3000/logout', userInfo)
          .then(response => {
            console.log(this.$router);
            this.$router.push(response.data.path);
            this.$store.commit('setUserInfos', {data: {
                name : "",
                email: ""
              }, logged: response.data.isLogged})
          })
          .catch(err => console.log(err))
    },
    genresMenu(){
      this.genreMenu = !this.genreMenu;
    },
    closeMenu(){
      this.genreSelection = [];
      this.$store.commit('setGenresSelected',this.genreSelection);
    },
    closeEraMenu(){
      this.eraSelection = "";
      this.$store.commit('setEraSelected',this.eraSelection);
    },
    erasMenu(){
      this.eraMenu = !this.eraMenu;
    },
    selectedGenre(){
      this.genreMenu = !this.genreMenu;
      this.$store.commit('setGenresSelected',this.genreSelection);
    },
    selectedEra(){
      this.eraMenu = !this.eraMenu;
      this.$store.commit('setEraSelected',this.eraSelection);
    },
    clearGenre(genre){
      this.genreSelection = this.genreSelection.filter(item => item !== genre);
      this.$store.commit('setGenresSelected',this.genreSelection);
    }
  }
}
</script>

<style lang="scss">
  .menu{
    position: fixed;
    background-color: white;
    list-style-type: none;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    width: 320px;
    height: 100vh;
    color: #8DA1B5;
    cursor: default;
    overflow-y: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */


    a{
      cursor: pointer;
    }

    a:link{
      text-decoration: none;
      color: #8DA1B5;
    }

    a:visited {
      text-decoration: none;
      color: #8DA1B5;
    }

    a:hover {
      color: #011F3B;
    }

    a:active {
      color: #011F3B;
    }

    &--close{
      color: #011F3B;
      cursor: pointer;

      a:hover{
        color: crimson;
      }
    }

    &--ok{
      color: #011F3B;
      cursor: pointer;

      a:hover{
        color: forestgreen;
      }
    }

    &--general{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    &--selection{
      color: #5e81f4;

      li:hover{
        text-decoration-line: line-through;
      }
    }

    &--title{
      display: flex;
      flex-direction: row;
      align-items: center;
      font-style: normal;
      font-weight: 900;
      font-size: 36px;
      line-height: 44px;
      text-align: center;
      color: #5E81F4;

      &__logo{
        width: 73px;
        height: 77px;

        img {
          width: 73px;
          height: 77px;
          border-radius: 12px;
          transform: scaleX(-1);
        }
      }
    }

    &--struct{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      padding: 45px 20px;
      width: 100%;
    }

    &--slideHeight{
      height: 100%;
    }

    &--categories{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 50%;

      li {
        text-align: center;
      }

      &__logOut{
        cursor: pointer;

        &:hover{
          color: #011F3B;
        }
      }

    }

    &--footer{
      list-style-type: none;
      display: flex;
      justify-content: space-around;
    }

    &--genres{
      width: 320px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      list-style-type: none;
      font-style: normal;
      font-weight: 900;
      font-size: 25px;
      line-height: 36px;
      color: #011F3B;
      cursor: pointer;
      background-color: gold;
      padding: 60px 20px;

      &__header{
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 20px;
      }

      &__content{
        width: 320px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        list-style-type: none;
        font-style: normal;
        font-weight: 900;
        font-size: 25px;
        line-height: 36px;
        color: #011F3B;
        cursor: pointer;
        background-color: gold;
        padding: 30px 20px;

        input[type="checkbox"] {
          display: none;
        }

        input[type="checkbox"]:checked + * {
          color: #5E81F4;
        }

        input[type="checkbox"]:checked + :hover {
          color: #5E81F4;
          text-decoration-line: line-through;
        }


        label:hover{
          color: #5E81F4;
          cursor: pointer;
        }

        input[type="radio"] {
          display: none;
        }

        input[type="radio"]:checked + * {
          color: #5E81F4;
        }

      }
    }
  }

  .menu::-webkit-scrollbar {
    display: none;
  }

  .slide-enter{
    /*opacity: 0;*/
  }

  .slide-enter-active{
    animation: slide-in .5s ease-out forwards;
    /*transition: opacity 1s;*/
  }

  .slide-leave{

  }

  .slide-leave-active{
    animation: slide-out .5s ease-out forwards;
    /*transition: opacity 1s;
    opacity: 0;*/
  }

  @keyframes slide-in {
    from{
      transform: translateX(-320px);
    }
    to{
      transform: translateX(0);
    }
  }

  @keyframes slide-out {
    from{
      transform: translateX(0);
    }
    to{
      transform: translateX(-320px);
    }
  }

  @media screen and (max-width: 1200px){
    .menu{
      display: none;
    }
  }

</style>