import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import index from "../utils";

const GET_TOKEN = "GET_TOKEN";
const SET_USER_INFO = "SET_USER_INFO";

const state = {
  token: "",
  user_info: {}
};

const mutations = {
  GET_TOKEN(state, token) {
    state.token = token;
    index.setToken(token);
  },
  SET_USER_INFO(state, user_info) {
    state.user_info = user_info;
    index.setUserInfo(user_info);
  }
};

const actions = {
  setToken({ commit }, token) {
    commit(GET_TOKEN, token);
  },
  setUserInfo({commit}, user_info) {
    commit(SET_USER_INFO, user_info);
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
