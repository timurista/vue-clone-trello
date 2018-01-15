<template>
  <modal name="cardDetail" class="card-detail-modal" @before-open="beforeOpen">
    <div class="window-header">
    <div v-if="!editMode" class='detail-title' @click="updateEditMode">{{title}}</div>
    <input v-if="editMode" v-model="title" ref='detailTitle' id='detail-title' @blur="updateEditMode">
    </div>

    <button @click="hide">X</button>
  </modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  name: 'CardDetailModal',
  methods: {
    beforeOpen (event) {
      const { title } = event.params
      this.title = title
    },
    show() {
      this.$modal.show('cardDetail')
    },
    hide() {
      this.$modal.hide('cardDetail')
    },
    updateEditMode() {
      this.editMode = !this.editMode

      if (this.editMode) {
        this.$nextTick(() => {
          this.$refs.detailTitle.focus()
          this.$refs.detailTitle.select()
        })
      }
    }
  }
}
</script>

<style scoped>

.window-header {
  padding: 20px;
}
</style>
