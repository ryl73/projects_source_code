import React, {FC} from 'react';
import {IToDo} from "../types/types";

interface ToDoItemProps {
    todo: IToDo;
}

const TodoItem: FC<ToDoItemProps> = ({todo}) => {
    return (
        <div>
            <input type="checkbox" checked={todo.completed}/>
            {todo.id}. {todo.title}
        </div>
    );
};

export default TodoItem;