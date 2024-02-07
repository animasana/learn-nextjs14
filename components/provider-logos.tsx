import { API_URL } from "../app/constants";
import styles from "../styles/provider-logos.module.css";
import { getUUIDV5 } from "./provider-country";

export async function getProviders(id: string) {
  const response = await fetch(`${API_URL}/${id}/providers`);
  return response.json();
}

interface IProviderProps {
  id: string;
  country: string;
  purchaseType: string;
}

export default async function ProviderLogos({id, country, purchaseType}: IProviderProps) {
  const providers = await getProviders(id);  

  return (          
    <div className={styles.container}>      
      <h1 className={styles.purchase_type}>{purchaseType.toUpperCase()}</h1>      
      <div className={styles.logo_container}>
        {
          providers[country] && providers[country][purchaseType] ?
          providers[country][purchaseType].map(
            provider => (
              <span className={styles.logo}>
                <img 
                  key={provider["provider_id"]} 
                  src={provider.logo_path.startsWith("http://") ? provider.logo_path : `https://image.tmdb.org/t/p/w300/${provider.logo_path}`} 
                  alt={provider["provider_name"]}
                />
                <figcaption>{provider["provider_name"]}</figcaption>
              </span>              
            )
          ) : (
            <h1 className={styles.no_provider}>Provider가 없습니다.</h1>
          )
        }
      </div>
    </div>    
  );  
}