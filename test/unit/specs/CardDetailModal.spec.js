import Vue from 'vue'
import CardDetailModal from '@/components/CardDetailModal'
import { mount, shallow } from 'avoriaz'
import VModal from 'vue-js-modal'
let wrapper
let vm

Vue.use(VModal)
Vue.config.ignoredElements = ['icon']

const main = new Vue({
  components: { VModal }
})

describe('CardDetailModal', () => {
  beforeEach(() => {
    const propsData = { title: 'card title' }
    wrapper = mount(CardDetailModal, { propsData })
  })
  describe('when it is opened', () => {
    beforeEach(async () => {
      const title = 'card title'
      await main.$modal.show('cardDetail', { title })
    })
    it('modal is open', () => {
      expect(wrapper.first('.card-detail-modal')).toBeTruthy()
    })
  })
})
