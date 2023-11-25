import classes from "./PersonalAccount.module.scss";

export const PersonalAccount = () => {
    return (
        <section className="d-flex">
            <div className={classes.photoWrapper}>
                <img src={require("../../../assets/images/profile.png")} alt="profile" width={150} height={150} />
                <h3 className={classes.fullname}>Фамилия Имя Отчество</h3>
            </div>
            <div className={classes.infoWrapper}>
                <h3 className={classes.name}>Фамилия Имя</h3>
                <ul className={classes.infoList}>
                    <li className={classes.infoDetail}><span>ИИН:</span> 123456789</li>
                    <li className={classes.infoDetail}><span>Дата рождения:</span> 12.12.1212</li>
                    <li className={classes.infoDetail}><span>Место рождения:</span> Шымкент</li>
                    <li className={classes.infoDetail}><span>Национальность:</span> Казах</li>
                    <li className={classes.infoDetail}><span>Пол:</span> Мужчина</li>
                    <li className={classes.infoDetail}><span>E-mail:</span> muzhik@mail.ru</li>
                    <li className={classes.infoDetail}><span>Телефон:</span> +7 777 7777 7777</li>
                    <li className={classes.infoDetail}><span>Образование:</span> школьное</li>
                    <li className={classes.infoDetail}><span>Фактический адрес:</span> Алматы</li>
                </ul>
            </div>
        </section>
    )
}