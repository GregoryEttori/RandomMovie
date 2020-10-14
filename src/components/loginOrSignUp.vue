<template>
  <div>
    <div class="user__login" v-if="!showRegisterForm">
      <div>
        <label for="login_email">Email</label>
        <input id="login_email" type="text" v-model="userForm.email">
      </div>
      <div>
        <label for="login_password">Password</label>
        <input id="login_password" type="password" v-model="userForm.password">
        <div v-if="passwordError">Invalid Password</div>
      </div>

      <div class="user__login--submit" @click="submitLogin"> Validate </div>
    </div>

    <!--<div class="user__register" v-if="showRegisterForm">

      <div class="user__register&#45;&#45;field" :class="{invalid: $v.registerForm.name.$error && $v.registerForm.name.required}">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="registerForm.name" @blur="$v.registerForm.name.$touch()">
        <div v-if="isSubmitted">
          <div class="user__register&#45;&#45;field invalid" v-if="!$v.registerForm.name.required"> Field is required. </div>
        </div>

      </div>
      <div class="user__register&#45;&#45;field" :class="{invalid: $v.registerForm.email.$error && $v.registerForm.email.required}">
        <label for="email">Email</label>
        <input id="email" type="text" v-model="registerForm.email" @blur="$v.registerForm.email.$touch()">
        <div v-if="isSubmitted">
          <div class="user__register&#45;&#45;field invalid" v-if="!$v.registerForm.email.required"> Field is required. </div>
          <div class="user__register&#45;&#45;field invalid" v-if="!$v.registerForm.email.email"> Email must be valid. </div>
        </div>
      </div>
      <div class="user__register&#45;&#45;field" :class="{invalid: $v.registerForm.password.$error && $v.registerForm.password.required}">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="registerForm.password" @blur="$v.registerForm.password.$touch()">
        <div class="user__register&#45;&#45;field invalid" v-if="!$v.registerForm.password.minLength"> Password length must be at least 8 characters. </div>
        <div v-if="isSubmitted">
          <div class="user__register&#45;&#45;field invalid" v-if="!$v.registerForm.password.required"> Field is required. </div>
          <div class="user__register&#45;&#45;field invalid" v-if="!$v.registerForm.password.minLength"> Password length must be at least 8 characters. </div>
        </div>
      </div>
      <div class="user__register&#45;&#45;field" :class="{invalid: $v.registerForm.password_confirmation.$error && $v.registerForm.password_confirmation.required}">
        <label for="password_confirmation">Confirm your Password</label>
        <input id="password_confirmation" type="password" v-model="registerForm.password_confirmation" @blur="$v.registerForm.password_confirmation.$touch()">
        <div v-if="isSubmitted">
          <div class="user__register&#45;&#45;field invalid" v-if="!$v.registerForm.password_confirmation.sameAs"> Password must match. </div>
        </div>
      </div>

      <div class="user__register&#45;&#45;submit" @click="submitRegister"> Validate </div>
      <div class="user__login&#45;&#45;switch" @click="switchForm">Back to the login Page</div>
      <div class="user__login&#45;&#45;switch" @click="resetPassword">Reset Password</div>
    </div>-->
  </div>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
name: "loginOrSignUp",
  data(){
    return{
      userForm: {
        email: null,
        password: null,
      },
      /*registerForm: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },*/
      //showRegisterForm: false,
      isSubmitted: false,
      passwordError: false,
    }
  },
  methods: {
    switchForm(){
      this.showRegisterForm = !this.showRegisterForm;
    },
    submitRegister(){
      this.isSubmitted = true;
      if(!this.$v.registerForm.$invalid){
        axios.post('http://192.168.1.13:3000/signup', this.registerForm
        ).then().catch();
      }
      else{
        console.log("formulaire mal rempli");
      }

    },
    submitLogin(){
      axios.post('http://192.168.1.13:3000/login', this.userForm
      ).then(response => {
        console.log(response.data);
        if(response.data.token){
          localStorage.setItem('user', JSON.stringify(response.data.token));
        }
        this.$store.commit('setUserInfos', {data: response.data, logged: true})
      }).catch(err => {
        console.log(err);
        this.passwordError = true
      });
    },
  },
  validations: {
    registerForm:{
      name: {required},
      email: {required, email},
      password: {required, minLength: minLength(8)},
      password_confirmation: {required, sameAs: sameAs('password')}
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

