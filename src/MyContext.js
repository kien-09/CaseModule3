import {createContext, useState} from "react";

export const MyContext = createContext();
const MyContextProvider = ({children})=>{
    const [currentUser,setCurrentUser]=useState({username:"",password:""});
    const [listCarts, setListCarts] = useState([]);

    return(
        <MyContext.Provider value={{currentUser,setCurrentUser,listCarts, setListCarts}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider
