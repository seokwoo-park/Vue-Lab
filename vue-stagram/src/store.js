import axios from "axios";
import { createStore } from "vuex";
import { postData } from "./data/postData";

const store = createStore({
  state() {
    return {
      postData,
    };
  },
  mutations: {
    fetchMorePost(state, payload) {
      state.postData.push(payload);
    },
  },
  actions: {
    getData(context, payload) {
      axios
        .get(`https://codingapple1.github.io/vue/more${payload}.json`)
        .then((res) => context.commit("fetchMorePost", res.data))
        .catch((err) => alert("No more posts to load", err));
    },
  },
});

export default store;
