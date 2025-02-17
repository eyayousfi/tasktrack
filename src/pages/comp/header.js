import React from "react";
import { NavLink } from "react-router";
import "./checkbox.css";

import { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { auth } from "../firebase/config";
import { useTranslation } from "react-i18next";

import { useAuthState } from "react-firebase-hooks/auth";
import "./header.css";
import { signOut } from "firebase/auth";
import "./theme.css";
import { Link } from "react-router-dom"; 

function Header() {
  const [user] = useAuthState(auth);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  return (
    <div>
      <header className="show-when-mobile">
        <div className="buttons">
          <i
            onClick={() => {
              toggleTheme(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-moon"
          ></i>
          <i
            onClick={() => {
              toggleTheme(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-sun"
          ></i>

          {!user && (
            <li className="main-list signin">
              <NavLink className="main-link" to="/signin">
                {t("signin")}
              </NavLink>
            </li>
          )}




                <ul className="sub-div lang  lnn">
                <li className="main-link language">
                  <p className="l">{t("language")}</p>
                  <ul className="lang-box">
                    <li
                      onClick={() => {
                        i18n.changeLanguage("ar");
                      }}
                      className="flex"
                      dir="auto"
                    >
                      <p>العربية</p>
                      {i18n.language === "ar" && (
                        <i className="fa-solid fa-check"></i>
                      )}
                    </li>
                    <li
                      onClick={() => {
                        i18n.changeLanguage("en");
                      }}
                      className="flex"
                    >
                      <p>English</p>
                      {i18n.language === "en" && (
                        <i className="fa-solid fa-check"></i>
                      )}
                    </li>
                    <li
                      onClick={() => {
                        i18n.changeLanguage("fr");
                      }}
                      className="flex"
                    >
                      <p>Français</p>
                      {i18n.language === "fr" && (
                        <i className="fa-solid fa-check"></i>
                      )}
                    </li>
                  </ul>
                </li>
              </ul>




          

          {!user && (
            <li className="main-list signup">
              <NavLink className="main-link" to="/signup">
                {t("signup")}
              </NavLink>
            </li>
          )}


          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("// Déconnexion réussie.");
                  })
                  .catch((error) => {});
              }}
              className="main-list signout"
            >
              <NavLink className="main-link" to="/signin">
                {t("signout")}
              </NavLink>
            </li>
          )}

<Link to="/" className="title logo">
      <h1>taskTrack</h1>
    </Link>          

          



          {user && (
            <div className="btn_o">
          

              <ul className="sub-div profiil">
                <li>
                  <NavLink className="main-link" to="/profil">
                    {t("profile")}
                  </NavLink>
                </li>
              </ul>

              {/* <ul className="sub-div aboutt">
                <li>
                  <NavLink className="main-link" to="/about">
                    {t("about")}
                  </NavLink>
                </li>
              </ul> */}
            </div>

            
          )}


        </div>

        
      </header>
    </div>
  );
}

export default Header;
