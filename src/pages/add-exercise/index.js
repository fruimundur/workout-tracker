import React, { useState } from 'react';
import styles from '@/styles/AddExercise.module.css'


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


export default function MyComponent({ data }) {
  const [searchQuery, setSearchQuery] = useState('');

// Extracting all of the values of the 'data' object and returning them as an array, 
// so we can apply the filter method to only get the name of the exercises
  const filteredData = Object.values(data).filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className={styles.box}>
      <h1>Add exercise</h1>
      <form>
        <input type="text" value={searchQuery} onChange={handleChange} />
      </form>
      {searchQuery !== '' && (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}