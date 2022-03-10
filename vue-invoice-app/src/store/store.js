import { createStore } from "vuex";

const state = {
  invoiceModal: null,
};

export default createStore({
  state,
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
  },
  actions: {},
});
