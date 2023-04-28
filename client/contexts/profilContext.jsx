import { createContext, useState } from "react";

export const ProfilContext = createContext();

export function ProfilContextProvider(props){
  const [ backData, setBackData ] = useState({});
  const [ recherche, setRecherche ] = useState("");
  const [ JWT, setJWT ] = useState("");
  const [ role, setRole ] = useState("");

    return <ProfilContext.Provider value={{backData, setBackData, recherche, setRecherche, JWT, setJWT, role, setRole}}>
        {props.children}
    </ProfilContext.Provider> 
}