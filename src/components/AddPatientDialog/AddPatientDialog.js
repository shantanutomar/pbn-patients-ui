import React, {useCallback, useMemo, useState} from 'react';
import './AddPatientDialog.css';
import {addUpdateFieldsConfig} from "../../constants";
import {createPatientHandler} from "../../store/actions/patients";
import {useDispatch} from "react-redux";

const AddPatientDialog = ({onClose}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        date_of_birth: ''
    });

    const handleChange = useCallback((event) => {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }, [setFormData])

    const handleSave = useCallback(() => {
        if (formData.first_name === '' || formData.last_name === '' || formData.email === '' || formData.phone_number === '' ||
            formData.date_of_birth === '') return alert('Please fill all the fields');

        dispatch(createPatientHandler(formData));
        onClose();
    }, [formData, onClose, dispatch])

    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);

    const renderInputs = useMemo(() => {
        return addUpdateFieldsConfig.map((field, index) => {
            return (
                <div key={index} className="addDialog__input">
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={`Enter ${field.label}`}
                    />
                </div>
            );
        });
    }, [formData, handleChange]);

    return (
        <section className="addDialog">
            <h1>Add Patient Details</h1>
            {renderInputs}
            <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </section>
    );
};

export default AddPatientDialog;
