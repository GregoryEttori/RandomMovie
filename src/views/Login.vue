<template>
  <div class="user__login">
    <div v-if="isError">{{ errorText }}</div>
    <div>
      <label for="login_email">Email</label>
      <input id="login_email" type="text" v-model="userForm.email">
      <div v-if="isSubmitted">
        <div class="user__login--field invalid" v-if="!$v.loginForm.email.required"> Field is required. </div>
        <div class="user__login--field invalid" v-if="!$v.loginForm.email.email"> Email must be valid. </div>
      </div>
    </div>
    <div>
      <label for="login_password">Password</label>
      <input id="login_password" type="password" v-model="userForm.password">
      <div v-if="isSubmitted">
        <div class="user__login--field invalid" v-if="!$v.loginForm.password.required"> Field is required. </div>
      </div>

    </div>
    <div class="user__login--submit" @click="submitLogin"> Validate </div>
    <div class="user__login--submit" @click="resetPassword"> Forgot your password ? Reset your password !</div>
  </div>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators';
import axios from "axios";

export default {
  name: "Login",
  data(){
    return {
      userForm: {
        email: null,
        password: null,
      },
      isSubmitted: false,
      isError: false,
      emailError: false,
      errorMessage : ""
    }
  },
  methods: {
    submitLogin(){
      this.isSubmitted = true;
      axios.post('http://192.168.1.13:3000/login', this.userForm
      ).then(response => {
        console.log(response.data);
        this.$router.push(response.data.path);
        this.$store.commit('setUserInfos', {data: {
            name : response.data.name,
            email: response.data.email
          }, logged: true})
      }).catch(err => {
        this.isError = true;
        console.log("Submit register error : ", err.response);
        this.errorMessage = err.response.data.errorMessage;
      });
    },
    resetPassword(){
      this.$router.push('/reset');
    }
  },
  computed: {
    errorText(){
      return this.errorMessage;
    }
  },
  validations: {
    loginForm:{
      email: {required, email},
      password: {required}
    }
  }
}
</script>

<style lang="scss">
.user{
  &__login{
    &--field {
      &.invalid{
        input{
          border: 1px solid red;
          background-color: red;
          color: white;
        }

      }
    }
    &--submit{
      border: 2px solid green;
      border-radius: 10px;

      &:hover{
        background-color: green;
        color: white;
      }
    }
  }
}
</style>