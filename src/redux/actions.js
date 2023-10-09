import { nanoid } from 'nanoid';

export const addContact = (name, number) => ({
  type: 'ADD_CONTACT',
  payload: {
    id: nanoid(),
    name,
    number,
  },
});

export const deleteContact = id => ({
  type: 'DELETE_CONTACT',
  payload: id,
});

export const setFilter = filter => ({
  type: 'SET_FILTER',
  payload: filter,
});
