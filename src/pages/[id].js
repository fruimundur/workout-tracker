import styles from '@/styles/Exercise.module.css'
import Set from '../components/set.js'
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
        <h1 className={styles.headline}>{exerciseName}</h1>
        <button type="button" onClick={() => router.back()}>Go back</button>
        <Link href={`/gif/${exerciseID}`}><button className={styles.gifButton}>Gif</button></Link>
        {newSet.map(set => (
            <div key={set}>
                <Set id={set} />
                {set===0?null: <button onClick={() => deleteSet(set)} className={styles.deleteButton}>Delete set</button>}
            </div>
        ))}
        <button onClick={renderNewSet} className={styles.addButton}>+ Add set</button>
        <Link href="/"><button onClick={saveExercise} className={styles.saveButton}>Save</button></Link>
        </>
    );
}