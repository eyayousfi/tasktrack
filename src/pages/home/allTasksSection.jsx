import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { collection, query, orderBy, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ReactLoading from "../comp/loading.jsx";
import { db } from "../firebase/config.js";
import Moment from "react-moment";

const AllTasksSection = ({ user }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const [initialData, setinitialData] = useState(
    query(collection(db, user.uid), orderBy("id", "asc"))
  );
  const [value, loading, error] = useCollection(initialData);
  const [isFullOpacity, setisFullOpacity] = useState(false);

  if (error) {
    return <h1>{t("error") || "Error"}</h1>;
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </section>
    );
  }

  if (value) {
    return (
      <div>
        <section className="parent-of-btns">
          <button
            style={{ opacity: isFullOpacity ? "1" : "0.7" }}
            onClick={() => {
              setinitialData(query(collection(db, user.uid), orderBy("id", "desc")));
              setisFullOpacity(true);
            }}
          >
            {t("newest_first")}
          </button>

          <button
            style={{ opacity: isFullOpacity ? "0.7" : "1" }}
            onClick={() => {
              setinitialData(query(collection(db, user.uid), orderBy("id", "asc")));
              setisFullOpacity(false);
            }}
          >
            {t("oldest_first")}
          </button>

          <select
            id="browsers"
            onChange={(e) => {
              const selectedValue = e.target.value;

              if (selectedValue === "all-tasks") {
                setinitialData(collection(db, user.uid));
              } else if (selectedValue === "completed") {
                setinitialData(query(collection(db, user.uid), where("completed", "==", true)));
              } else if (selectedValue === "not-completed") {
                setinitialData(query(collection(db, user.uid), where("completed", "==", false)));
              }
            }}
          >
            <option value="all-tasks">{t("all_tasks")}</option>
            <option value="completed">{t("completed")}</option>
            <option value="not-completed">{t("not_completed")}</option>
          </select>
        </section>

        <section className="all-tasks">
          {value.docs.length === 0 && <h1>{t("no_tasks_left")}</h1>}

          {value.docs.map((item) => (
            <Link to={`./editTask/${item.data().id}`}>
              <article dir="auto" className="one-task">
                <h2>{item.data().taskTitle}</h2>
                <ul>
                  {item.data().details.map((detail, index) =>
                    index < 2 ? <li key={index}>{detail}</li> : null
                  )}
                </ul>
                <p className="time ">
                  <Moment fromNow date={item.data().id} />
                </p>
              </article>
            </Link>
          ))}
        </section>
      </div>
    );
  }
};

export default AllTasksSection;
