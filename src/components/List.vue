<template>
  <li class="list-container">
    <div class="list-actions">
      <a v-if="!edit" @click="saveEdit" class="list-header">{{ title }}</a>
      <input v-if="edit"
      id="list-header"
      ref="listHeaderEdit"
      v-model="title"
        v-on:keydown.tab="saveEdit"
        v-on:keyup.enter="saveEdit"
        v-on:focusout="saveEdit"
      >
      <a type="submit" class="save-btn">...</a>
    </div>
    <ul class="cards">
      <draggable v-model="cards" :options="{draggable:'.list-card'}">
        <li v-for="card in cards" v-bind:key="card.id" class="list-card" @click="() => openDetailModal(card)">
          <a class="list-card-title">{{card.title}}</a>
          <a class="list-card-edit-button"><icon name="pencil"></icon></a>
        </li>
      </draggable>
    </ul>
    <card-detail-modal ref="detailModal"></card-detail-modal>
    <div v-if="composeCard" class="card-composer">
      <textarea class="card-composer-textarea" v-model="newCardTitle">
      </textarea>
      <div class="card-composer-actions">
        <a class="add-card" @click="addNewCard">Add</a>
        <a class="cancel" @click="resetNewCard">X</a>
      </div>
    </div>
    <a v-if="!composeCard" class="open-card-composer" @click="composeCard = !composeCard">Add a Card...</a>
  </li>
</template>

<script>
import draggable from 'vuedraggable'
import CardDetailModal from './CardDetailModal'

export default {
  props: ['title', 'cards'],
  name: 'ListItem',
  data() {
    return {
      edit: false,
      composeCard: false,
      newCardTitle: ''
    }
  },
  methods: {
    addNewCard: function() {
      const title = this.newCardTitle
      this.cards.push({ title })
      this.resetNewCard()
    },
    resetNewCard: function() {
      this.newCardTitle = ''
      this.composeCard = !this.composeCard
    },
    saveEdit: function() {
      this.edit = !this.edit

      if (this.edit) {
        this.$nextTick(() => {
          this.$refs.listHeaderEdit.focus()
          this.$refs.listHeaderEdit.select()
        })
      }
    },
    openDetailModal: function(cardData) {
      const { title } = cardData
      console.log(title)
      this.$modal.show('cardDetail', { title })
    }
  },
  components: {
    draggable,
    'card-detail-modal': CardDetailModal
  }
}
</script>
<style scoped>

li {
  background-color: #e2e4e6;
  border-radius: 3px;
  width: 250px;
  padding: 16px;
}

li.list-container {
  position: relative;
  padding-bottom: 40px;
}

a {
  cursor: pointer;
  font-weight: 500;
}
a.save-btn {
  padding: 0 8px;
  border-radius: 8px;
  color: #999;
}

.list-actions {
  display: flex;
  justify-content: space-between;
}

input {
  color: #2c3e50;
  font-family: 'Avenir';
  font-size: 1em;
  flex: 2;
  border: 3px;
  padding: 0 2px;
  margin-left: -2px;
  font-weight: 500;
  border-color: #2c3e50;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

li.list-card {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 1px 1px #ccc;
  margin-top: 8px;
  padding: 0;
  margin-bottom: 8px;
  display: flex;

  &:hover {
    background-color: #efefef;
  }
}

li.list-card:hover .list-card-edit-button {
  opacity: 0.6;
  color: #666;
  &:hover {
    color: #000;
  }
}

li.list-card.sortable-ghost {
  background-color: #888;

  .list-card-title {
    opacity: 0;
  }
}

.list-card-title {
  padding: 6px;
  clear: both;
  display: block;
  overflow: hidden;
  text-decoration: none;
  word-wrap: break-word;
  text-align: left;
  color: #4d4d4d;
}

.list-card-edit-button {
  padding: 6px;
  margin-left: auto;
  order: 2;
  opacity: 0;
  color: #000;

  &:hover {
    background-color: #bbb;
    color: #000;
  }

  & .fa-icon {
    position: relative;
    top: 2px;
  }
}

.open-card-composer {
  text-align: left;
  display: block;
  color: #838c91;
  margin: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 8px 16px;
  width: 250px;
  &:hover {
    background-color: #cdd2d4;
    text-decoration: underline;
    color: #4d4d4d;
  }
}

.card-composer {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: -32px;
  padding-top: 8px;
}

.card-composer-actions {
  margin-top: 8px;
  padding: 8px 0 0;
  display: inline;
}
.add-card {
  padding: 8px 16px;
  background: #026aa7 100%;
  border-radius: 2px;
  color: #ddd;
  font-weight: bold;
  float: left;
}

.cancel {
  padding: 8px 16px;
  color: rgb(120, 120, 120);
  font-weight: bold;
  float: left;
}
.card-composer-textarea {
  padding: 6px 6px;
  border: 0;
  border-radius: 3px;
  resize: none;
  font-size: 1em;
  font-family: 'Avenir';
  font-weight: 500;
  &:focus {
    outline:0;
  }
}

</style>
