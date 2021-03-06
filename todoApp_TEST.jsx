const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { id: 0, text: action.text, completed: false };
    case "TODO_TOGGLE":
      if (state.id != action.id) {
        return state;
      }
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TODO_TOGGLE":
      state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
/*const todoApp = (state = {}, action) => {
  return {
    todos: todo(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};*/

const { createStore } = Redux;
const store = createStore(todoApp);

console.log(store.getState());
store.dispatch({
  type: "ADD_TODO",
  id: 0,
  text: "Learn Redux"
});
console.log(store.getState());
store.dispatch({
  type: "TODO_TOGGLE",
  id: 0
});
console.log(store.getState());
store.dispatch({
  type: "SET_VISIBILITY_FILTER",
  filter: "SHOW_COMPLETED"
});
console.log(store.getState());
