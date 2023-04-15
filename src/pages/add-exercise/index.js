import React, { useState } from 'react';
import styles from '@/styles/AddExercise.module.css'
import Link from 'next/link';


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


export default function AddExercise({ data }) {
  const [searchQuery, setSearchQuery] = useState('');

// Extracting all of the values of the 'data' object and returning them as an array, 
// so the filter method can be utilised to match the name property of the exercises with the user's search query
  const filteredData = Object.values(data).filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );





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
            <Link key={item.id} href={`/${item.id}-${item.name}`}><li>{item.name.toUpperCase()}</li></Link>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

