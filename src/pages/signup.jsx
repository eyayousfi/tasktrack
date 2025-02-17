import Header from "./comp/header";
import Footer from "./comp/footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import Loading from "./comp/loading";
import { auth } from "./firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setName] = useState("");

  const [firebaseError, setfirebaseError] = useState();
  const [hasError, sethasError] = useState(false);

  const [user, loading] = useAuthState(auth);

  let navigate = useNavigate();
  const { t } = useTranslation(); // Translation hook

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
    return () => {};
  });

  const signup = (eo) => {
    eo.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email send");
        });

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError(t("invalid_email"));
            break;

          case "auth/invalid-password":
            setfirebaseError(t("invalid_password"));
            break;

          case "auth/user-not-found":
            setfirebaseError(t("email_not_found"));
            break;

          case "auth/missing-password":
            setfirebaseError(t("missing_password"));
            break;

          case "auth/too-many-requests":
            setfirebaseError(t("too_many_requests"));
            break;
          default:
            setfirebaseError(t("check_email_password"));
            break;
        }
      });
  };

  if (user && user.emailVerified) {
    navigate("/");
  } else if (loading) {
    return <Loading />;
  } else if (user && !user.emailVerified) {
    return (
      <div>
        <Header />
        <main className="verif">
          <h2>{t("verify_email")}</h2>
          <button className="verifb">{t("verify")}</button>
        </main>
        <Footer />
      </div>
    );
  } else if (!user) {
    return (
      <div>
        <Header />
        <Helmet>
          <title>{t("signup")}</title>
        </Helmet>
        <main>
          <div className="sign_in">
            <form>
              <p style={{ fontSize: "23px", marginBottom: "22px" }}>
                {t("create_account")}{" "}
                <span>
                  <i className="fa-solid fa-heart"></i>
                </span>
              </p>

              <input
                onChange={(eo) => setName(eo.target.value)}
                required
                type="text"
                placeholder={t("enter_name")}
              />

              <input
                onChange={(eo) => setemail(eo.target.value)}
                required
                type="email"
                placeholder={t("enter_email")}
              />

              <input
                onChange={(eo) => setpassword(eo.target.value)}
                required
                type="password"
                placeholder={t("enter_password")}
              />

              <button onClick={(eo) => signup(eo)}>{t("sign_up")}</button>
              <h1> </h1>
              <p className="account">
                {t("already_have_account")} <Link to="/Signin">{t("sign_in")}</Link>
              </p>
              {hasError && <h1>{firebaseError}</h1>}
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
};

export default Signup;
