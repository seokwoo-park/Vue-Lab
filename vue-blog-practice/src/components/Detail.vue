<template>
  <h3>This is Detail Page</h3>
  <h2>{{ listData[$route.params.id].title }}</h2>
  <p>{{ listData[$route.params.id].content }}</p>
  <p>{{ listData[$route.params.id].date }}</p>

  <button @click="$router.push({ name: 'author' })">Show Author</button>
  <router-view :listData="listData" :params="$route.params.id" />
</template>

<script>
export default {
  name: "detail",
  props: {
    listData: Array,
  },
};
</script>

<style></style>
