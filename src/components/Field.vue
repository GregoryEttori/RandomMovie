<template>
  <div class="user__register--field" :class="{
        invalid: isInvalid(fieldName)
      }">

        <span :class="hasClass(fieldName) ? 'input input--minoru input--filled' : 'input input--minoru'">
        <input
            :id=fieldName
            :type=fieldType
            class="input__field input__field--yoko"
            @input="process"
            :autocomplete="fieldType === 'password' ? 'on' : 'off'">

          <label class="input__label input__label--yoko" :for=fieldName>
						<span class="input__label-content input__label-content--yoko">{{label}}</span>
					</label>
				</span>

    <div v-if="isSubmitted" class="user__errorContainer">
      <div class="user__errorMessage" v-if="!validation[fieldName].required"> Field is required. </div>
      <template v-if="fieldName === 'email'">
        <div class="user__errorMessage" v-if="!validation[fieldName].email"> Email must be valid. </div>
      </template>

      <template v-if="fieldName === 'password'">
        <div class="user__errorMessage" v-if="!validation[fieldName].minLength"> Minimum 8 characters. </div>
      </template>

      <template v-if="fieldName === 'passwordConfirmation'">
        <div class="user__errorMessage" v-if="!validation[fieldName].sameAs"> Password must match. </div>
      </template>
    </div>
  </div>
</template>

<script>


export default {
name: "Field",
  data(){
  return{

    }
  },
  props: ["validation", "isSubmitted", "fieldName", "label", "fieldType", "value"],
  methods :{
    hasClass(value){
      return this.value || this.isInvalid(value);
    },
    isInvalid(value){
      return this.validation[value].$invalid && this.isSubmitted;
    },
    process(event){
      this.$emit('input', event.target.value)
    }
  },
}
</script>

<style >
.input {
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  /*max-width: 350px;
  width: calc(100% - 2em);*/
}

.input__field {
  display: flex;
  padding: 0.8em;
  border: none;
  border-radius: 0;
  background: #f0f0f0;
  color: #aaa;
  font-weight: bold;
  -webkit-appearance: none; /* for box shadows to show on iOS */
}

.input__field:focus {
  outline: none;
}

.input__label {
  position: relative;
  display: flex;
  padding: 0.5em 1em;
  width: 85%;
  color: #011F3B;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.input__field--yoko {
  z-index: 10;
  width: 85%;
  height: 22px;
  background: transparent;
  color: #f5f5f5;
  opacity: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}

.input__label::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 3em;
  background: rgba(94, 129, 244, 0.7 );
  -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, 90deg);
  transform: perspective(1000px) rotate3d(1, 0, 0, 90deg);
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}
.input__label::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.30em;
  background: #5E81F4;
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
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

.input__field--yoko:focus + .input__label::before,
.input--filled .input__label::before {
  -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, 0deg);
  transform: perspective(1000px) rotate3d(1, 0, 0, 0deg);
}

.input__field--yoko:focus + .input__label,
.input--filled .input__label--yoko {
  pointer-events: none;
}

.input__field--yoko:focus + .input__label::after,
.input--filled .input__label::after {
  -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, -90deg);
  transform: perspective(1000px) rotate3d(1, 0, 0, -90deg);
}

</style>