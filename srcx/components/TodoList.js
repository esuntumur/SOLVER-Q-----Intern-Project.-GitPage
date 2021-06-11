import React from "react";
//importing Components
import Todo from "./Todo";
const TodoList = ({ todos, setTodos, status, filteredTodos }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            key={todo.id}
            status={status}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
