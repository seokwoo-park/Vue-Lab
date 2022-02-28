<template>
  <div v-if="tab !== `post`" class="header">
    <ul @click="this.tab = `post`" class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul
      @click="this.tab = `write`"
      v-if="tab === `filter`"
      class="header-button-right"
    >
      <li>Next</li>
    </ul>
    <ul @click="publish" v-if="tab === `write`" class="header-button-right">
      <li>Upload</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container
    :postData="$store.state.postData"
    :tab="tab"
    :imageURL="imageURL"
    @content="postContent = $event"
  />

  <button
    @click="$store.dispatch('getData', morePostCount), this.morePostCount++"
  >
    More Post
  </button>
  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="uploadImg" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container.vue";

export default {
  name: "App",
  components: {
    Container,
  },
  data() {
    return {
      morePostCount: 0,
      tab: "myPage",
      imageURL: "",
      postContent: "",
    };
  },
  methods: {
    uploadImg(e) {
      const file = e.target.files;
      this.imageURL = URL.createObjectURL(file[0]);
      this.tab = "filter";
    },

    publish() {
      const myPost = {
        name: "Jennifer",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imageURL,
        likes: Math.floor(Math.random() * 100),
        date: "Nov 128",
        liked: false,
        content: this.postContent,
        filter: "perpetua",
      };
      this.postData.unshift(myPost);
      this.tab = "post";
      console.log(this.postContent);
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  display: flex;
  justify-content: space-between;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 60px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
