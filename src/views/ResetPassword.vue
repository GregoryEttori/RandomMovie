<template>
  <div class="user__login">
    <div v-if="isError">{{ errorText }}</div>
    <div>
      <label for="login_email">Email</label>
      <input id="login_email" type="text" v-model="user.email" name="email">
      <div v-if="isSubmitted">
        <div class="user__login--field invalid" v-if="!$v.resetForm.email.required"> Field is required. </div>
        <div class="user__login--field invalid" v-if="!$v.resetForm.email.email"> Email must be valid. </div>
      </div>
    </div>
    <div class="user__login--submit" @click="submitReset"> Validate </div>
  </div>
</template>

<script>
import axios from "axios";
import {required, email} from 'vuelidate/lib/validators';

export default {
  name: "ResetPassword",
  data(){
    return {
      isSubmitted: false,
      isError: false,
      user: {
        email: "",
      },
      errorMessage: ""
    }
  },
  methods: {
    submitReset(){
      this.isSubmitted = true;
      axios.post('http://192.168.1.13:3000/reset', this.user
      ).then(response => {
        console.log(response.data);
        this.$router.push(response.data);
      }).catch(err => {
        this.isError = true;
        console.log("Submit register error : ", err.response);
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
    resetForm:{
      email: {required, email}
    }
  }
}
</script>

<style lang="scss">

</style>