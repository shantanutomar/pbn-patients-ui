const baseUrl = 'http://127.0.0.1:8000';

export const fetchPatientsListAPI = async () => {
    try {
        const response = await fetch(`${baseUrl}/patients/list`, {
            method: 'GET',
        });
        return await response.json();
    } catch (error) {
        console.error(`Error occurred while fetching patients list: ${error}`);
    }
}

export const updatePatientAPI = async (patientId, patientDataToUpdate) => {
    try {
        const response = await fetch(`${baseUrl}/patients/${patientId}`, {
            method: 'PUT',
            body: JSON.stringify(patientDataToUpdate),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        return await response.json();
    } catch (error) {
        console.error(`Error occurred while updating patient: ${error}`);
    }
}

export const deletePatientAPI = async (patientId) => {
    try {
        await fetch(`${baseUrl}/patients/${patientId}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error(`Error occurred while deleting patient: ${error}`);
    }
}

export const createPatientAPI = async (patientDataToCreate) => {
    try {
        const response = await fetch(`${baseUrl}/patients/create`, {
            method: 'POST',
            body: JSON.stringify(patientDataToCreate),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        return await response.json();
    } catch (error) {
        console.error(`Error occurred while creating patient: ${error}`);
    }
}