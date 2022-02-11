<template>
  <div class="discount-card">
    <h2>ONLY Today {{ percentage }}% Discount rent-fee</h2>
  </div>
</template>

<script>
export default {
  name: "DiscountCard",
  data() {
    return {
      percentage: 25,
    };
  },
  methods: {
    dcInterval() {
      this.percentage--;
      if (this.percentage <= 1) clearInterval(this.interval);
    },
  },
  mounted() {
    this.interval = setInterval(this.dcInterval, 1000);
  },
  watch: {},
};
</script>

<style>
.discount-card {
  background-color: #eee;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
  padding: 1em;

  color: darkslateblue;
}
</style>
