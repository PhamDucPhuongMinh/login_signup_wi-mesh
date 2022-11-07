import React from "react";
import classNames from "classnames/bind";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { login } from "../../../../firebase/fakeAPI";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Login({ onChangeForm }) {
  const [cookie, setCookie] = useCookies();
  // validate form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
    mode: "all",
  });

  const onHandleSubmit = (data) => {
    // Call API
    const resultLogin = login(data.phoneNumber, data.password);
    resultLogin.then((res) => {
      // res ? alert("Logged in successfully") : alert("Login failed");
      if (res) {
        setCookie("userWiMesh", data.phoneNumber, { path: "/" });
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <>
      {cookie.userWiMesh && <Navigate to="/" />}
      <div className={cx("login")}>
        <h4>Login</h4>
        <p>
          Or{" "}
          <button className="text-primary text-link btn" onClick={onChangeForm}>
            Create An Account
          </button>
        </p>
        <form
          className={cx("login__form")}
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <div className={cx("form-group")}>
            <p className={cx("form-group__label")}>Phone number</p>
            <input
              type="number"
              {...register("phoneNumber", {
                required: "Phone number is required.",
                minLength: {
                  value: 10,
                  message: "Phone number must consist of 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must consist of 10 digits",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="phoneNumber"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type} className={cx("form-group__danger")}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
          </div>
          <div className={cx("form-group")}>
            <p className={cx("form-group__label")}>
              <span>Password</span>
              <span className="text-primary text-link">Forgot Password ?</span>
            </p>
            <input
              type="password"
              {...register("password", {
                required: "Password is required.",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type} className={cx("form-group__danger")}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
          </div>
          <div className={cx("form-group")}>
            <button className={`${cx("form__btn")} btn btn--black`}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
