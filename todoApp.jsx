const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TODO_TOGGLE":
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TODO_TOGGLE":
      return state.map(t => todo(t, action));
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

const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

const FilterLink = ({ filter, currentFilter, children }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: "SET_VISIBILITY_FILTER",
          filter
        });
      }}
    >
      {children}
    </a>
  );
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
  }
};
const Todo = () => {
 return( <li
              onClick={() => {
                store.dispatch({ type: "TODO_TOGGLE", id: todo.id });
              }}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </li>
 );
}

const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          onAddClick(input.value);
        }}
      >
        Add Todo
      </button>
    </div>
  );
};
let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            store.dispatch({
              type: "ADD_TODO",
              id: nextTodoId++,
              text
            })
          }
        />
        <ul>
          {visibleTodos.map(todo => (
            
          ))}
        </ul>
        <p>
          Show:
          {"    "}
          <FilterLink filter="SHOW_ALL">All</FilterLink>
          {"    "}
          <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
          {"    "}
          <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
        </p>
      </div>
    );
  }
}
const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
