<template>
  <header class="header-menu">
    <a href="#" v-for="item in menu" :key="item">
      {{ item }}
    </a>
  </header>

  <Modal
    v-if="isModalOn === true"
    @closeModal="isModalOn = false"
    :products="products"
    :modalProductNumber="modalProductNumber"
  />
  <Discount />

  <ProductCard
    @openModal="
      isModalOn = true;
      modalProductNumber = $event;
    "
    :products="products"
  />
</template>

<script>
import { productsData } from "./data/productsData";
import Discount from "./components/DiscountCard.vue";
import Modal from "./components/Modal.vue";
import ProductCard from "./components/ProductCard.vue";

export default {
  name: "App",
  data() {
    return {
      modalProductNumber: 0,
      isModalOn: false,
      menu: ["Home", "Products", "About"],
      products: productsData,
    };
  },
  methods: {},
  components: {
    ProductCard,
    Discount,
    Modal,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

div {
  box-sizing: border-box;
}
.header-menu {
  background-color: darkslateblue;
  display: flex;
  justify-content: space-around;
  padding: 1em;
}

.header-menu a {
  color: white;
  text-decoration: none;
}

.room-img {
  width: 50%;
  aspect-ratio: 16/10;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
