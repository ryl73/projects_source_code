import React, {FC} from 'react';
import {IUser} from "../types/types";

interface UserProps {
    user: IUser;
    onClick: (user: IUser) => void;
}

const User: FC<UserProps> = ({user, onClick}) => {
    return (
        <div onClick={() => onClick(user)} style={{padding: 15, border: '1px solid gray'}}>
            {user.id}. {user.name} lives in the city {user.address.city} on the street {user.address.street}
        </div>
    );
};

export default User;