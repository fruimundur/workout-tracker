import styles from '@/styles/Exercise.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';


export default function Set({id}) {
    const router = useRouter();
    const [reps, setReps] = useState('')
    const [kilos, setKilos] = useState('')

// The following two functions save the user's input values to localStorage. 
/* First the input value is stored in the 'value' variable, which is then set as the value to be saved to localStorage. 
The key for localStorage is the query parameter (in this case the ID of the exercise) combined with the 'id' prop which 
is passed down from the parent component in the [id].js page and a reps/kilos string. Finally the 'value' variable is 
updating the state of the 'reps' and 'kilos' variables, so these can be set as the displayed value in the input fields. */ 
    const handleChangeReps = (event) => {
        const value = event.target.value;
        localStorage.setItem(`${router.query.id}-${id}-reps`, value);
        setReps(value);
      };

    const handleChangeKilos = (event) => {
      const value = event.target.value;
      setKilos(value); 
      localStorage.setItem(`${router.query.id}-${id}-kilos`, value);
    };

/* This useEffect hook is triggered whenever the query parameter (in this case the ID of the exercise) and/or the 'id' 
prop change. This happens whenever a new exercise page is opened or a new set is created. What the hook does is it updates 
the state of the 'reps' and 'kilos' variables so that these values are displayed in the new set. */
    useEffect(() => {
        const savedReps = localStorage.getItem(`${router.query.id}-${id}-reps`)
        if (savedReps) {
            setReps(savedReps)
        }
        const savedKilos = localStorage.getItem(`${router.query.id}-${id}-kilos`)
        if (savedKilos) {
            setKilos(savedKilos)
        }
   }, [router.query.id, id])

    return (
        <>

        <table className={styles.table}>
            <tbody>
                <tr>
                    <th className={styles.tableCellSet} colSpan={2}>Set</th>
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