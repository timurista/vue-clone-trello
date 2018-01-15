import Vue from 'vue'
import Board from '@/components/Board'

let Constructor
let vm

Vue.config.ignoredElements = ['icon', 'modal']

describe('Board', () => {
  beforeEach(() => { Constructor = Vue.extend(Board) })
  it('should render title Trello Clone', () => {
    vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.main h1').textContent)
    .toEqual('Trello Clone')
  })

  describe('board header', () => {
    beforeEach(() => { vm = new Constructor().$mount() })
    it('should list the current board', () => {
      expect(vm.$el.querySelector('a.header-link').textContent)
      .toEqual('Boards')
    })
  })
})
