import Header from "../comp/header.js";
import Footer from "../comp/footer.js";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config.js"; // Ensure auth is imported correctly
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Loading from "../comp/loading.jsx";
import "./home.css";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import HomeModal from "./modal.js";
import AllTasksSection from "./allTasksSection.jsx";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  //functions of modal**************************

  const [showModel, setshowModel] = useState(false);
  const [array, setarray] = useState([]);

  const [details, setdetails] = useState("");

  const [title, settitle] = useState("");

  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const { t } = useTranslation(); // Translation hook

  const titleInput = (eo) => {
    settitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setdetails(eo.target.value);
  };

  const addBtn = (eo) => {
    eo.preventDefault();

    if (!array.includes(details)) {
      array.push(details);
    }
    console.log(array);

    setdetails("");
  };

  const AddNewTask = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);

    try {
      const taskId = new Date().getTime();
      await setDoc(doc(db, user.uid, `${taskId}`), {
        taskTitle: title,
        details: array,
        completed: false,
        id: taskId,
      });

      console.log("done");
      settitle("");
      setarray([]);
      setshowLoading(false);
      setshowModel(false);

      setshowMessage(true);
      setTimeout(() => {
        setshowMessage(false);
      }, 4000);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const CloseModal = () => {
    setshowModel(false);
    settitle("");
    setdetails("");
    setarray([]);
  };

  // Send verification email *******************************
  const sendEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("email re send");
    });
  };

  //****************************** */

  //loading*************************************************
  if (loading) {
    return <Loading />;
  }
  //user not signed in **************************************
  if (!user) {
    return (
      <div>
        <Header />
        <main>
          <p dir="auto" className="pls">
            {t('sign_in_message')}{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              {t('sign_in1')}
            </Link>{" "}
            {t('to_continue')}
            <span>  &nbsp;
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>
        <Footer />
      </div>
    );
  }
  
  //email not verified *************************************************
  if (user)
    if (!user.emailVerified) {
      return (
        <div>
          <Header />

          <main className="verif">
            <p className="welcome">
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>
            <h2>Please Verify your E-mail Adress</h2>
            <button
              onClick={() => {
                sendEmail();
              }}
              className="verifb"
            >
              {" "}
              Send E-mail{" "}
            </button>
          </main>
          <Footer />
        </div>
      );
    }
  //email verified **********************************************
  if (user.emailVerified) {
    return (
      <div>
        <Header />

        <main className="verif">
          {/* Optionss */}

          {/* show all tasks */}

          <AllTasksSection user={user} />

          {/* add new tasks */}

          <button
            onClick={() => {
              setshowModel(true);
            }}
            className="add-task-btn"
          >
            <i className="fa-regular fa-square-plus"></i> {t("add_new_task")}
          </button>

          {showModel && (
            <HomeModal
              CloseModal={CloseModal}
              titleInput={titleInput}
              detailsInput={detailsInput}
              addBtn={addBtn}
              AddNewTask={AddNewTask}
              details={details}
              title={title}
              array={array}
              showLoading={showLoading}
            ></HomeModal>
          )}

          <p
            style={{
              right: showMessage ? "650px" : "-100vw",
            }}
            className="show-Message"
          >
            <i className="fa-solid fa-check"></i> Task added successfully
          </p>
        </main>
        <Footer />
      </div>
    );
  }
};
export default Home;
