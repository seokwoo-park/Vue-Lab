<template>
  <h1>This is Author Page</h1>
  <h2>Author : {{ listData[params].author }}</h2>
</template>

<script>
export default {
  name: "Author",
  props: {
    params: String,
    listData: Array,
  },
};
</script>

<style></style>
