import styles from '@/styles/Exercise.module.css'
import Set from '../components/set.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';



const apiKey = '1085|63aB9dCkx5xscui2Q6J32677rVKW0IbZXfWse7a2';
const apiUrl = `https://zylalabs.com/api/392/exercise+database+api/313/list+of+all+exercise`;


export async function getStaticProps() {
    const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
  const data = await response.json();

  return {
    props: {data}
  };
}


export async function getStaticPaths() {
    const paths = [];
    return { paths, fallback: true };
}

export default function ExercisePage({data}) {
    const router = useRouter();
    const [newSet, setNewSet] = useState([0])

    function renderNewSet() {
        setNewSet(prevSets => [...prevSets, prevSets.length])
    }

    useEffect(() => {
        setNewSet(JSON.parse(localStorage.getItem(`${router.query.id}-newSetList`)) || [])
    }, [router.query.id])

    useEffect(() => {
        if (!newSet.length) return
        localStorage.setItem(`${router.query.id}-newSetList`, JSON.stringify(newSet))
    }, [newSet, router.query.id])



    function deleteSet(i) {
        const index = newSet.indexOf(i)
        const arr = [...newSet]
        arr.splice(index, 1)
        console.log(arr, index)
        setNewSet(arr)
        localStorage.removeItem(`${router.query.id}-${Set}-reps`)
    }


    return (
        <>
        {/* {data && Object.values(data).map((item) => (
        <h1 key={item.id}>{item.name}</h1>
        ))} */}
        {newSet.map(set => (
            <div key={set}>
                <Set id={set} />
                {set===0?null: <button onClick={() => deleteSet(set)} className={styles.deleteButton}>Delete set</button>}
            </div>
        ))}
        <button onClick={renderNewSet} className={styles.addButton}>+ Add set</button>
        <button className={styles.saveButton}>Save</button>
        </>
    );
}