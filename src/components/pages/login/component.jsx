import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from './Login.module.scss';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(""); 

    const schema = yup.object().shape({
    iinbin: yup
      .string()
      .required("Это поле обязательное")
      .matches(/^[0-9]{12}$/, "BIN должен содержать ровно 12 цифр")
      .trim(),
    password: yup
      .string()
      .required("Это поле обязательное")
      .min(8, "Пароль должен содержать минимум 8 символов")
      .max(30, "Пароль не должен содержать больше 30 символов")
      .matches(/^[0-9a-zA-Zа-яА-Я_]*$/, "Пароль должен содержать только цифры, буквы и специальные символы"),
    });
    
    
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
    const [isLoading, setIsLoading] = useState(false);
    
   const onSubmit = async (dataForm) => {
      console.log("Submitting");
      setIsLoading(true);
      console.log("dataForm in the front", dataForm);
    
      try {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForm),
        });
    
        if (!response.ok) {
          throw new Error('Login failed');
        }
    
        const {access_token, role} = await response.json();
        console.log("data from Back", access_token, role);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("role", role);
        setErrMsg("");
        if (role === "client") {
          navigate("/main");
        } else if(role === "manager") {
          navigate("/manager-page");
        }
        reset();
    
      } catch (error) {
        console.error('Error:', error.message);
        setErrMsg("Неправильный ИИН или пароль. Попробуйте еще раз")
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <section>
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
      <div className='text-center'>
        <h2 className='pb-4'>Порталға кіру</h2>
        <p className={classes.formTitle}>Құрметті пайдаланушылар!</p>
        <p className={classes.formSubtitle}>Сіздің бейініңіздің қауіпсіздігін арттыру және қорғау мақсатында Сізге авторизациялау көп факторлы авторизация (логин (ЖСН/БСН) және пароль енгізілгеннен кейін ЭЦҚ міндетті түрде қол қою) қолданылатынын хабарлаймыз.Осы тәсіл Қазақстан Республикасы Үкіметінің 2016 жылғы 20 желтоқсандағы №832 қаулысымен бекітілген ақпараттық-коммуникациялық технологиялар және ақпараттық қауіпсіздікті қамтамасыз ету саласындағы бірыңғай талаптарға сәйкес енгізіледі.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper} autoComplete='off'>
        <div className={classNames(["d-flex flex-column p-3"])}>
            <label htmlFor="" className={classNames(["text-center", classes.formLabel])}>IIN/BIN *</label>
            <input
                type='text'
                maxLength={12}
                minLength={12}
                placeholder='--------------'
                {...register("iinbin")}
                className={classNames(["w-100 px-3 text-center", classes.formInput])}
            />
            <p className={classes.formInputError}>{errors.iinbin?.message}</p>
        </div>
        <div className={classNames(["d-flex flex-column p-3"])}>
            <label htmlFor="" className={classNames(["text-center", classes.formLabel])}>Жасырын сөз *</label>
            <input type='password' placeholder='********************' {...register("password")} className={classNames(["w-100 px-3 text-center", classes.formInput])}/>
            <p className={classes.formInputError}>{errors.password?.message}</p>
        </div>
        <div>
            <button className={classNames(['w-100', classes.formButton])} type='submit' disabled={isLoading}>{isLoading ? "..." : "Жүйеге кіру" }</button>
        </div>
        </form>
        {errMsg !== "" && <p>{errMsg }</p> }
      <Link to="/register" className={classes.formLink}>Зарегистрироваться</Link>
    </div>
    </section>
  );
};

