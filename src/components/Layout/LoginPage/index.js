import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

const cx = classNames.bind(styles);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleChangeForm = () => setIsLogin(!isLogin);
  return (
    <div className={cx("login-page")}>
      <div className={cx("login-page__form")}>
        <div className={cx("logo")}>
          <h3>Wi-Mesh</h3>
        </div>
        {isLogin ? (
          <Login onChangeForm={handleChangeForm} />
        ) : (
          <SignUp onChangeForm={handleChangeForm} />
        )}
      </div>
      <div className={cx("login-page__banner")}>
        <h3>Amazing Wireframes</h3>
        <p>
          User Experience & Interface Design, Product Strategy
          <br />
          Web Application SaaS Solutions
        </p>
        <img src="./assets/images/bg-image.svg" alt="logo" />
      </div>
    </div>
  );
}
