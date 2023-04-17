import React, { useState } from 'react';
import styles from '@/styles/AddExercise.module.css'
import Link from 'next/link';


const apiKey = '1085|63aB9dCkx5xscui2Q6J32677rVKW0IbZXfWse7a2';
const apiUrl = `https://zylalabs.com/api/392/exercise+database+api/313/list+of+all+exercise`;

/* fetching data from the API. The data is an array of objects, and each object 
is an exercise with different properites describing that exercise/object */
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

export default function AddExercise({ data }) {
  const [searchQuery, setSearchQuery] = useState('');

/* Extracting all of the values of the 'data' object and returning them as an array, so the filter method 
can be utilised to match the name property of the exercises with the value of the searchQuery variable */
  const filteredData = Object.values(data).filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

// this function changes the state of the searchQuery variable to the input value
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className={styles.box}>
      <h1 className={styles.headline}>Add exercise</h1>
      <form>
        <input type="text" value={searchQuery} onChange={handleChange} />
      </form>
      {searchQuery !== '' && (
        <ul>
          {filteredData.map((item) => (
            <Link key={item.id} href={`/exercise/${item.id}-${item.name}`}><li>{item.name.toUpperCase()}</li></Link>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}