import Link from "next/link";
import styles from "../styles/movie-info.module.css"
import { MOVIE_NOT_FOUND, API_URL } from "../app/constants";

export async function getMovie(id: string) {
  console.log(`Fetching movies: ${Date.now()}`);  
  //await new Promise((resolve) => setTimeout(resolve, 2_000));
  //throw Error("Something Broken...!!");
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export const moviePosterExists = (movie) => {
  return movie.poster_path === "https://image.tmdb.org/t/p/w780null"
};

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);

  return (
    <div className={styles.container}>      
      <img 
        src={moviePosterExists(movie) ? MOVIE_NOT_FOUND : movie.poster_path} 
        className={styles.poster} 
        alt={movie.title} 
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h3>⭐{movie.vote_average.toFixed(1)}</h3>
        <p>{movie.overview}</p>
        <h3>{movie.release_date ?? "1592-04-13"}</h3>
        <a href={movie.homepage} target={"_blank"}>
          Homepage &rarr;
        </a>
        <Link prefetch href={`${id}/credits`}>
          Credits &rarr;
        </Link>
        <Link href={`${id}/providers`}>
          Providers &rarr;
        </Link>
        <Link prefetch href={`${id}/similar`}>
          Similar Movies &rarr;
        </Link>
      </div>      
    </div>
  );
}