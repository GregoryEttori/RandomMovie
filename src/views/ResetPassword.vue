<template>
  <div class="user__login">
    <div class="general__title">RESET PASSWORD</div>

    <div class="user__resetPassword"> {{getIsPassConfSuccess ? getResetPassConf : ""}}</div>

    <div class="user__errorMessage user__login--error"> {{isError ? errorMessage : ""}}</div>

    <Field
        :validation="$v.resetForm"
        :is-submitted="isSubmitted"
        field-name="email"
        fieldType="text"
        label="Email"
        v-model="resetForm.email"
    />

    <div class="user__submit" @click="submitReset"> Validate </div>
  </div>
</template>

<script>
import axios from "axios";
import {required, email} from 'vuelidate/lib/validators';

import Field from "@/components/Field";
import {mapGetters} from "vuex";

export default {
  name: "ResetPassword",
  data(){
    return {
      isSubmitted: false,
      isError: false,
      resetForm: {
        email: "",
      },
      errorMessage: ""
    }
  },
  methods: {
    submitReset(){
      this.isSubmitted = true;
      axios.post('http://192.168.1.19:3000/reset', this.resetForm
      ).then(response => {
        const payload = {
          ResetPassConfMessage: "Congratulation an Email has been send",
          isPassConfSuccess: true,
        }
        console.log(response.data);
        this.$store.commit('setResetPassConf', payload)
      }).catch(err => {
        console.log("Submit register error : ", err.response);

        if(err.response.data.errorMessage.length > 1 && !this.$v.resetForm.$invalid){
          this.isError = true;
        }

        this.errorMessage = err.response.data.errorMessage;
      });
    },
  },
  computed: {
      ...mapGetters([
        'getResetPassConf',
        'getIsPassConfSuccess'
      ]),
    errorText(){
      return this.errorMessage;
    }
  },
  validations: {
    resetForm:{
      email: {required, email}
    }
  },
  components: {
    Field
  }
}
</script>

<style lang="scss">

.user{
  &__resetPassword{
    font-size: 13px;
    color: green;
    text-align: center;
    width: 100%;
    height: 20px;
  }
}

</style>