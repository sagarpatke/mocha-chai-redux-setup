import { createStore } from 'redux';
import deepFreeze from 'deep-freeze';
import ToDoApp from '../src/ToDoApp';
const chai = require('chai');
const should = chai.should();

describe('ToDoApp', function() {
  it('Should add item', function() {
    const initialState = deepFreeze({
      items: [{
        id: Math.random()*892793492 + '',
        text: 'Item 1',
        isComplete: false
      }]
    });

    const store = createStore(ToDoApp, initialState);

    // console.log('store.getState()', store.getState());

    store.dispatch({
      type: 'ADD_ITEM',
      text: 'New item'
    });

    console.log('store.getState()', store.getState());

    store.getState().should.have.property('items').of.length(2);
    store.getState().items[1].should.have.property('id');
    store.getState().items[1].should.have.property('text').and.equal('New item');
    store.getState().items[1].should.have.property('isComplete').and.equal(false);

    store.getState().items[0].should.have.property('text').and.equal(initialState.items[0].text);
    store.getState().items[0].should.have.property('isComplete').and.equal(initialState.items[0].isComplete);
    store.getState().items[0].should.have.property('id').and.equal(initialState.items[0].id);
  });
});
