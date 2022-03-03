<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import Navigation from "./components/Navigation.vue";

const mobile = ref(null);

function mobileDetect() {
  const windowWidth = window.innerWidth;
  if (windowWidth <= 767) {
    mobile.value = true;
    return;
  } else {
    mobile.value = false;
  }
}

onMounted(() => {
  mobileDetect();
  window.addEventListener("resize", mobileDetect());
});
</script>

<template>
  <div v-if="!mobile" class="app flex flex-column">
    <Navigation />
    <div class="app-content flex flex-column"></div>
  </div>
  <div v-else class="mobile-message flex flex-column">
    <h2>Sorry, this app is not supported on Mobile Devices</h2>
    <p>To use this app, we kindly ask you to use a Computer or Tablet</p>
  </div>
</template>

<style lang="scss">
@import "./assets/styles/app.scss";
@import "./assets/styles/_utilities.scss";
</style>
