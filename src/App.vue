<template>
  <n-message-provider>
    <n-form
        ref="formRef"
        inline
        :label-width="80"
    >

      <div class="form-values">
        <n-form-item label="Город:" path="city">
          <n-auto-complete
              :on-update:value="onUpdated"
              :options="options"
              placeholder="Город"
          />
        </n-form-item>
        <n-form-item label="Название улицы:" path="street">
          <n-input v-model:value="formData.street" placeholder="Улица"/>
        </n-form-item>
        <n-form-item label="Номер дома:" path="number">
          <n-input v-model:value="formData.number" placeholder="Номер дома"/>
        </n-form-item>
        <n-form-item label="Номер квартиры:" path="numberApart">
          <n-input v-model:value="formData.numberApart" placeholder="Номер квартиры"/>
        </n-form-item>
        <n-form-item>
          <n-button @click="sendData">
            Додати мою адресу
          </n-button>
        </n-form-item>
      </div>
    </n-form>

    <pre>{{ JSON.stringify(options, null, 2) }}</pre>
  </n-message-provider>
</template>

<script>
import {defineComponent} from "vue";
import axios from "axios";

export default defineComponent({
      name: 'App',
      data() {
        return {
          formData: {
            city: "",
            street: "",
            number: "",
            numberApart: ""
          },
          options: [],
        }
      },
      methods: {
        onUpdated(text) {
          axios.get("https://305b-93-170-55-154.eu.ngrok.io/location/city?value=" + text).then(res => { // Запрос данных с бека
            this.options = res.data;
          })
        },
        /*sendData() {
          /!*window.Telegram.WebApp.sendData("qweQEW");*!/
          axios.post("http://localhost:8080/location/city?value=", this.formData) // Отправка данных на бек
        }*/
      },
    }
)
</script>

<style>
@import 'vfonts/Lato.css';
@import 'vfonts/FiraCode.css';

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.form-values {
  display: flex;
  flex-direction: column;
}
</style>
