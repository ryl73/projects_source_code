import React from 'react';
import {Link, Routes} from "react-router-dom";
import {Route} from "react-router";
import UserPage from "./components/UserPage";
import TodosPage from "./components/TodosPage";
import UserItemPage from "./components/UserItemPage";
import TodoItemPage from "./components/TodoItemPage";

const App = () => {
    return (
        <>
        <div>
            <Link to='/users'>
                Список пользователей
            </Link>
            <Link to='/todos'>
                Список дел
            </Link>
        </div>
            <Routes>
                <Route path="users" element={<UserPage />}/>
                <Route path="users/:id" element={<UserItemPage />}/>
                <Route path="todos" element={<TodosPage />}/>
                <Route path="todos/:id" element={<TodoItemPage />}/>
            </Routes>
        </>
    );
};

export default App;