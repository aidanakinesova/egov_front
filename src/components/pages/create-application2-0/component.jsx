import classes from "./CreateApplication2.module.scss";
import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import CreateConfirmationModal from './confirmation';


export const CreateApplication2 = () => {
    const navigate = useNavigate();
    const [profile_data, setProfile_data] = useState(null);
    const [editableFields, setEditableFields] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");

                const response = await fetch('http://localhost:8000/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setProfile_data(data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (key, value) => {
        setEditableFields((prevFields) => ({ ...prevFields, [key]: value }));
    };

     const profileFields = [
        { label: 'ФИО:', key: 'fio' },
        { label: 'ИИН:', key: 'iin_bin' },
        { label: 'Дата рождения:', key: 'birth_date' },
        { label: 'Место рождения:', key: 'birth_place' },
        { label: 'Национальность:', key: 'nationality' },
        { label: 'Пол:', key: 'sex' },
        { label: 'E-mail:', key: 'email' },
        { label: 'Телефон:', key: 'phone_number' },
        { label: 'Образование:', key: 'education' },
        { label: 'Фактический адрес:', key: 'current_address' },
    ];

     const saveChanges = async () => {
         console.log("Submitting");
        const accessToken = localStorage.getItem("access_token");
         try {
             const response = await fetch('http://localhost:8000/update_profile', {
                 method: 'POST',
                 headers: {
                     'Authorization': `Bearer ${accessToken}`,
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(editableFields),
             });

             if (!response.ok) {
                 throw new Error('Register failed');
             }

             const message = await response.json();
             console.log("Message", message[0]);

         } catch (error) {
             console.error('Error:', error.message);
         }
     };

     const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleConfirmation = () => {
        setShowConfirmationModal(false);
        saveChanges();
        navigate("/applications");
    };

    return (
        <section className="d-flex">
            {loading ? (
                // Render the loading spinner while waiting for the response
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <DotLoader color={'#06691a'} loading={loading} size={100}/>
                </div>
            ) : (
                <div>
                    <form>
                        {profileFields.map((field, index) => (
                            <div key={index} className={classes.formfield}>
                                <label>
                                    {field.label}
                                    <input
                                        type="text"
                                        value={editableFields[field.key] || profile_data[field.key]}
                                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                                    />
                                </label>
                            </div>
                        ))}
                    </form>
                    <div>
                        <Button onClick={() => setShowConfirmationModal(true)}>Продолжить</Button>
                    </div>

                    <CreateConfirmationModal
                        show={showConfirmationModal}
                        onHide={() => setShowConfirmationModal(false)}
                        onConfirm={handleConfirmation}
                    />
                </div>
            )}
        </section>
    )
}