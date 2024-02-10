import { DUMMY_PERSON } from "../app/constants";
import styles from "../styles/credit.module.css";

interface ICreditProps {  
  name: string;
  character: string;
  profile_path: string;
}

export default function Credit({name, character, profile_path }: ICreditProps) {  
  const isDummyPerson = profile_path === DUMMY_PERSON;
  return (    
    <div className={isDummyPerson ? styles.credit_fallback : styles.credit}>      
      <img src={profile_path} alt={name} />              
      <h3>{name}</h3>
      <h3>({character})</h3>
    </div>
  );
}