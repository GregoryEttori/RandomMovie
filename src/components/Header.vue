<template>

<div>
  <ul>
      <router-link v-if="!getIsLogged" to="/login" tag="li" active-class="active" exact><a>Login</a></router-link>
      <router-link v-if="!getIsLogged" to="/signup" tag="li" active-class="active"><a>Sign Up</a></router-link>
  </ul>

  <div v-if="getIsLogged" class="RandomMovieButton" @click="logOut">Logout</div>
</div>

</template>

<script>
import {mapGetters} from 'vuex';
import axios from 'axios';

export default {
  name: "Header.vue",
  computed: {
    ...mapGetters([
      'getIsLogged'
    ])
  },
  methods: {
    logOut() {
      axios.post('http://192.168.1.13:3000/logout')
          .then(response => {
            this.$router.push(response.data.path).catch(()=>{});
            this.$store.commit('setIsLogged', response.data.isLogged);
          })
          .catch(err => console.log(err))

    },
  }
}
</script>

<style scoped>

</style>