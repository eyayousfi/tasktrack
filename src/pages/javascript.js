import Header from "./comp/header";
import Footer from "./comp/footer";
import MainContent from "./comp/mainContent";
import { Helmet } from "react-helmet-async";

import { useEffect } from "react";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";

const Javascript = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div>
      <Header />
      <Helmet>
        <title>Java script</title>
      </Helmet>
      <MainContent pageName="Javascript" />

      <Footer />
    </div>
  );
};

export default Javascript;
