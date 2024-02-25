import React, {useEffect, useMemo} from 'react';
import './PatientsList.css';
import ListItem from "../ListItem/ListItem";
import {useDispatch, useSelector} from "react-redux";
import {getPatientsListHandler} from "../../store/actions/patients";
import Loader from "../Loader/Loader";

const PatientsList = ({onUpdate, onDelete}) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.patients);
    const {isLoading, error, patients} = state;

    useEffect(() => {
        dispatch(getPatientsListHandler());
    }, [dispatch]);

    const renderList = useMemo(() => {
        return patients.map(item => (
            <ListItem
                key={item.id}
                item={item}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        ));
    }, [patients, onUpdate, onDelete]);

    if (isLoading) return <Loader/>

    if (patients.length === 0) return <h1>No patients. Please add a patient</h1>

    return (
        <section className="listContainer">
            {error && <p>Error: {error}</p>}
            {!isLoading && (
                <table className="listContainer__table">
                    <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Date of birth</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderList}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default PatientsList;