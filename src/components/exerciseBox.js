import { useState, useEffect } from 'react'
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
            <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:mx-52">
                {savedArray.map((exerciseID) => (                   
                    <div key={exerciseID}>
                        <Link className="w-72 h-24 my-0 mx-auto flex items-center justify-center bg-white/80 hover:bg-white/70 focus:bg-slate-200/60 rounded-t-lg xl:w-80 lg:h-32" href={`/exercise/${exerciseID.id}-${exerciseID.name}`}>
                            <p className="uppercase font-bold">{exerciseID.name}</p>
                        </Link>
                        <button className="w-72 h-9 bg-white/80 hover:bg-white/70 focus:bg-slate-200/60 mb-10 rounded-b-lg mt-1 xl:w-80" onClick={() => deleteExercise(exerciseID)}>Delete exercise</button>
                    </div>
                ))}
            </div>
        :null
        }
        </>
    )
}