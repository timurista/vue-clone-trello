import Vue from 'vue'
import List from '@/components/List'
import { mount } from 'avoriaz'

let Constructor
let vm
let wrapper

const triggerEvent = (Component, selector, event) => {
  const el = Component.$el.querySelector(selector)
  const windowEvent = new window.Event(event)
  el.dispatchEvent(windowEvent)
  Component._watcher.run()
}

function triggerClick(Component, selector) {
  triggerEvent(Component, selector, 'click')
}

Vue.config.ignoredElements = ['icon', 'modal']

describe('List', () => {
  beforeEach(() => {
    Constructor = Vue.extend(List)
    const propsData = { title: 'passed in title' }
    vm = new Constructor({ propsData }).$mount()
  })
  describe('list name', () => {
    it('should dsiplay list header title passed in', () => {
      expect(vm.$el.querySelector('a.list-header').textContent)
        .toBe('passed in title')
    })

    it('should turn link into input on click', () => {
      triggerClick(vm, 'a.list-header')
      expect(vm.$el.querySelector('input#list-header').value).toBe('passed in title')
    })
    describe('in edit mode', () => {
      describe('when the input is blurred', () => {
        beforeEach(() => {
          triggerClick(vm, 'a.list-header')
        })
        it('should bring back title', async () => {
          triggerClick(vm, 'a.save-btn')
          await Vue.nextTick(() => {
            expect(vm.$el.querySelector('a.list-header').textContent)
              .toBe('passed in title')
          })
        })
      })
    })
  })
  describe('card composer', () => {
    beforeEach(() => {
      const propsData = { title: 'passed in title', cards: [] }
      wrapper = mount(List, { propsData })
    })
    it('should render default card placeholder', () => {
      expect(wrapper.first('.open-card-composer').text()).toBe('Add a Card...')
    })
    describe('when the user clicks on the card', () => {
      beforeEach(() => {
        wrapper.first('.open-card-composer').trigger('click')
      })
      it('should add a new temp card with textarea', () => {
        expect(wrapper.contains('.card-composer-textarea')).toBe(true)
      })
      it('should add a close button', () => {
        expect(wrapper.contains('.cancel')).toBe(true)
      })
      it('should add a add-card button', () => {
        expect(wrapper.first('.add-card').text()).toBe('Add')
      })
      describe('when user clicks on close button', () => {
        beforeEach(() => wrapper.first('.cancel').trigger('click'))
        it('should close the open card composer', () => {
          expect(wrapper.contains('.card-composer-textarea')).toBe(false)
          expect(wrapper.contains('.open-card-composer')).toBe(true)
        })
      })
      describe('when user clicks on add button', () => {
        it('should add card to the list', () => {
          const title = 'example title'
          wrapper.vm.newCardTitle = title
          wrapper.first('.add-card').trigger('click')
          expect(wrapper.vm.cards.length).toBe(1)
          expect(wrapper.vm.cards[0].title).toBe(title)
          Vue.nextTick(() => {
            expect(wrapper.contains('.list-card')).toBe(true)
          })
        })
      })
    })
  })
  describe('card', () => {
    beforeEach(() => {
      const propsData = {
        title: 'passed in title',
        cards: [{ title: 'card1' }, { title: 'card2' }]
      }
      wrapper = mount(List, { propsData })
    })
    it('contains an edit icon', () => {
      expect(wrapper.contains('.list-card-edit-button')).toBe(true)
    })
    describe('clicking the first card', () => {
      beforeEach(() => {
        wrapper.first('.list-card').trigger('click')
      })
      it('brings up card detail modal', () => {
        expect(wrapper.contains('.card-detail-modal')).toBe(true)
      })
      it('sends detail modal the title of the card', () => {
        Vue.nextTick(() => {
          expect(wrapper.first('.detail-title').text()).toBe('card1')
        })
      })
    })
  })
})
