import React from "react";
import { useDocument  } from "react-firebase-hooks/firestore";
import { doc ,} from "firebase/firestore";
import { db } from "../firebase/config";
import { useRef } from "react";
const TitleSection = ({user, stringId ,updateTitle}) => {

  const [value,] = useDocument(doc(db, user.uid, stringId));

  const inputElement = useRef(null);


  console.log(stringId);
  console.log(typeof(stringId));


if(value){
  return (
    <section className="center mttt">
          <h2>
            <input

 
            style={{textDecoration: value.data().completed ? "line-through red  " : null}}
            ref={inputElement} 
              defaultValue={value.data().taskTitle}
              

              onChange={ async (eo) => {
            
                updateTitle(eo)
              
               }}
              className="title-input center "
              type="text"
            />{" "}
            <i onClick={() => {
                  inputElement.current.focus()
              
            }} className="fa-solid fa-pen-to-square"></i>
          </h2>
        </section>
  );
}
}

export default TitleSection;
