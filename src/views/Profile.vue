<template>
<div class="profile">
  <div class="profile__header">
    <div class="profile__header--icon"></div>
    <div class="profile__title--name">{{getUserInfos.name}}</div>
    <div class="profile__header--email">{{getUserInfos.email}}</div>
  </div>

  <div class="general__title profile__title">WISHLIST</div>

  <div class="profile__wishlist">
      {{getWishList}}
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
  computed: {
  ...mapGetters([
      'getUserInfos',
      'getWishList'
  ])
  },
  methods: {
  deleteUser(userInfo){

     alert('Are you sure ?')

      axios.post("http://192.168.1.19:3000/delete-user", userInfo )
          .then(response => {
            console.log(response.data.message);
            this.$store.commit('setUserInfos', {data: {
                name : "",
                email: ""
              }, logged: false})
            this.$router.push(response.data.path);
          })
          .catch(err => console.log(err))
    }
  },
}


</script>

<style lang="scss">
.profile{
  display: flex;
  flex: 1;
  flex-direction: column;
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
    margin-bottom: 80px;
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
  }

  &__alignButton{
    display: flex;
    justify-content: center;
  }

}
</style>