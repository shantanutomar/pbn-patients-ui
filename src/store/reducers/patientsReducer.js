import {
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    PATIENT_CREATE, PATIENT_DELETE,
    PATIENT_UPDATE,
    PATIENTS_LIST
} from "../actions/patients";

const initialState = {
    patients: [],
    isLoading: false,
    error: null
};

export default function patientsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, isLoading: true, error: null}
        case FETCH_DATA_FAILURE:
            return {...state, error: action.error, isLoading: false};
        case PATIENTS_LIST:
            return {...state, patients: action.patients, isLoading: false};

        case PATIENT_CREATE:
            return {...state, patients: [...state.patients, action.patient], isLoading: false, error: null};
        case PATIENT_UPDATE:
            const updatedPatients = state.patients.map(patient => {
                if (patient.id === action.patient.id) {
                    return action.patient;
                }
                return patient;
            });
            return {...state, patients: updatedPatients, isLoading: false, error: null};
        case PATIENT_DELETE:
            const remainingPatients = state.patients.filter(patient => patient.id !== action.patientId);
            return {...state, patients: remainingPatients, isLoading: false, error: null};
        default:
            return state;
    }
}
