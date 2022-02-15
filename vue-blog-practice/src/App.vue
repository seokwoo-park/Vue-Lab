<template>
  <Header />
  <router-view :listData="listData" />
</template>

<script>
import Header from "./components/Header.vue";
import listData from "./data/listData";

export default {
  components: {
    Header,
  },
  data() {
    return {
      listData,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-align: center;
}

body {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

a:visited,
a:link {
  color: black;
}
</style>
