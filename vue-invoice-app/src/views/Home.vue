<template>
  <div class="home container">
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are 4 total invoices</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status</span>
          <img src="../assets/image/icon-arrow-down.svg" alt="" />
          <ul v-show="filterMenu" class="filter-menu">
            <li>Draft</li>
            <li>Pending</li>
            <li>Paid</li>
            <li>Clear Filter</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="../assets/image/icon-plus.svg" alt="" />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "Home",
  components: {},

  setup(props) {
    const store = useStore();
    const filterMenu = ref(null);

    function newInvoice() {
      store.commit("TOGGLE_INVOICE");
    }

    function toggleFilterMenu() {
      filterMenu.value = !filterMenu.value;
    }

    return {
      newInvoice,
      filterMenu,
      toggleFilterMenu,
      newInvoice,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/home/home.scss";
@import "../assets/styles/_button.scss";
</style>
