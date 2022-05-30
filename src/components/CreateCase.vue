<template>
  <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      :validate-messages="messages"
  >
    <n-form-item label="Тема звернення" path="title">
      <n-input v-model:value="formData.title" placeholder="Введіть тему вашого звернення" />
    </n-form-item>
    <n-form-item label="Опис звернення" path="description">
      <n-input v-model:value="formData.description" placeholder="Опишіть детально проблему" type="textarea"/>
    </n-form-item>
    <n-form-item>
      <n-button @click="sendData">
        Створити звернення
      </n-button>
    </n-form-item>
  </n-form>

  <pre>{{ JSON.stringify(formData, null, 2) }}
</pre>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CreateCase",
  data() {
    return {
      formData: {
        title: "",
        description: "",
      }
    }
  },
  methods:{
    sendData() {
      let value = {...this.formData, userId: this.$route.query.userId, state: "7"};
      window.Telegram.WebApp.sendData(JSON.stringify(value))
      console.log(value)// Отправка данных в ТГ
    }
  }
})
</script>

<style scoped>

</style>