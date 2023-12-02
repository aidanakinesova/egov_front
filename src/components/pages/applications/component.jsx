import classes from "./Applications.module.scss";
import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import {Link} from "react-router-dom";

const formatTimestamp = (timestamp) => {
    if (!timestamp){
        return
    }

    const dateObject = new Date(timestamp);

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Almaty', // Adjust the time zone as needed
    };

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', options);

    const formattedDate = dateFormatter.format(dateObject);

    return `${formattedDate}`;
};
export const Applications = () => {
    const [application_data, setApplication_data] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");

                const response = await fetch('http://localhost:8000/client_requests', {
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
                setApplication_data(data);
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
                    <div>
                        <Link to="/create_application" style={{
                            'text-decoration': 'none',
                            'color': '#fff',
                            'background-color': '#06691a',
                            'padding': '10px 20px',
                            'margin': '',
                            'border-radius': '4px'
                        }}>Создать новую заявку</Link>
                    </div>
                    {application_data && application_data.data && application_data.data.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Статус</th>
                                    <th>Услуга</th>
                                    <th>Номер</th>
                                    <th>Дата отправки заявки</th>
                                    <th>Дата закрытия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {application_data.data.map((item) => (
                                <tr key={item.id}>
                                    <td class="status">{item.status}</td>
                                    <td class="service">Заявка на изменение профиля</td>
                                    <td>{item.id}</td>
                                    <td>{formatTimestamp(item.create_dttm)}</td>
                                    <td>{formatTimestamp(item.close_dttm)}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        ) : (
                        <p>Нет заявок.</p>
                    )}
                </div>
            )}
        </section>
    )
}