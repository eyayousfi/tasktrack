import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";
import Loading from "../comp/loading";
import Moment from "react-moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";




const SubtaskSection = ({
  user,
  stringId,
  completedCheckbox,
  deleteDetails,
  deleteTask,
  
}) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [subTitle, setsubTitle] = useState("");
  const { t } = useTranslation(); // Translation hook

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      document.getElementById("add-btn").click();
    }
  };

  if (error) {
    return <h1>{t("error")} : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (value) {
    return (
      <section className="sub-task">
        <div className="flex top">
          <p dir="auto" className="time">
            {t("created")} : <Moment className="time" fromNow date={value.data().id} />
          </p>

          <div>
            <input
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
              onChange={async (eo) => completedCheckbox(eo)}
            />
            <label htmlFor="checkbox">{t("completed")}</label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => (
            <li key={item} className="card-task">
              <p>{item}</p>
              <i
                onClick={() => deleteDetails(item)}
                className="fa-solid fa-trash-can trash"
              ></i>
            </li>
          ))}
        </ul>

        {showAddNewTask && (
          <div className="add-new-task">
            <input
              value={subTitle}
              onChange={(eo) => setsubTitle(eo.target.value)}
              id="add-input"
              onKeyUp={handleKeyUp}
              className="add-task"
              type="text"
            />

            <div className="btn22">
              <button
                onClick={async () => {
                  await updateDoc(doc(db, user.uid, stringId), {
                    details: arrayUnion(subTitle),
                  });
                  setsubTitle("");
                }}
                className="add"
                id="add-btn"
              >
                {t("add")}
              </button>

              <button
                onClick={() => setshowAddNewTask(false)}
                className="cancel"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        )}

        <div className="center mttt">
          <button
            onClick={() => setshowAddNewTask(prevState => !prevState)}
            className="add-more-btn"
          >
            {t("add_more")} <i className="fa-solid fa-plus"></i>
          </button>

          <button onClick={deleteTask} className="delete">
            <i className="fa-solid fa-trash-can del moins"></i> {t("delete_task")}
          </button>
        </div>
      </section>
    );
  }
};

export default SubtaskSection;
