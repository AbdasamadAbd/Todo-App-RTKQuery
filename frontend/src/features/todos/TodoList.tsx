import { useState } from "react"
import { FaTrash, FaUpload } from "react-icons/fa";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../api/apiSlice";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery({}); // this {} is just for fixing the error msg 1-2 args must be provide

    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addTodo({userId:1, title: newTodo, completed: false})
        setNewTodo('');
    };

    const newItemSection = 
    <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="">
            <input type="text" id="new-todo" 
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
            />
        </div>
        <button>
            <FaUpload/>
        </button>
    </form>

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos.map((todo: any) => {
            return (
                <article key={todo.id}>
                    <div className="">
                        <input type="checkbox" 
                            checked={todo.completed}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed})}
                        />
                        <label >{todo.title}</label>
                    </div>
                    <button onClick={()=> deleteTodo(todo.id)}>
                        <FaTrash/>
                    </button>
                </article>
            )
        })
    }else if (isError) {
        content = <p>{error as string}</p>
    }

  return (
    <main>
        <h1>Todo List</h1>
        {newItemSection}
        {content}
    </main>
  )
}

export default TodoList