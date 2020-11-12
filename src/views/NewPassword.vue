<template>
  <div class="user__login">

    <div class="general__title">SET YOUR NEW PASSWORD</div>
    <div class="user__form">
      <Field
          :validation="$v.newPasswordForm"
          :is-submitted="isSubmitted"
          field-name="password"
          fieldType="password"
          label="Password"
          v-model="newPasswordForm.password"
      />

      <Field
          :validation="$v.newPasswordForm"
          :is-submitted="isSubmitted"
          field-name="passwordConfirmation"
          fieldType="password"
          label="Password Confirmation"
          v-model="newPasswordForm.passwordConfirmation"
      />
    </div>

    <div class="user__submit" @click="submitNewPassword"> Validate </div>
  </div>
</template>

<script>
import axios from "axios";
import {required, minLength, sameAs} from 'vuelidate/lib/validators';

import Field from "@/components/Field";

export default {
  name: "NewPassword",
  data(){
    return {
      newPasswordForm: {
        passwordToken: "",
        userId: "",
        password: "",
        passwordConfirmation: ""
      },
      isSubmitted: false,
      isError: false,
      errorMessage : ""
    }
  },
  mounted() {
    this.newPasswordForm.passwordToken = this.$route.params.token;
    axios.get(`http://192.168.1.19:3000/reset/${this.newPasswordForm.passwordToken}`)
        .then(response => {
          return this.newPasswordForm.userId = response.data.userId
        })
        .catch(err => console.log(err));
  },
  methods: {
    submitNewPassword(){
      this.isSubmitted = true;
      console.log(this.newPasswordForm);
      axios.post('http://192.168.1.19:3000/new-password', this.newPasswordForm
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
      passwordConfirmation: {required, sameAs: sameAs('password')}
    }
  },
  components: {
  Field
  }
}
</script>

<style lang="scss">

</style>