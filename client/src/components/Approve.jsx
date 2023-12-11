import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from "../assets/css/approve.module.css"
import { useEffect } from 'react'
const Approve = ({ Signer }) => {
    const [approvals, setApprovals] = useState()
    const { hash } = useParams()
    const nav = useNavigate()
    const approveAddress = (e) => {
        e.preventDefault()
        Signer.approveAccess(e.target[0].value, hash).then(() => {
            alert("Approved successfully")
            nav("/dashboard")
        })
    }
    const fetchApprovals = async () => {
        const approvals = await Signer.getApprovals(hash)
        setApprovals(approvals)
    }
    useEffect(() => {
        fetchApprovals()
    }, [])
    return (
        <div>
            {/* <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div> */}
            <form onSubmit={(e) => approveAddress(e)} className={styles.form}  >
                <h2>Approve Access</h2>
                <div>
                    <input type="text" placeholder="Address" id="Address" />
                </div>
                <button type='submit' >  Approve </button>
                <h4> Approvals </h4>
                <div >
                    {
                        approvals?.length != 0 ? approvals?.map((el, i) => {
                            return <>
                                <div key={i} >
                                    {i + 1}.{el}
                                </div>
                            </>
                        }) : <>
                            <small className={styles.subHeading} >This File doesn't have any approvals !</small>
                        </>
                    }
                </div>

            </form>
        </div>
    )
}

export default Approve