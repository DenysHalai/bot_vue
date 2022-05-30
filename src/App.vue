<template>
  <router-view></router-view>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'App'
})
</script>

<style>
@import 'vfonts/Lato.css';
@import 'vfonts/FiraCode.css';

body {
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
