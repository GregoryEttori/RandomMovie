<template>
  <div class="user__register">
    <div v-if="isError"> {{ errorText }}</div>
    <div class="user__register--field" :class="{invalid: $v.registerForm.name.$error && $v.registerForm.name.required}">
      <label for="name">Name</label>
      <input id="name" type="text" name="name" v-model="registerForm.name" @blur="$v.registerForm.name.$touch()">
      <div v-if="isSubmitted">
        <div class="user__register--field invalid" v-if="!$v.registerForm.name.required"> Field is required. </div>
      </div>

    </div>
    <div class="user__register--field" :class="{invalid: $v.registerForm.email.$error && $v.registerForm.email.required}">
      <label for="email">Email</label>
      <input id="email" type="text" name="email" v-model="registerForm.email" @blur="$v.registerForm.email.$touch()">
      <div v-if="isSubmitted">
        <div class="user__register--field invalid" v-if="!$v.registerForm.email.required"> Field is required. </div>
        <div class="user__register--field invalid" v-if="!$v.registerForm.email.email"> Email must be valid. </div>
      </div>
    </div>
    <div class="user__register--field" :class="{invalid: $v.registerForm.password.$error && $v.registerForm.password.required}">
      <label for="password">Password</label>
      <input id="password" type="password" name="password" v-model="registerForm.password" @blur="$v.registerForm.password.$touch()">
      <div class="user__register--field invalid" v-if="!$v.registerForm.password.minLength"> Password length must be at least 8 characters. </div>
      <div v-if="isSubmitted">
        <div class="user__register--field invalid" v-if="!$v.registerForm.password.required"> Field is required. </div>
        <div class="user__register--field invalid" v-if="!$v.registerForm.password.minLength"> Password length must be at least 8 characters. </div>
      </div>
    </div>
    <div class="user__register--field" :class="{invalid: $v.registerForm.passwordConfirmation.$error && $v.registerForm.passwordConfirmation.required}">
      <label for="passwordConfirmation">Confirm your Password</label>
      <input id="passwordConfirmation" type="password" v-model="registerForm.passwordConfirmation" @blur="$v.registerForm.passwordConfirmation.$touch()">
      <div v-if="isSubmitted">
        <div class="user__register--field invalid" v-if="!$v.registerForm.passwordConfirmation.sameAs"> Password must match. </div>
      </div>
    </div>

    <div class="user__register--submit" @click="submitRegister"> Validate </div>
  </div>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: "Signup",
  data(){
    return {
      registerForm: {
        name: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      },
      isSubmitted: false,
      isError: false,
      errorMessage : ""
    }
  },
  methods: {
    submitRegister(){
      console.log(this.registerForm);
      this.isSubmitted = true;
      if(!this.$v.registerForm.$invalid){
        axios.post('http://192.168.1.13:3000/signup', this.registerForm
        )
            .then(response => {
              console.log("Submit register response : ",response);
              this.$router.push(response.data);
            })
            .catch(err => {
              this.isError = true;
              console.log("Submit register error : ", err.response);
              this.errorMessage = err.response.data.errorMessage;
            });
      }
      else{
        console.log("The form is not correct");
      }

    },
  },
  computed: {
    errorText(){
      return this.errorMessage;
    }
  },
  validations: {
    registerForm:{
      name: {required},
      email: {required, email},
      password: {required, minLength: minLength(8)},
      passwordConfirmation: {required, sameAs: sameAs('password')}
    }
  }
}
</script>

<style lang="scss">
.user{
  &__register{
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