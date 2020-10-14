<template>
  <div class="user__login">
    <div v-if="isError">{{ errorText }}</div>
    <h1>Set your New Password</h1>
    <div class="user__register--field" :class="{invalid: $v.newPasswordForm.password.$error && $v.newPasswordForm.password.required}">
      <label for="password">Password</label>
      <input id="password" type="password" name="password" v-model="user.password" @blur="$v.newPasswordForm.password.$touch()">
      <div class="user__register--field invalid" v-if="!$v.newPasswordForm.password.minLength"> Password length must be at least 8 characters. </div>
      <div v-if="isSubmitted">
        <div class="user__register--field invalid" v-if="!$v.newPasswordForm.password.required"> Field is required. </div>
        <div class="user__register--field invalid" v-if="!$v.newPasswordForm.password.minLength"> Password length must be at least 8 characters. </div>
      </div>
    </div>

    <div class="user__login--submit" @click="submitNewPassword"> Validate </div>
  </div>
</template>

<script>
import axios from "axios";
import {required, minLength} from 'vuelidate/lib/validators';

export default {
  name: "NewPassword",
  data(){
    return {
      user: {
        passwordToken: "",
        userId: "",
        password: ""
      },
      isSubmitted: false,
      isError: false,
      errorMessage : ""
    }
  },
  mounted() {
    this.user.passwordToken = this.$route.params.token;
    axios.get(`http://192.168.1.13:3000/reset/${this.user.passwordToken}`)
        .then(response => {
          return this.user.userId = response.data.userId
        })
        .catch(err => console.log(err));
  },
  methods: {
    submitNewPassword(){
      this.isSubmitted = true;
      axios.post('http://192.168.1.13:3000/new-password', this.user
      ).then(response => {
        console.log(response.data);
        this.$router.push(response.data);
      }).catch(err => {
        this.isError = true;
        console.log("Submit newPassword error : ", err.response);
        this.errorMessage = err.response.data.errorMessage;
      });
    },
  },
  computed: {
    errorText(){
      return this.errorMessage;
    }
  },
  validations: {
    newPasswordForm:{
      password: {required, minLength: minLength(8)},
    }
  }
}
</script>

<style lang="scss">

</style>