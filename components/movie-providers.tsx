import { getMovie, moviePosterExists } from "./movie-info";
import ProviderCountry from "./provider-country";
import { MOVIE_NOT_FOUND } from "../app/constants";
import styles from "../styles/providers.module.css"
import { BackButton } from "./movie-credits";

export default async function MovieProviders({ id }: {id: string}) {
  const movie = await getMovie(id);

  return (
    <>
      <BackButton id={id} />
      <div className={styles.container}>
        <img 
          src={moviePosterExists(movie) ? MOVIE_NOT_FOUND : movie.poster_path} 
          className={styles.poster} 
          alt={movie.title} 
        />      
        <div className={styles.icons}>        
          <ProviderCountry id={id} country="KR" />
          <ProviderCountry id={id} country="US" />        
        </div>
      </div>
    </>
  );
}