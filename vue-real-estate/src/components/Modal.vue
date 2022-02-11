<template>
  <div class="modal-layout">
    <div class="modal-whiteBG">
      <h1>{{ products[modalProductNumber].title }}</h1>
      <img :src="products[modalProductNumber].image" class="room-img" />
      <p>{{ products[modalProductNumber].content }}</p>
      <input v-model.number="month" />
      <p>for {{ month }} months</p>
      <p>
        {{ products[modalProductNumber].price.toLocaleString() }} KRW /month
      </p>
      <button @click="$emit('closeModal')">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      month: "",
    };
  },
  updated() {
    alert("Check the price");
  },
  watch: {
    month(value, prev) {
      if (typeof value === "string" || value <= 0 || value > 12) {
        this.month = prev;
        alert("up to 12Months allowed");
      }
    },
  },
  props: {
    products: Array,
    modalProductNumber: Number,
  },
};
</script>

<style>
.modal-layout {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 2em;
}

.modal-whiteBG {
  width: 100%;
  background: #fff;
  border-radius: 5px;
  padding: 1em;
}
</style>
