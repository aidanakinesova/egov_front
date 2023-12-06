import classes from "./CreateApplication.module.scss";
import React, { useState } from 'react';
// import { DotLoader } from 'react-spinners';
import {Link} from "react-router-dom";

export const CreateApplication = () => {
    // const [application_data, setApplication_data] = useState(null);
    // const [loading, setLoading] = useState(true);

    const [selectedService, setSelectedService] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleServiceChange = (event) => {
      setSelectedService(event.target.value);
    };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const services = ["Заявка на изменение персональных данных", "Заявка на получение информации по юридическому лицу"];

    return (
        <section className="d-flex">
            <div className={classes.titleContainer}>
                <div className={`${classes.dropdownContainer} ${isDropdownOpen ? 'open' : ''}`}>
                <label htmlFor="services">Выберите тип заявки:</label>
                <select
                    id="services"
                    className={classes.serviceDropdown}
                    value={selectedService}
                    onChange={handleServiceChange}
                    onClick={toggleDropdown}
                    onBlur={toggleDropdown}
                >
                    <option value="" disabled style={{'opacity':'50%'}}>Нажмите сюда...</option>
                    {services.map((service, index) => (
                    // <option key={index} value={index} disabled={index === 1}>
                    <option key={index} value={index}>
                      {service}
                    </option>
                    ))}
                </select>
                </div>
                <div>
                    <Link to={`/create-application2-${selectedService}`} className={`${classes.link} ${selectedService === "" ? classes.disabledLink : ''}`}>Продолжить</Link>
                </div>

            </div>
        </section>
    )
}