import {
    createPatientAPI,
    deletePatientAPI,
    fetchPatientsListAPI,
    updatePatientAPI
} from "../../api/patientsApi";

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const PATIENTS_LIST = "PATIENTS_LIST";
export const PATIENT_CREATE = "PATIENT_CREATE";
export const PATIENT_DELETE = "PATIENT_DELETE";
export const PATIENT_UPDATE = "PATIENT_UPDATE";

const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST,
    };
};

const fetchDataFailure = (error) => {
    return {
        type: FETCH_DATA_FAILURE,
        error
    };
};

function patientsList(patients) {
    return {
        type: PATIENTS_LIST,
        patients
    };
}

function createPatient(patient) {
    return {
        type: PATIENT_CREATE,
        patient
    };
}

function updatePatient(patient) {
    return {
        type: PATIENT_UPDATE,
        patient
    };
}

function deletePatient(patientId) {
    return {
        type: PATIENT_DELETE,
        patientId
    };
}

export const getPatientsListHandler = () => {
    return async dispatch => {
        dispatch(fetchDataRequest());
        try {
            const patients = await fetchPatientsListAPI();
            dispatch(patientsList(patients));
        } catch (error) {
            dispatch(fetchDataFailure(error));
        }
    };
}

export const createPatientHandler = (patientData) => {
    return async dispatch => {
        dispatch(fetchDataRequest());
        try {
            const patient = await createPatientAPI(patientData);
            if (patient) {
                dispatch(createPatient(patient));
            }
        } catch (error) {
            dispatch(fetchDataFailure(error));
        }
    };
}

export const updatePatientHandler = (patientId, patientData) => {
    return async dispatch => {
        dispatch(fetchDataRequest());
        try {
            const patient = await updatePatientAPI(patientId, patientData);
            if (patient) {
                dispatch(updatePatient(patient));
            }
        } catch (error) {
            dispatch(fetchDataFailure(error));
        }
    };
}

export const deletePatientHandler = (patientId) => {
    return async dispatch => {
        dispatch(fetchDataRequest());
        try {
            await deletePatientAPI(patientId);
            dispatch(deletePatient(patientId));
        } catch (error) {
            dispatch(fetchDataFailure(error));
        }
    };
}