import React, { useState } from "react";
import Header from "../comp/header";
import Footer from "../comp/footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router";
import Modal from "../comp/shared/modal";
import "@fortawesome/fontawesome-free/css/all.css";
import "./signin.css";
import { useTranslation } from "react-i18next";


const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [resetPass, setresetPass] = useState("");
  let navigate = useNavigate();
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState();
  const [showSendEmail, setshowSendEmail] = useState(false);
  const [showModel, setshowModel] = useState(false);
  const { t } = useTranslation(); // Translation hook

  const forgotPassword = () => {
    setshowModel(true);
  };

  const CloseModal = () => {
    setshowModel(false);
  };

  const signin = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
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

  const resetpassword = (eo) => {
    eo.preventDefault();

    sendPasswordResetEmail(auth, resetPass)
      .then(() => {
        setshowSendEmail(true);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <div>
      <Header />
      <Helmet>
        <title>{t("signin")}</title>
      </Helmet>

      <main>
        <div className="sign_in">
          {showModel && (
            <Modal CloseModal={CloseModal}>
              <input
                onChange={(eo) => setresetPass(eo.target.value)}
                required
                type="email"
                placeholder={t("enter_email")}
              />
              <button onClick={(eo) => resetpassword(eo)}>{t("reset_password")}</button>
              {showSendEmail && (
                <p dir="auto" className="resetpass">{t("reset_email_sent")}</p>
              )}
            </Modal>
          )}

          <form>
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

            <button onClick={(eo) => signin(eo)}>{t("signin")}</button>

            <p className="account">
              {t("dont_have_account")} <Link to="/Signup">{t("sign_up")}</Link>
            </p>

            <p onClick={forgotPassword} className="forgot-txt">
              {t("forgot_password")}
            </p>

            {hasError && <h1>{firebaseError}</h1>}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signin;
