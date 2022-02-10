<template>
  <transition name="fade">
    <Modal
      v-if="isModalOn === true"
      @closeModal="isModalOn = false"
      :products="products"
      :modalProductNumber="modalProductNumber"
    />
  </transition>

  <header class="header-menu">
    <a href="#" v-for="item in menu" :key="item">
      {{ item }}
    </a>
  </header>
  <Discount />

  <button @click="priceSort">Sort by price</button>

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
      isSorted: false,
    };
  },
  methods: {
    priceSort() {
      this.isSorted ? this.highPriceSort() : this.lowPriceSort();
    },
    highPriceSort() {
      this.products.sort((a, b) => b.price - a.price);
      this.isSorted = !this.isSorted;
    },
    lowPriceSort() {
      this.products.sort((a, b) => a.price - b.price);
      this.isSorted = !this.isSorted;
    },
  },
  components: {
    ProductCard,
    Discount,
    Modal,
  },
};
</script>

<style>
.fade-enter-from {
  transform: translateY(-100vh);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  transform: translateY(0);
}
.fade-leave-active {
  transition: all 0.5s;
}
.fade-leave-to {
  transform: translateY(-100vh);
}

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
