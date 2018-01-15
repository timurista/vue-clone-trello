import store, { mutations, getters } from './index'
import { saveStateToServer } from './serverStorage';

// destructure assign `mutations`
const { ADD_LIST_MUTATION, ADD_LIST_ITEM_MUTATION, UPDATE_LIST_ITEM_NAME_MUTATION } = mutations;
const { getListById, getListItemById } = getters;

// jest.mock('localStorage', () => null);
jest.mock('./serverStorage', () => ({
  stateFromServer: jest.fn(() => []),
  saveStateToServer: jest.fn()
}))
let state;
describe('store', () => {
  beforeEach(() => {
    state = { lists: [] };
  })
  describe('ADD_LIST_MUTATION', () => {
    describe('when action is fired', () => {
      it('it should add a list item to the state', () => {
        expect(state.lists).toHaveLength(0);
        ADD_LIST_MUTATION(state, {id: 1, name: 'list 1'});
        expect(state.lists).toHaveLength(1);
        // console.log(state.lists)
      })
    })
  })
  describe('ADD_LIST_ITEM_MUTATION', () => {
    beforeEach(() => {
      state = { lists: [{id: 'abc', items: [], name: 'list 1'}] };
    })
    describe('when action is fired', () => {
      it('it should add a list item to the state', () => {
        expect(getListById(state, 'abc').items).toHaveLength(0);
        ADD_LIST_ITEM_MUTATION(state, {id: 2, name: 'list item 1'}, 'abc');
        expect(getListById(state, 'abc').items).toHaveLength(1);
      })
    })
    describe('UPDATE_LIST_ITEM_NAME_MUTATION', () => {
      beforeEach(() => {
        state = {
          lists: [{
            id: 'abc', items: [
              {id: 2, name: 'list item 1'}
            ],
            name: 'list 1'
          }]
        };
      })
      it('it should change the name of the list item', () => {
        expect(getListItemById(state, 'abc', 2).name).toBe('list item 1');
        UPDATE_LIST_ITEM_NAME_MUTATION(state, 'abc', 2, 'item');
        expect(getListItemById(state, 'abc', 2).name).toBe('item');
      })
    })
  })
})
