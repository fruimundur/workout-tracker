import styles from '@/styles/Exercise.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';



export default function Set({ data }) {
    const router = useRouter();
    const [reps, setReps] = useState('')
    const [kilos, setKilos] = useState('')

       useEffect(() => {
            const savedReps = localStorage.getItem(`${router.query.id}-reps`)
            if (savedReps) {
                setReps(savedReps)
            }
            const savedKilos = localStorage.getItem(`${router.query.id}-kilos`)
            if (savedKilos) {
                setKilos(savedKilos)
            }
       }, [router.query.id])

    const handleChangeReps = (event) => {
        const value = event.target.value;
        setReps(value);
        localStorage.setItem(`${router.query.id}-reps`, value);
      };

    const handleChangeKilos = (event) => {
      const value = event.target.value;
      setKilos(value); 
      localStorage.setItem(`${router.query.id}-kilos`, value);
    };

    return (
        <>
        {Object.values(data).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
        ))}
        <table className={styles.table}>
            <tbody>
                <tr>
                    <th className={styles.tableCellSet} colSpan={2}>Set 1</th>
                </tr>
                <tr>
                    <td className={styles.tableCellReps}>Reps</td>
                    <td className={styles.tableCellWeight}>Kilos</td>
                </tr>
                <tr>
                    <td className={styles.yo}><input className={styles.input} onChange={handleChangeReps} value={reps}></input></td>
                    <td><input className={styles.input} onChange={handleChangeKilos} value={kilos}></input></td>
                </tr>
            </tbody>
        </table>

        </>
    );
}