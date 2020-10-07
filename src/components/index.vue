<template>
<body>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <!-- <div class="fadeIn first">
        <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
      </div> -->

      <!-- Login Form -->
      <form @submit.prevent="handleSubmit">
        <input v-model="name" type="text" id="login" class="fadeIn second" name="name" placeholder="name">
        <input v-model="room" type="text" id="password" class="fadeIn third" name="room" placeholder="Room Name">
        <input type="submit" class="fadeIn fourth" value="Join room">
      </form>

      <!-- Remind Passowrd

      <div id="formFooter">
        <a class="underlineHover" href="#">Forgot Password?</a>
      </div> -->

    </div>
  </div>
</body>
  
</template>

<script>
export default {
  data(){
    return {
      name:"",
      room:""
    }
  },
  methods:{
    handleSubmit(){
      this.$router.push({path:'chat',query:{name:this.name,room:this.room}})
    }
  }
}
</script>

<style scoped>
  @import url("../assets/css/login/style.css")
</style>