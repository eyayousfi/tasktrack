import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./comp/header";
import Footer from "./comp/footer";
import { deleteUser } from "firebase/auth";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

const Profil = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Translation hook

  useEffect(() => {
    if (!user && !loading) {
      // Redirect to login if not authenticated
      navigate("/");
    }

    if (user && !user.emailVerified) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Delete user function **************************
  const deleteAccount = () => {
    deleteUser(user)
      .then(() => {
        // User deleted
        console.log("User deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          <p>{t("loading")}</p> {/* Added translation for "loading" */}
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <main>
          <p>{t("error")}: {error.message}</p> {/* Translated error message */}
        </main>
        <Footer />
      </div>
    );
  }

  if (user) {
    return (
      <div dir="auto">
        <Header />
        <main className="profil">
          <h6>{t("email")} : {user.email}</h6> {/* Translated labels */}
          <h6>{t("username")} : {user.displayName}</h6>
          <h6>
            {t("last_signin")}:{" "}
            <Moment className="moment" fromNow date={user.metadata.lastSignInTime} />
          </h6>
          <h6>
            {t("account_created")}:{" "}
            <Moment className="moment" fromNow date={user.metadata.creationTime} />
          </h6>
          <button
            onClick={() => {
              deleteAccount();
            }}
            className="delete"
          >
            {t("delete_account")} {/* Translated delete account button */}
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
};

export default Profil;
