<template>
  <div v-if="tab === `post`">
    <Post :data="data" v-for="(data, i) in postData" :key="i" />
  </div>

  <!-- 필터선택페이지 -->
  <div v-if="tab === `filter`">
    <div
      class="upload-image"
      :style="`background-image: url(${imageURL})`"
    ></div>
    <div class="filters">
      <FilterBox
        :imageURL="imageURL"
        v-for="(filter, index) in ImgFilters"
        :filter="filter"
        :key="index"
        >{{ filter }}</FilterBox
      >
    </div>
  </div>

  <!-- 글작성페이지 -->
  <div v-if="tab === `write`">
    <div
      class="upload-image"
      :style="`background-image: url(${imageURL})`"
    ></div>
    <div class="write">
      <textarea
        placeholder="Write Something"
        class="write-box"
        v-model="content"
        @input="$emit('content', content)"
      >
write!</textarea
      >
    </div>
  </div>

  <div v-if="tab === `myPage`">
    <MyPage />
  </div>
</template>

<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
import { ImgFilters } from "../data/ImgFilterList";
import MyPage from "./MyPage.vue";

export default {
  name: "app-container",
  components: {
    Post,
    FilterBox,
    MyPage,
  },
  data() {
    return {
      content: "",
      ImgFilters,
    };
  },
  props: {
    postData: Array,
    tab: String,
    imageURL: String,
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
