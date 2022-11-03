import React from "react";
import classNames from "classnames/bind";
import styles from "./SignUp.module.scss";

const cx = classNames.bind(styles);

export default function SignUp({ onChangeForm }) {
  return (
    <div className={cx("sign-up")}>
      <h4>Sign Up</h4>
      <p>Enter your detail to create your account</p>
      <form className={cx("sign-up__form")}>
        <div className={cx("form-group")}>
          <input type="text" placeholder="Fullname" />
        </div>
        <div className={cx("form-group")}>
          <input type="number" placeholder="Phone number" />
        </div>
        <div className={cx("form-group")}>
          <input type="password" placeholder="Password" />
        </div>
        <div className={cx("form-group")}>
          <input type="password" placeholder="Confirm password" />
        </div>
        <div className={cx("form-group", "form-group--checkbox")}>
          <input type="checkbox" id="accept-terms" />
          <label htmlFor="accept-terms">
            I Agree the{" "}
            <a
              href="https://wi-mesh.com/"
              className="text-primary text-link"
              target="_blank"
              rel="noreferrer"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <div className={cx("form-group")}>
          <button className={`${cx("form__btn")} btn btn--primary`}>
            Submit
          </button>
          <button
            className={`${cx("form__btn")} btn btn--outline`}
            onClick={onChangeForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
