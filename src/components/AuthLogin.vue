<template>
  <div class="container">
    <auth-login/>

    <!-- Callback mode -->
    <!--
    -->
    <vue-telegram-login
        v-if="userInfo == null"
        mode="callback"
        telegram-login="company_testDenis_bot"
        @callback="login" />

    <b-card
        v-else
        :title="userInfo.username"
        :img-src="userInfo.photo_url"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2">

      <b-button variant="danger" @click="logout">Logout</b-button>
    </b-card>

    <!-- Redirect mode -->
    <!--
    <vue-telegram-login
       mode="redirect"
       telegram-login="belajarwidgetbot"
       redirect-url="https://k3qn0kznov.codesandbox.io/" />
    -->
  </div>


</template>

<script>
import { vueTelegramLogin } from "vue-telegram-login";

export default {
  name: "AuthLogin",
  components: { vueTelegramLogin },
  data (){
    return {
      userInfo : ''
    }
  },
  mounted(){
    this.getUser();
  },
  methods: {
    login(user) {

      // this.userInfo = user
      this.$cookies.set('usertg',user);
      this.getUser();


      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      // console.log(user);
    },
    getUser(){
      this.userInfo = this.$cookies.get('usertg')
    },
    logout(){
      // console.log('remove')
      this.$cookies.remove('usertg');
      this.getUser()
    }
  }
};
</script>