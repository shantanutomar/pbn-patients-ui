import React from 'react';
import './DeleteConfirmationDialog.css';

const ConfirmationDialog = ({message, onCancel, onConfirm}) => {
    return (
        <section className="deleteConfirmationDialog">
            <p>{message}</p>
            <div>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Confirm</button>
            </div>
        </section>
    );
};

export default ConfirmationDialog;
