import { React, useRef, useState } from 'react'
import styles from '../assets/css/login.module.css'
import { useNavigate } from 'react-router-dom';
const Login = ({ connectWallet }) => {
  const navigate = useNavigate()
  const type = useRef()
  const handleSubmit = (event) => {
    event.preventDefault();
    connectWallet().then((address) => {
      navigate(`/profile/${address}/${type.current.value}`)
    })
  };


  return (
    <div className={styles.app}>
      <div className={styles.login_form}>
        <div className={styles.head} >
          <img width="48" height="48" src="https://img.icons8.com/fluency/48/heart-with-pulse.png" alt="heart-with-pulse" />
          <div className={styles.title}>  Easy Care</div>
          <small className={styles.sub_title}>Lorem ipsum dolor sit amet consectetur.</small>
        </div>
        <div className={styles.main__select} >
          <div className={styles.sub_main} >Login as :-</div>
          <select className={styles.select_box} ref={type}  >
            <option value={styles.patient}>PATIENT</option>
            <option value={styles.doctor}>DOCTOR</option>
            <option value={styles.other}>OTHER</option>
          </select>
        </div>
        <button onClick={handleSubmit}> Login</button>
      </div>
    </div>
  );
}

export default Login