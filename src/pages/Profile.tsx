import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Button from "../components/Button";

 export const Profile = withAuthenticationRequired(() => {
     
     const {logout, user} = useAuth0()

     console.log(user);

     return (
         <>
             <section className='profile'>
                 <img src={user?.picture} alt={user?.name} />
                 <div>
                     <h2>{user?.name}</h2>
                     <p>{user?.email}</p>
                 </div>
             </section>
             <Button modificator={""} text={"Log Out"} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}></Button>
         </>
     )
 })