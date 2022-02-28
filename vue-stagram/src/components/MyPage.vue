<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <p>{{ inputValue }}</p>
    <input @input="searchFiltered($event.target.value)" placeholder="?" />
    <div
      class="post-header"
      v-for="(follower, index) in filteredFollowers"
      :key="index"
    >
      <div
        class="profile"
        :style="`background-image : url(${follower.image}}}})`"
      ></div>
      <span class="profile-name">{{ follower.name }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

export default {
  setup() {
    const followers = ref([]);
    const filteredFollowers = ref([]);

    function searchFiltered(e) {
      const input = e.toLowerCase();
      const res = followers.value.filter((follower) => {
        return follower.name.toLowerCase().includes(input);
      });
      filteredFollowers.value = res;
    }

    onMounted(() => {
      axios.get("/follower.json").then((res) => {
        followers.value = res.data;
        filteredFollowers.value = res.data;
        console.log(res.data);
      });
    });

    return { followers, filteredFollowers, searchFiltered };
  },

  data() {
    return {};
  },
};
</script>

<style></style>
