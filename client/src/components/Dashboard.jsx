import React, { useEffect, useState } from 'react'
import styles from '../assets/css/dashboard.module.css'
import { useNavigate } from 'react-router-dom'
import FileItem from './FileItem'
const Dashboard = ({ Signer }) => {
    const [files, setFiles] = useState()
    const nav = useNavigate()
    const fetchData = async () => {
        const allFiles = await Signer.getAllFiles()
        setFiles(allFiles)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <header className={styles.top} >
                <div>
                    <h1>Easy Care</h1>
                </div>
                <div>
                    <button> <img src="https://img.icons8.com/ios-glyphs/20/FFFFFF/exit.png" alt="exit" /> Logout</button>
                </div>
            </header>
            <main className={styles.main}>
                <div>
                    <button onClick={() => nav("/add-file")}> <img src="https://img.icons8.com/material-outlined/24/FFFFFF/add.png" alt="add" /> Add</button>
                </div>
            </main>
            <div className={styles.data} >
                {files?.length != 0 ? files?.map(file => {
                    return <FileItem file={file} />
                }) : <div>
                    <h2>
                        No files available !
                    </h2>
                    <span>
                        Click On Add Button To Add
                    </span>
                </div>
                }
            </div>
            {/* <header className={styles.top}>
                <h1>EasyCare</h1>
            </header>
            <div className={styles.dash}>
                <div className={styles.dash_btm}>
                    <div>
                        Welcome ,
                        <h3>USERNAME</h3>
                    </div>
                    <div>
                        <button className={styles.button} onClick={() => nav("/add-file")}>ADD</button>
                    </div>
                </div>
                <div className={styles.data}>
                    {files?.map(file => {
                        return <FileItem file={file} />
                    })}

                </div>
            </div> */}
        </>
    )
}

export default Dashboard