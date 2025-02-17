import Header from "./comp/header";
import Footer from "./comp/footer";

import { useEffect } from "react";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./comp/loading.jsx";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) {
      // Redirect to login if not authenticated
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (loading) {
    return (
     <Loading />
    );
  }
  if (user) {
    if (user.emailVerified) {
      return (
        <div>
          <Header />
          <main>
            <div className="about"> About Page</div>
          </main>

          <Footer />
        </div>
      );
    }
  }
};

export default About;
