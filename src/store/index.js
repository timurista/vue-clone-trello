import Vue from 'vue';
import Vuex from 'vuex';
import { stateFromServer, saveStateToServer} from './serverStorage';
Vue.use(Vuex);

export const actions = {
  ADD_LIST: function({ commit }, newList) {
    commit('ADD_LIST_MUTATION', {
      newList,
      active: true
    })
  },
  ADD_LIST_ITEM: function({ commit }, newListItem, listId) {
    commit('ADD_LIST_ITEM', {
      newListItem
    })
  },
};


const getListById = (state, id) => state.lists.filter(val => val.id == id)[0];

export const getters = {
  getListById,
  getListItemById: (state, listId, id) => getListById(state, listId)
    .items.filter(listItem => listItem.id == id)[0],
  active: state => {
    var filtered = state.todos.filter(function(el) {
      return el.active === true
    })
    return filtered
  },
};

const { getListItemById } = getters;

export const mutations = {
  ADD_LIST_MUTATION: function(state, newList) {
    state.lists.push(newList);
    saveStateToServer(state);
  },
  ADD_LIST_ITEM_MUTATION: function(state, newListItem, listId) {
    getListById(state, listId).items.push(newListItem);
    saveStateToServer(state);
  },
  UPDATE_LIST_ITEM_NAME_MUTATION: function(state, listId, itemId, newName) {
    getListItemById(state, listId, itemId).name = newName;
    saveStateToServer(state);
  },
};

const store = new Vuex.Store({
  state: {
    lists: stateFromServer || {}
  },
  actions,
  mutations,
  getters
})

export default store
