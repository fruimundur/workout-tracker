import Image from "next/image";
import { useRouter } from 'next/router';


const apiKey = process.env.API_Key;
const apiUrl = `https://zylalabs.com/api/392/exercise+database+api/313/list+of+all+exercise`;

/* fetching data from the API. The data is an array of objects, and each object 
is an exercise with different properites describing that exercise/object */
export async function getServerSideProps() {
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


export default function Gif({data}) {
    const router = useRouter();

/* Extracting all of the values of the 'data' object and returning them as an array, so the filter method 
can be utilised to match the ID of the exercises with the query paramater which in this case includes the ID 
of the selected exercise. The filteredData variable now holds an array with one single object, which is the 
specific exercise we want to see the GIF for */
    const filteredData = Object.values(data).filter((item) =>
        item.id===router.query.gif
    );

    return(
        <>
            <h1>Yoyo!</h1>
            {filteredData.map((item) => (
                <Image className="mx-auto my-0 mt-28 rounded-lg"
                key={item.id} 
                src={item.gifUrl} 
                alt="gif"
                width={500}
                height={500} 
                />
            ))}
            <button className="w-48 h-14 block mx-auto my-0 bg-white/80 rounded-md font-bold mt-12" type="button" onClick={() => router.back()}>Go back</button>
        </>

    )
}