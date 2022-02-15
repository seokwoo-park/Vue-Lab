<template>
  <h1>This is List Page</h1>
  <div v-for="(item, index) in listData" :key="index">
    <router-link :to="'/detail/' + index">{{ item.title }}</router-link>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    listData: Array,
  },
};
</script>

<style></style>
