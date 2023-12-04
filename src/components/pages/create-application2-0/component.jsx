import classes from "./CreateApplication2_0.module.scss";
import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
export const CreateApplication2_0 = () => {
    const [profile_data, setProfile_data] = useState(null);
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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="d-flex">
            {loading ? (
                // Render the loading spinner while waiting for the response
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <DotLoader color={'#06691a'} loading={loading} size={100}/>
                </div>
            ) : (
                <div>
                    <div className={classes.infoWrapper}>
                        <h3 className={classes.name}> {profile_data.fio}</h3>
                        <ul className={classes.infoList}>
                            <li className={classes.infoDetail}><span>ИИН:</span> {profile_data.iin_bin}</li>
                            <li className={classes.infoDetail}><span>Дата рождения:</span> {profile_data.birth_date}</li>
                            <li className={classes.infoDetail}><span>Место рождения:</span> {profile_data.birth_place}</li>
                            <li className={classes.infoDetail}><span>Национальность:</span> {profile_data.nationality}</li>
                            <li className={classes.infoDetail}><span>Пол:</span> {profile_data.sex}</li>
                            <li className={classes.infoDetail}><span>E-mail:</span> {profile_data.email}</li>
                            <li className={classes.infoDetail}><span>Телефон:</span> {profile_data.phone_number}</li>
                            <li className={classes.infoDetail}><span>Образование:</span> {profile_data.education}</li>
                            <li className={classes.infoDetail}><span>Фактический адрес:</span> {profile_data.current_address}</li>
                        </ul>
                    </div>
                </div>
            )}
        </section>
    )
}