<template>
<div class="main">
  <div class="nav">
    <a class="header-link">Boards</a>
    <h1>{{ msg }}</h1>
    <a class="user-avatar"></a>
  </div>
  <div class="content">
    <ul >
    <list-item v-for="list in lists"
      :title="list.title"
      :cards="list.cards"
      v-bind:key="list.id">
    </list-item>
    </ul>
  </div>
</div>
</template>

<script>
import ListItem from './List'

const lists = [{
  id: 1,
  title: 'title1',
  cards: []
}]

export default {
  name: 'Board',
  data () {
    return {
      msg: 'Trello Clone',
      listNumber: 1,
      lists
    }
  },
  components: {
    'list-item': ListItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


.nav {
  display: flex;
  background: #026aa7;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  color: hsla(0,0%,100%,.6);
}

.nav h1 {
  margin: 0.125em;
}

.nav a:hover {
  background-color: hsla(0,0%,100%,.6);
  color: hsla(0,0%,100%,.9);
  cursor: pointer;
}

a.user-avatar {
  background-color: #c8c8c8;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

a.header-link {
  background: hsla(0,0%,100%,.3);
  border: 1px solid hsla(0,0%,100%,.4);
  color: hsla(0,0%,100%,.8);
  border-radius: 8px;
  padding: 8px 16px;
  margin-left: 16px;
}

ul {
  display: flex;
}

</style>
