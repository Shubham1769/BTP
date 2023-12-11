import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/css/fileItem.module.css'
const FileItem = (props) => {
  const nav = useNavigate()
  const viewFile = (cid, filename) => {
    window.open(`https://${cid}.ipfs.w3s.link/${filename}`)
  }
  const copyHash = (hash) => {
    navigator.clipboard.writeText(hash)
  }
  const getDate = (timeStamp) => {
    const date = new Date(Number(timeStamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day}/${month.toString().padStart(2, "0")}/${year.toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return (
    <div className={styles.main}>
      <span>
        <div>
          <span>File Name:</span>
          <h3> {props.file.fileName}</h3>
        </div>
        <div>
          <span>Uploaded At:
          </span>
          <h3>
            {getDate(props.file.createdAt)}
          </h3>
        </div>
        <div>
          <span>
            File Hash:
          </span>
          <h3>
            {props.file.fileCid}
          </h3>
        </div>
      </span>
      <div className={styles.actions}>
        <button className={styles.button} onClick={() => nav(`/approve-address/${props.file.fileCid}`)} ><img width="24" height="24" src="https://img.icons8.com/material-outlined/20/FFFFFF/user-credentials.png" alt="user-credentials" /> </button>
        <button className={styles.button} onClick={() => viewFile(props.file.fileCid, props.file.fileName)} ><img src="https://img.icons8.com/ios-glyphs/20/FFFFFF/visible--v1.png" alt="visible--v1" /></button>
        <button className={styles.button} onClick={() => copyHash(props.file.fileCid)} > <img width="24" height="24" src="https://img.icons8.com/material-outlined/20/FFFFFF/copy.png" alt="copy" /> </button>
      </div>
    </div>
  )
}

export default FileItem