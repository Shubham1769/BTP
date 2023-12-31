import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/css/profile.module.css'
const Profile = ({ Contract, Signer }) => {
    const { address, type } = useParams()
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        const entries = e.target
        if (type.toLowerCase() == "patient") {
            const transaction = await Signer.createUser(entries[0].value, entries[1].value, entries[2].value)
            await transaction.wait().then(() => {
                navigate(`/dashboard`)
            })
        }
        else {
            console.log("working")
            const transaction = await Signer.createUser(entries[0].value, entries[1].value, entries[2].value)
            await transaction.wait().then(() => {
                navigate(`/dashboard/${type}}`)
            })
        }
    }
    return (
        <div>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form onSubmit={(e) => submit(e)} >
                <h3>{type[0].toUpperCase() + type.slice(1)}'s Profile</h3>
                <label for="username">Username</label>
                <input type="text" placeholder="Enter Name" />
                <label for="password">Age</label>
                <input type="number" placeholder="Enter age" />
                <label for="password">Contact Number</label>
                <input type="number" placeholder="Enter Contact Number" />
                <button type=''>Save</button>
            </form>
        </div>
    )
}

export default Profile