<template>
  <div class="user__login">

    <div class="general__title">LOGIN</div>

    <div class="user__form user__login--form">

    <div class="user__errorMessage user__login--error"> {{isError ? errorMessage : ""}}</div>

    <Field
        :validation="$v.loginForm"
        :is-submitted="isSubmitted"
        field-name="email"
        fieldType="text"
        label="Email"
        v-model="loginForm.email"
    />

    <Field
        :validation="$v.loginForm"
        :is-submitted="isSubmitted"
        field-name="password"
        fieldType="password"
        label="Password"
        v-model="loginForm.password"
    />
    </div>

    <div class="user__submit" @click="submitLogin"> Validate </div>
    <div class="user__login--forgotPass" @click="resetPassword"> Forgot your password ? Reset your password !</div>
  </div>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators';
import axios from "axios";
import Field from "@/components/Field";

export default {
  name: "Login",
  data(){
    return {
      loginForm: {
        email: null,
        password: null,
      },
      isSubmitted: false,
      isError: false,
      emailError: false,
      errorMessage: null,
    }
  },
  components: {
    Field
  },
  methods: {
    submitLogin(){
      this.isSubmitted = true;
      axios.post('http://192.168.1.19:3000/login', this.loginForm
      ).then(response => {
        this.$router.push(response.data.path);
        this.$store.commit('setUserInfos', {data: {
            name : response.data.name,
            email: response.data.email
          }});
        this.$store.commit('setIsLogged', response.data.isLoggedIn);
        console.log(response.data.wishlist);
        this.$store.commit('setWishList', response.data.wishlist);
      }).catch(err => {
        if(err.response.data.errorMessage.length > 1 && !this.$v.loginForm.$invalid){
          this.isError = true;
        }
        this.errorMessage = err.response.data.errorMessage;

      });
    },
    resetPassword(){
      this.$router.push('/reset');
    }
  },
  computed: {
    ErrorMessage(){
      return this.errorMessage;
    }

},
  validations: {
    loginForm:{
      email: {required, email},
      password: {required, minLength: minLength(8)}
    }
  }
}
</script>

<style lang="scss">
.user {
  &__login {

      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      padding: 123px 0 28px;

    &--field {

      &.invalid {
        input {
          border: 1px solid red;
          background-color: red;
          color: white;
        }

      }
    }

    &--form{
      position: relative;
      width: 65%;
    }

    &--forgotPass {
      color: #011F3B;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &--error{
      text-align: center;
      width: 100%;
      height: 20px
      //margin-bottom: 15px;
    }

    &--resetPassword{
      font-size: 13px;
      color: green;
      text-align: center;
      width: 100%;
      height: 20px;
    }
  }
}
</style>