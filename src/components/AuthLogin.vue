<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'AuthLogin',
  props: {
    msg: String
  },
  mounted() {
    const insertScript = document.createElement('script')
    insertScript.async
    insertScript.setAttribute('src', 'https://telegram.org/js/telegram-widget.js?19')
    insertScript.setAttribute('data-telegram-login', 'company_testDenis_bot')
    insertScript.setAttribute('data-size', 'large')
    insertScript.setAttribute('data-onauth', 'onTelegramAuth(user)')
    document.body.appendChild(insertScript)
  }
}
</script>

<style scoped>
</style>
