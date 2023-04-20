import React, { useState } from 'react';
import Link from 'next/link';


const apiKey = process.env.API_Key;
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
      <div className="flex flex-col items-center mt-16">
      <h1 className="text-2xl font-bold text-white mb-7 uppercase">Add exercise</h1>
      <form>
        <input className="w-80 sm:w-96 h-10 rounded-md indent-2" type="text" value={searchQuery} placeholder="Search name of exercise" onChange={handleChange} />
      </form>
      {searchQuery !== '' && (
        <ul className="bg-white w-80 sm:w-96 h-72 sm:h-96 overflow-scroll rounded-md indent-1.5">
          {filteredData.map((item) => (
            <Link key={item.id} href={`/exercise/${item.id}-${item.name}`}><li>{item.name.toUpperCase()}</li></Link>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}