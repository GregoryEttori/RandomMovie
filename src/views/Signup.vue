<template>
  <div class="user__register">

    <div class="general__title">SIGN UP</div>
    <div class="user__register--form">
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
    </div>


    <div class="user__register--submit" @click="submitRegister"> Validate </div>

    <span class="input input--minoru">
					<input class="input__field input__field--yoko" type="text" id="input-16" />
					<label class="input__label input__label--yoko" for="input-16">
						<span class="input__label-content input__label-content--yoko">Street</span>
					</label>
				</span>

  </div>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';
import axios from 'axios';
import 'src/classie.js'

import classie from 'src/classie.js';

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
  },
  mounted() {
    (function() {
      // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
      if (!String.prototype.trim) {
        (function() {
          // Make sure we trim BOM and NBSP
          let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
          String.prototype.trim = function() {
            return this.replace(rtrim, '');
          };
        })();
      }

      [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
        // in case the input is already filled..
        if( inputEl.value.trim() !== '' ) {
          classie.add( inputEl.parentNode, 'input--filled' );
        }

        // events:
        inputEl.addEventListener( 'focus', onInputFocus );
        inputEl.addEventListener( 'blur', onInputBlur );
      } );

      function onInputFocus( ev ) {
        classie.add( ev.target.parentNode, 'input--filled' );
      }

      function onInputBlur( ev ) {
        if( ev.target.value.trim() === '' ) {
          classie.remove( ev.target.parentNode, 'input--filled' );
        }
      }
    })();
  }
}



</script>

<style lang="scss">
.user{
  &__register{
    display: flex;
    flex-direction: column;
    padding: 130px 50px;
    width: 100%;

    &--form{

    }

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

/* Yoko */
.input__field--yoko {
  z-index: 10;
  width: 100%;
  background: transparent;
  color: #f5f5f5;
  opacity: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}

.input__label--yoko {
  position: relative;
  width: 100%;
  color: #b04b40;
  text-align: left;
}

.input__label--yoko::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 4em;
  background: #c5564a;
  -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, 90deg);
  transform: perspective(1000px) rotate3d(1, 0, 0, 90deg);
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}

.input__label--yoko::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.25em;
  background: #ad473c;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}

.input__label-content--yoko {
  padding: 0.75em 0;
}

.input__field--yoko:focus,
.input--filled .input__field--yoko {
  opacity: 1;
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}

.input__field--yoko:focus + .input__label--yoko::before,
.input--filled .input__label--yoko::before {
  -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, 0deg);
  transform: perspective(1000px) rotate3d(1, 0, 0, 0deg);
}

.input__field--yoko:focus + .input__label--yoko,
.input--filled .input__label--yoko {
  pointer-events: none;
}

.input__field--yoko:focus + .input__label--yoko::after,
.input--filled .input__label--yoko::after {
  -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, -90deg);
  transform: perspective(1000px) rotate3d(1, 0, 0, -90deg);
}

</style>