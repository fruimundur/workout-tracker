import { useState, useEffect } from 'react'
import styles from '@/styles/ExerciseBox.module.css'
import Link from 'next/link.js'


export default function ExerciseBox() {
const [savedArray, setSavedArray] = useState([])

useEffect(() => {
    const theArray = localStorage.getItem("savedArray")

    setSavedArray(JSON.parse(theArray))
}, [])

function deleteExercise() {
    
}

    return (
        <>
        {(savedArray)?
            savedArray.map((exerciseID) => (
                <>
                <Link key={exerciseID} href={`/${exerciseID.id}-${exerciseID.name}`}>
                    <div className={styles.box} key={exerciseID}>
                        <p className={styles.name}>{exerciseID.name}</p>
                    </div>
                </Link>
                <button onClick={() => deleteExercise(exerciseID)} className={styles.deleteButton}>Delete exercise</button>
                </>
            )):null
        }
        </>
    )
}