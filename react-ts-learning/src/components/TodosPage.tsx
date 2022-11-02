import React, {FC, useEffect, useState} from 'react';
import {IToDo, IUser} from "../types/types";
import axios from "axios";
import List from "./List";
import TodoItem from "./TodoItem";

const TodosPage: FC = () => {
    const [todos, setTodos] = useState<IToDo[]>([]);

    useEffect(() => {
        fetchTodos();
    }, [])

    async function fetchTodos() {
        try {
            const response = await axios.get<IToDo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10');
            setTodos(response.data);
        } catch (e) {
            alert(e)
        }
    }
    return (
        <List items={todos} renderItem={(todo: IToDo) => <TodoItem todo={todo} key={todo.id}/>}/>
    );
};

export default TodosPage;