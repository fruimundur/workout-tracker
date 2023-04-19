import Set from '../../components/set.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link.js';


export default function ExercisePage() {
    const router = useRouter();
    const [newSet, setNewSet] = useState([0])

    function renderNewSet() {
        setNewSet(prevSets => [...prevSets, prevSets.length])
    }

    useEffect(() => {
        setNewSet(JSON.parse(localStorage.getItem(`${router.query.id}-newSetList`)) || [])
    }, [router.query.id])

    useEffect(() => {
        if (newSet.length < 2) return
        localStorage.setItem(`${router.query.id}-newSetList`, JSON.stringify(newSet))
    }, [newSet, router.query.id])


    function deleteSet(i) {
        const index = newSet.indexOf(i)
        const arr = [...newSet]
        arr.splice(index, 1)
        setNewSet(arr)
        localStorage.removeItem(`${router.query.id}-${i}-reps`)
        localStorage.removeItem(`${router.query.id}-${i}-kilos`)
    }

    const exerciseName = router.query.id ? router.query.id.slice(router.query.id.lastIndexOf('-') +1) : '';
    const exerciseID = router.query.id ? router.query.id.split('-')[0] : '';

    const nameAndID = {name: exerciseName, id: exerciseID}

    function saveExercise() {
        let savedArray = localStorage.getItem("savedArray")

        if (savedArray) {
            savedArray = JSON.parse(savedArray)
            for (let i = 0; i < savedArray.length; i++) {
                if (nameAndID.id === savedArray[i].id) {
                    return
                }
            }
            savedArray.push(nameAndID)
            localStorage.setItem("savedArray", JSON.stringify(savedArray))
        } else {
            let savedArray = []
            savedArray.push(nameAndID)
            localStorage.setItem("savedArray", JSON.stringify(savedArray))
        }
    }

    return (
        <>
        <h1 className="text-center uppercase text-white text-3xl font-bold mt-20">{exerciseName}</h1>
        {/* <button type="button" onClick={() => router.back()}>Go back</button> */}
        <Link href={`/gif/${exerciseID}`} className="block w-40 h-12 mb-20 mt-8 mx-auto bg-white/80 rounded font-bold text-center justify-center flex"><button>GIF</button></Link>
        {newSet.map(set => (
            <div key={set}>
                <Set id={set} />
                {set===0?null: <button onClick={() => deleteSet(set)} className="block w-96 mt-1 rounded-b-lg h-8 mx-auto bg-white/80">Delete set</button>}
            </div>
        ))}
        <button onClick={renderNewSet} className="block w-80 h-12 mt-20 mx-auto bg-white/80 rounded font-bold">+ Add set</button>
        <Link href="/" className="block w-40 h-12 mt-20 mx-auto bg-white/80 rounded font-bold mb-20 text-center justify-center flex"><button onClick={saveExercise}>Save</button></Link>
        </>
    );
}