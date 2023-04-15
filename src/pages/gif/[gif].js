import Image from "next/image";
import { useRouter } from 'next/router';

const apiKey = '1085|63aB9dCkx5xscui2Q6J32677rVKW0IbZXfWse7a2';
const apiUrl = `https://zylalabs.com/api/392/exercise+database+api/313/list+of+all+exercise`;


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

    const filteredData = Object.values(data).filter((item) =>
        item.id===router.query.gif
    );

    return(
        <>
            <h1>Yoyo!</h1>
            <button type="button" onClick={() => router.back()}>Go back</button>
            {filteredData.map((item) => (
                <Image 
                key={item.id} 
                src={item.gifUrl} 
                alt="gif"
                width={500}
                height={500} 
                />
            ))}
        </>

    )
}