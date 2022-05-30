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
              :on-update:value="onUpdatedCity"
              :options="cityOptions"
              placeholder="Город"
              v-model:value="formData.city"
          />
        </n-form-item>
        <n-form-item label="Название улицы:" path="street">
          <n-auto-complete
              :on-update:value="onUpdatedStreet"
              :options="streetOptions"
              placeholder="Улица"
              v-model:value="formData.street"
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

    <pre>{{ JSON.stringify(cityOptions, null, 2) }}</pre>
    <pre>{{ JSON.stringify(streetOptions, null, 2) }}</pre>
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
      cityOptions: [],
      streetOptions: [],
    }
  },
  methods: {
    onUpdatedCity(text) {
      axios.get("https://305b-93-170-55-154.eu.ngrok.io/location/city?value=" + text).then(res => { // Запрос данных с бека
        this.cityOptions = res.data;
      })
    },
    onUpdatedStreet(text) {
      axios.get("https://305b-93-170-55-154.eu.ngrok.io/location/street?value=" + text).then(res => { // Запрос данных с бека
        this.streetOptions = res.data;
      })
    },
    onGetCoordinates(lat, lng) {
      axios.get("https://305b-93-170-55-154.eu.ngrok.io/location/auto/?lat=" + lat + "&lng=" + lng).then(res => {
        this.formData.city = res.data.city;
        this.formData.street = res.data.street;
        this.formData.number = res.data.number;
      })
    },
    created() {
      this.$getLocation()
          .then((coordinates) => {
            this.onGetCoordinates(coordinates.lat, coordinates.lng)
          })
          .catch((error) => {
            console.log(error);
          });
    },
  }
})
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
