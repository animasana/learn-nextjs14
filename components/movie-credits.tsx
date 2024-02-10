import Credit from "./credit";
import styles from "../styles/credits.module.css"
import { API_URL, DUMMY_PERSON } from "../app/constants";
import Link from "next/link";

export async function getCredits(id: string) {
  const response = await fetch(`${API_URL}/${id}/credits`);
  return response.json();  
}

export interface Credit {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export function BackButton({ id }: { id: string }) {
  return (    
    <span className={styles.anchor_back}>
      <Link prefetch href={`/movies/${id}`}>&larr; Back to the movie info</Link>
    </span>    
  )
}

function CreditsList({ credits }: { credits: Credit[] }) {
  return (
    <div className={styles.container}>
      {credits.map((credit) => (
        <Credit
          key={credit.id}
          name={credit.name}
          character={credit.character}
          profile_path={credit.profile_path ?? DUMMY_PERSON}
        />
      ))}
    </div>
  );
}

export function NotFoundMessage({ text }: { text: string }) {
  return <h1 className={styles.not_found}>{text}</h1>;
}

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await getCredits(id);

  if (credits.length !== 0) {
    return (
      <>
        <BackButton id={id}/>
        <CreditsList credits={credits} />
      </>
    );
  }
  
  return (
    <>
      <NotFoundMessage text="Credit Not Found!!!" />
    </>
  );
    
}