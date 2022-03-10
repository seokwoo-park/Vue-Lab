<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import Navigation from "./components/Navigation.vue";
import InvoiceModal from "./components/InvoiceModal.vue";
import CloseModal from "./components/CloseModal.vue";
import { useStore } from "vuex";

/* Mobile detect logic */
const mobile = ref(null);
const closeModalActive = ref(null);

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

/* Invoice Toggle Logic */
const invoiceToggle = computed(() => store.state.invoiceModal);
const store = useStore();

function closeInvoice() {
  store.commit("TOGGLE_INVOICE");
  closeModalActive.value = false;
}
</script>

<template>
  <div v-if="!mobile" class="app flex flex-column">
    <Navigation />
    <div class="app-content flex flex-column">
      <CloseModal
        v-show="closeModalActive"
        @closeModal="closeModalActive = false"
        @closeInvoice="closeInvoice"
      />
      <transition name="invoice">
        <InvoiceModal
          v-if="invoiceToggle"
          @closeInvoiceModal="closeModalActive = true"
        />
      </transition>
      <router-view />
    </div>
  </div>
  <div v-else class="mobile-message flex flex-column">
    <h2>Sorry, this app is not supported on Mobile Devices</h2>
    <p>To use this app, we kindly ask you to use a Computer or Tablet</p>
  </div>
</template>

<style lang="scss">
@import "./assets/styles/app/app.scss";
@import "./assets/styles/_utilities.scss";
</style>
