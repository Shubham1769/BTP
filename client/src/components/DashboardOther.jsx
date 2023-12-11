import React from 'react'
import styles from '../assets/css/dashboardOther.module.css'
const DashboardOther = ({ Signer }) => {
    const getFile = async (e) => {
        e.preventDefault()
        await Signer.canAccess(String(e.target[0].value)).then((res) => {
            if (res) {
                console.log(res)
                Signer.getFile(e.target[0].value).then((e) => {
                    window.open(`https://${e.fileCid}.ipfs.w3s.link/${e.fileName}`)
                })
            }
            else {
                alert("You cant access this files")
            }
        })
    }
    return (
        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form onSubmit={(e) => getFile(e)}>
                <h3>Doctor's Dashboard</h3>
                <div>
                    <label for="File">File id</label>
                    <input type="text" placeholder="Enter File id" />
                </div>
                <button type='submit' >View</button>
            </form>
        </>
    )
}

export default DashboardOther