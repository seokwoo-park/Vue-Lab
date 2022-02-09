<template>
  <div v-for="(item, index) in products" :key="index">
    <h1 @click="$emit('openModal', item.id)">{{ item.title }}</h1>
    <img :src="item.image" class="room-img" />
    <p>{{ item.price.toLocaleString() }} KRW</p>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    products: Array,
  },
};
</script>

<style></style>
