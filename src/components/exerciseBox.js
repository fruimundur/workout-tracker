import { useState, useEffect } from 'react'
import styles from '@/styles/ExerciseBox.module.css'
import Link from 'next/link.js'


export default function ExerciseBox() {
const [savedArray, setSavedArray] = useState([])

/* Getting all of the exercises that have been saved to localStorage, and parsing them into an array.
In the return statement we will map through this array, and render all of the saved exercises in separate clickable boxes */
useEffect(() => {
    const theArray = localStorage.getItem("savedArray")
    setSavedArray(JSON.parse(theArray))
}, [])

/* This function gets all of the exercises that have been saved to localStorage, and parses them into an array. It then creates 
a new array called 'newArray' by using the filter method on 'theArray'. The new array which the filter method returns only 
includes the objects who's ID is not equal to the ID of the object being clicked on. This leaves out one object, which is the 
one that is to be deleted. */
function deleteExercise(exerciseID) {
    const theString = localStorage.getItem("savedArray")
    const theArray = JSON.parse(theString)
    const newArray = theArray.filter((exercise) => {
        return exercise.id !== exerciseID.id
    })
    setSavedArray(newArray)
    localStorage.setItem("savedArray", JSON.stringify(newArray))
}

    return (
        <>
        {(savedArray)?
            savedArray.map((exerciseID) => (
                <>
                    <div>
                        <Link className={styles.link} key={exerciseID} href={`/exercise/${exerciseID.id}-${exerciseID.name}`}>
                            <p className={styles.name}>{exerciseID.name}</p>
                        </Link>
                        <button onClick={() => deleteExercise(exerciseID)} className={styles.deleteButton}>Delete exercise</button>
                    </div>
                </>
            )):null
        }
        </>
    )
}