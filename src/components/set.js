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
the state of the 'reps' and 'kilos' variables so that these values are displayed in their correct set. */
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

        <table className="w-72 md:w-80 rounded-t-lg border-solid border-black text-center mx-auto my-0 mt-14 bg-white/80">
            <tbody>
                <tr>
                    <th className="border-b border-b-black" colSpan={2}>Set</th>
                </tr>
                <tr>
                    <td className="border-r border-b border-black font-bold">Reps</td>
                    <td className="border-b border-black font-bold">Kilos</td>
                </tr>
                <tr>
                    <td className="border-r border-black"><input className="border-none text-center w-32 rounded bg-white/0" onChange={handleChangeReps} value={reps}></input></td>
                    <td><input className="border-none text-center w-32 rounded bg-white/0" onChange={handleChangeKilos} value={kilos}></input></td>
                </tr>
            </tbody>
        </table>

        </>
    );
}