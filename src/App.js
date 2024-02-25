import './App.css';
import PatientsList from "./components/PatientsList/PatientsList";
import {useState} from "react";
import AddPatientDialog from "./components/AddPatientDialog/AddPatientDialog";
import UpdatePatientDialog from "./components/UpdatePatientDialog/UpdatePatientDialog";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import {useDispatch} from "react-redux";
import {deletePatientHandler} from "./store/actions/patients";

const App = () => {
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);

    const handleDelete = item => {
        setSelectedItem(item);
        setShowDeleteConfirmationDialog(true);
    };

    const handleUpdate = item => {
        setSelectedItem(item);
        setShowUpdateDialog(true);
    };

    const handleCloseDialogs = () => {
        setShowUpdateDialog(false);
        setShowAddDialog(false);
        setShowDeleteConfirmationDialog(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deletePatientHandler(selectedItem.id));
        setShowDeleteConfirmationDialog(false);
    };

    return (
        <section className="appContainer">
            <header>
                <h1>Patients</h1>
            </header>
            <section className="addButtonListContainer">
                <button onClick={() => setShowAddDialog(true)} className="addButtonListContainer_button">Add Patient
                </button>
                <PatientsList onUpdate={handleUpdate} onDelete={handleDelete}/>
                {showAddDialog && (
                    <AddPatientDialog onClose={handleCloseDialogs}/>
                )}
                {showUpdateDialog && (
                    <UpdatePatientDialog item={selectedItem} onClose={handleCloseDialogs}/>
                )}
                {showDeleteConfirmationDialog && (
                    <DeleteConfirmationDialog
                        message="Are you sure you want to delete this item?"
                        onCancel={handleCloseDialogs}
                        onConfirm={handleConfirmDelete}
                    />
                )}
            </section>
        </section>
    );
}

export default App;
