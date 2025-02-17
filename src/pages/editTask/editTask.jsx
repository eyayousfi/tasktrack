import { Helmet } from "react-helmet-async";
import "./editTask.css";
import Header from "../comp/header";
import Footer from "../comp/footer";
import {  auth } from "../firebase/config.js"; 

import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../comp/loading.jsx";
import SubtaskSection from "./2-SubtaskSection.jsx";
import TitleSection from "./1-TitleSection.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { doc ,updateDoc,arrayRemove ,deleteDoc} from "firebase/firestore";

import { db } from "../firebase/config";
import { useState } from "react";

function EditTask() {



  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate() ;

  let { stringId } = useParams();

const updateTitle = async(eo) => { 
  await updateDoc(doc(db, user.uid , stringId),{
    taskTitle:eo.target.value,
  
})}




// const addTask = async(eo) => { 
//   eo.preventDefault()
  
// }

const completedCheckbox = async(eo) => { 
  if (eo.target.checked) {
    await updateDoc(doc(db, user.uid, stringId), {
      completed: true
    });
    
  } else {
    await updateDoc(doc(db, user.uid, stringId), {
      completed: false
    });
  }
}

const deleteDetails = async (item) => { 

    await updateDoc(doc(db, user.uid, stringId), {
      details: arrayRemove(item),
   });
  };

 
  const [showData, setshowData] = useState(false);

 const deleteTask =  async(eo) => { 
  setshowData(true);
  await deleteDoc(doc(db, user.uid, stringId));
  navigate("/", { replace: true });

 }


    if (error) {
      return <h1>Error : {error.message}</h1>;
    }
  
    if (loading) {
      return <Loading />;
    }
  
  if (user)
  {return (
    <div>
      <Helmet>
        <title>Edit Page</title>
      </Helmet>

      <Header />

  {showData ? <Loading />
  :
      <div className="editTask ">
      {/* title  */}
    <TitleSection user={user} stringId={stringId } updateTitle={updateTitle} />

      {/* sub tasks section  */}
    
      <SubtaskSection user={user} stringId={stringId}    completedCheckbox={completedCheckbox}   deleteDetails={ deleteDetails} deleteTask={deleteTask}/>
    
    
    </div>


  }

      <Footer />
    </div>
  );
}}

export default EditTask;
