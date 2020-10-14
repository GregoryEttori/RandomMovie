<template>
<div>
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
        'getIsLogged'
    ])
  }
}
</script>

<style scoped>

</style>