<template>
  <div class="user__register">

    <div class="general__title">SIGN UP</div>
    <div class="user__form">

     <Field
      :validation="$v.registerForm"
      :is-submitted="isSubmitted"
      field-name="name"
      fieldType="text"
      label="Name"
      v-model="registerForm.name"
     />

      <Field
          :validation="$v.registerForm"
          :is-submitted="isSubmitted"
          field-name="email"
          fieldType="text"
          label="Email"
          v-model="registerForm.email"
      />

      <Field
          :validation="$v.registerForm"
          :is-submitted="isSubmitted"
          field-name="password"
          fieldType="password"
          label="Password"
          v-model="registerForm.password"
      />

      <Field
          :validation="$v.registerForm"
          :is-submitted="isSubmitted"
          field-name="passwordConfirmation"
          fieldType="password"
          label="Password Confirmation"
          v-model="registerForm.passwordConfirmation"
      />


    </div>

    <div class="user__submit" @click="submitRegister"> Validate </div>

  </div>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';
import axios from 'axios';
import Field from "@/components/Field";

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
      errorMessage : "",
    }
  },
  components: {
    Field
  },
  methods: {
    submitRegister(){
      this.isSubmitted = true;
      if(!this.$v.registerForm.$invalid){
        axios.post('http://192.168.1.19:3000/signup', this.registerForm
        )
            .then(response => {
              this.$router.push(response.data);
            })
            .catch(err => {
              this.isError = true;
              this.errorMessage = err.response.data.errorMessage;
            });
      }
      else{
        console.log("The form is not correct");
      }
    },
  },
  validations: {
    registerForm:{
      name: {required},
      email: {required, email},
      password: {required, minLength: minLength(8)},
      passwordConfirmation: {required, sameAs: sameAs('password')}
    }
  },
}
</script>

<style lang="scss">

.user{

  &__submit{
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 21px;
    font-weight: bold;
    cursor: pointer;
    transition: all .2s;
    width: 283px;
    height: 62px;
    border-radius: 57px;
    background: #5E81F4;
    margin: 0.5em 0 0.5em 0;

    &:hover {
      transform: scale(1.03);
    }
  }

  &__form{
    display: flex;
    justify-content: space-between;
    width: 65%;
    flex-wrap: wrap;
  }

  &__register{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 123px 0 28px;


    &--field {
      height: 150px;
      width: 47%;
      position: relative;

      &.invalid{
        .input__label--yoko::before{
          background: rgba(255,0,0, 0.6);
        }
      }
    }


  }
  &__errorContainer{
    padding-left: 16px;
    margin-top: -10px;
    bottom: 0;
    left: 0;
  }

  &__errorMessage{
    font-size: 13px;
    color: #e64a3e;
  }
}



</style>