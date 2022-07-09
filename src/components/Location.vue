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
              :value="formData.city"
              :on-update:value="onUpdatedCity"
              :options="cityOptions"
              placeholder="Город"
          />
        </n-form-item>
        <n-form-item label="Название улицы:" path="street">
          <n-auto-complete
              :value="formData.street"
              :on-update:value="onUpdatedStreet"
              :options="streetOptions"
              placeholder="Улица"
          />
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
  </n-message-provider>
</template>

<script>
import axios from "axios";
import {defineComponent} from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Location',
  data() {
    return {
      formData: {
        city: "",
        street: "",
        number: "",
        numberApart: ""
      },
      cityOptions: [],
      streetOptions: [],
    }
  },
  methods: {
    onUpdatedCity(text) {
      this.formData.city = text;
      axios.get("https://bdff-93-170-55-154.eu.ngrok.io/location/?cityName=" + text).then(res => { // Запрос данных с бека
        this.cityOptions = res.data; // Ответ на фронт
      })
    },
    onUpdatedStreet(text) {
      this.formData.street = text;
      axios.get("https://bdff-93-170-55-154.eu.ngrok.io/location/?cityName=" + this.formData.city + "&streetName=" + text).then(res => { // Запрос данных с бека
        this.streetOptions = res.data; // Ответ на фронт
      })
    },
    onGetCoordinates(lat, lng) {
      axios.get("https://bdff-93-170-55-154.eu.ngrok.io/location/auto/?lat=" + lat + "&lng=" + lng).then(res => {
        this.formData.city = res.data.city;
        this.formData.street = res.data.street;
        this.formData.number = res.data.number;
      })
    },
    sendData() {
      console.log(this.formData)
      window.Telegram.WebApp.sendData(JSON.stringify(this.formData)) // Отправка данных в ТГ
    }
  },
  created() {
    this.$getLocation()
        .then((coordinates) => {
          console.log(coordinates);
          this.onGetCoordinates(coordinates.lat, coordinates.lng)
        })
        .catch((error) => {
          console.log(error);
        });
  },
})
</script>

<style>

.form-values {
  display: flex;
  flex-direction: column;
}
</style>
