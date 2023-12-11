import React, { useState } from 'react'
import { Web3Storage } from 'web3.storage'
import styles from '../assets/css/addFile.module.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
const AddFile = ({ Signer }) => {
    const nav = useNavigate()
    const uploader = useRef()
    const [previewImage, setPreviewImage] = useState()
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const buffer = reader.result;
                setPreviewImage(buffer)
            };
            reader.readAsDataURL(file);
        }
    }
    const save = async (e) => {
        e.preventDefault()
        const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlDNDE0NTFDMjc5ZjBBMDYxOTNiMDc5YTcxMkNEMjAzYUE1ZjA1REYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA4MjI0MzI3MzIsIm5hbWUiOiJEYXBwIn0.EvAVqJ042nWSR78UJ-OESamhZfFAGY2zpdj80uNMx5k" })
        const cid = await client.put(e.target[0].files)
        const transaction = await Signer.uploadFile(cid, e.target[0].files[0].name, String(new Date().getTime()))
        transaction.wait().then((e) => {
            nav("/dashboard")
        })
    }
    return (
        <>
            <form onSubmit={(e) => save(e)} className={styles.main}  >
                <h2>Upload Documents</h2>
                <input type="file" ref={uploader} name="Import File" id="imptFile" onChange={(e) => handleFileUpload(e)} style={{ display: 'none' }} />
                <img width={180} height={180} src={previewImage ?? "https://th.bing.com/th/id/R.e2402c82def9caba22555a46e0136317?rik=8%2bbK%2fhiL8Iy1Hw&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fccard3dev%2fdynamic-yosemite%2f512%2fPreview-icon.png&ehk=f5yFN6fys4eZiTlgt3qOJgUhdTv8D5GBbO4WCs68aDU%3d&risl=&pid=ImgRaw&r=0"} />
                {/* <span className={styles.loader}></span> */}
                <div>
                    <button onClick={() => uploader.current.click()} type='button'  > <img src="https://img.icons8.com/material-outlined/24/FFFFFF/add.png" alt="add" /> Add</button>
                    <button type='submit' disabled={previewImage ? false : true} > <img src="https://img.icons8.com/material-rounded/24/FFFFFF/upload--v1.png" alt="upload--v1" />Upload
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddFile