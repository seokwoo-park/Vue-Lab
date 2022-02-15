<template>
  <h1>This is Home Page</h1>

  <router-link to="/list" class="checkList">Click this Link</router-link>
</template>

<script>
export default {
  name: "Home",
  props: {
    listData: Array,
  },
};
</script>

<style>
.checkList {
  font-size: 2rem;
}
</style>
