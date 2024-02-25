import React from 'react';
import './ListItem.css';

const ListItem = ({item, onUpdate, onDelete}) => {

    const onItemUpdate = (event) => {
        event.stopPropagation();
        onUpdate(item)
    }

    const onItemDelete = (event) => {
        event.stopPropagation();
        onDelete(item)
    }

    return (
        <tr className="itemContainer">
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td>{item.date_of_birth}</td>
            <td>
                <button onClick={(event) => onItemUpdate(event)}>Update</button>
                <button onClick={(event) => onItemDelete(event)}>Delete</button>
            </td>
        </tr>
    );
};

export default ListItem;
