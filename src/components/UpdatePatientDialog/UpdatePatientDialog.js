import React, {useCallback, useMemo, useState} from 'react';
import './UpdatePatientDialog.css';
import {addUpdateFieldsConfig} from "../../constants";
import {useDispatch} from "react-redux";
import {updatePatientHandler} from "../../store/actions/patients";

const UpdatePatientDialog = ({item, onClose}) => {
    const dispatch = useDispatch();
    const [updatedData, setUpdatedData] = useState(item);

    const handleChange = useCallback((event) => {
        const {name, value} = event.target;
        setUpdatedData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }, [setUpdatedData])

    const handleSave = useCallback(() => {
        if (updatedData.first_name === '' || updatedData.last_name === '' ||
            updatedData.email === '' || updatedData.phone_number === '' || updatedData.date_of_birth === '') return alert('Please fill all the fields');

        dispatch(updatePatientHandler(updatedData.id, updatedData));
        onClose();
    }, [updatedData, onClose, dispatch])

    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose])

    const renderInputs = useMemo(() => {
        return addUpdateFieldsConfig.map((field, index) => {
            return (
                <div key={index} className="updateDialog__input">
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={updatedData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={`Update ${field.label}`}
                    />
                </div>
            );
        });
    }, [updatedData, handleChange]);

    return (
        <section className="updateDialog">
            <h1>Update Patient Details</h1>
            {renderInputs}
            <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </section>
    );
};

export default UpdatePatientDialog;
