import React from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

export default function Login({ onChangeForm }) {
  return (
    <div className={cx("login")}>
      <h4>Login</h4>
      <p>
        Or{" "}
        <button className="text-primary text-link btn" onClick={onChangeForm}>
          Create An Account
        </button>
      </p>
      <form className={cx("login__form")}>
        <div className={cx("form-group")}>
          <p className={cx("form-group__label")}>Phone number</p>
          <input type="number" />
          <p className={cx("form-group__danger")}>
            Phone number must consist of 10 digits
          </p>
        </div>
        <div className={cx("form-group")}>
          <p className={cx("form-group__label")}>
            <span>Password</span>
            <span className="text-primary text-link">Forgot Password ?</span>
          </p>
          <input type="password" />
          <p className={cx("form-group__danger")}>Password is required</p>
        </div>
        <div className={cx("form-group")}>
          <button className={`${cx("form__btn")} btn btn--black`}>Login</button>
        </div>
      </form>
    </div>
  );
}
