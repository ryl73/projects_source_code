import React, {FC, useEffect, useState} from 'react';
import {IToDo, IUser} from "../types/types";
import axios from "axios";
import User from "./User";
import List from "./List";
import {useNavigate} from "react-router";

const UserPage: FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [])

    async function fetchUsers() {
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (e) {
            alert(e)
        }
    }

    return (
        <List
            items={users}
            renderItem={(user: IUser) =>
                <User onClick={(user) => navigate(`/users/${user.id}`)} user={user} key={user.id}/>}
        />
    );
};

export default UserPage;