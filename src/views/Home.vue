<template>
<div class="randomMovie__container">
  <div class="loginTop" v-if="getIsLogged">
    <div class="regularText loginTop__space">{{getUserInfos.name}}</div>
    <router-link to="/profile" tag="div" active-class="active" class="profileIcon"></router-link>
  </div>
  <RandomMovie></RandomMovie>
</div>
</template>

<script>

import RandomMovie from "@/components/RandomMovie";
import {mapGetters} from 'vuex';

export default {
  name: "Home",
  components: {
  RandomMovie
  },
  computed: {
    ...mapGetters([
        'getIsLogged',
        'getMovieGenres',
        'getUserInfos'
    ])
  },
  methods: {
    toProfilePage(){

    }
  }
}
</script>

<style lang="scss">
.profileIcon{
  background-image: url("../../public/img/cthulhu.png");
  background-repeat: no-repeat;
  width: 61px;
  height: 61px;
  border-radius: 50%;
  cursor: pointer;
}

.loginTop{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 77px;
  margin-bottom: 50px;
  padding: 0 70px 0 70px;

  &__space{
    margin-right: 20px;
  }

}

</style>