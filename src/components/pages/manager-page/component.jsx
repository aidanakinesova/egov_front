import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DotLoader } from 'react-spinners';
// import { Link } from "react-router-dom";
import classes from "./ManagerPage.module.scss";


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


export const ManagerPage = () => {


    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem("access_token") || localStorage.getItem("role") !== "manager") {
            // navigate("/main");
        }
    }, [navigate])
   
    const [application_data, setApplication_data] = useState();
    const [selectedApplicationData, setSelectedApplicationData] = useState();
    const [loading, setLoading] = useState(true);


    const [selectedAppId, setSelectedAppId] = useState();


    useEffect(() => {
        // setApplication_data(Applications);
        setLoading(false);
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");


                const response = await fetch('http://localhost:8000/manager_requests', {
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
                setApplication_data(data.data);
                // console.log(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };


        fetchData();
    }, []);


    const [openMocal, setOpenModal] = useState(false);


    const onRowClickHandler = (id) => {
        setOpenModal(true);
        console.log(id)
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");


                setSelectedAppId(id);


                const response = await fetch('http://localhost:8000/manager_requests_detail', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_app: id,
                    })
                });


                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }


                const data = await response.json();
                console.log(data)
                setSelectedApplicationData(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };


        fetchData();
        // setSelectedApplicationData(application_data.filter((el)=>el.id===id)[0])
    }


    const sendRequestHandle = (requestStatus) => {
        setOpenModal(false);
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");




                const response = await fetch('http://localhost:8000/manager_requests_response', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                     id_app: selectedAppId,
                     status: requestStatus
                    })
                });


                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }


                const data = await response.json();
                console.log(data)
                // setSelectedApplicationData(data);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                // setLoading(false);
            }
        };


        fetchData();
       
    }


    return (
        <section className={classes.wrapper}>
            {loading ? (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <DotLoader color={'#06691a'} loading={loading} size={100}/>
                </div>
            ) : (
                <div>
                    {/* <div className={classes.linkdiv}>
                        <Link to="/create-application" className={classes.link}>Создать новую заявку</Link>
                    </div> */}
                    <div>
                    {application_data?.length > 0 ? (
                        <table className="col-10 mx-auto">
                            <thead>
                                <tr>
                                    <th>Услуги</th>
                                    <th>Номер</th>
                                    <th>Дата отправки заявки</th>
                                </tr>
                            </thead>
                            <tbody>
                                {application_data.map((item, index) => (
                                <tr key={`${item.id}-${index}-app-data`}  className={classes.rowWrapper} onClick={()=>onRowClickHandler(item.id)}>
                                    <td>Заявка на изменение профиля</td>
                                    <td>{item.id}</td>
                                    <td>{formatTimestamp(item.create_dttm)}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        ) : (
                        <p>Нет заявок.</p>
                    )}
                    </div>
                </div>
            )}
            {openMocal &&
                <div className={classes.modalWrapper}>
                    <button className={classes.closeBtn} onClick={()=>setOpenModal(false)}>X</button>
                    <div className="d-flex justify-content-around">
                        <div>
                            <table className={classes.appDetailTable}>
                            <thead className="">
                                <tr>
                                    <th>Старые данные</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="d-flex flex-column">
                                {selectedApplicationData.map((el) => (
                                    <td>{el?.old_value}</td>
                                ))}
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div>
                            <table className={classes.appDetailTable}>
                            <thead>
                                <tr>
                                    <th>Новые данные</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="d-flex flex-column">
                                    {selectedApplicationData.map((el) => (
                                    <td>{el?.new_value}</td>
                                ))}
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between my-4 mx-5">
                        <button className={classes.btnWrapper} onClick={()=>setOpenModal(false)}>назад</button>
                        <div className="d-flex">
                            <button className={classes.btnWrapper} onClick={()=>sendRequestHandle(0)}>Отклонить</button>
                            <button className={classes.btnWrapper} onClick={()=>sendRequestHandle(2)}>Подтвердить</button>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}