<template>
  <div>
    Тут будет форма<br>
    Pole 1 <br/>
    Pole 2 <br/><br/>
    Pole 3 <br/><br/>
    Кнопка авторизации<br/>
  </div>
  <vue-telegram-login
      mode="callback"
      telegram-login="YourTelegramBot"
      @callback="yourCallbackFunction" />
</template>

<script>
import {vueTelegramLogin} from 'vue-telegram-login'
// eslint-disable-next-line no-unused-vars
export default {
  name: 'AuthLogin',
  props: {
    msg: String
  },
  components: {vueTelegramLogin},
  methods: {
    yourCallbackFunction(user) {
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      console.log(user)
    }
  }
}
</script>

<style scoped>
</style>
