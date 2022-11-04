import React, { useRef } from "react";
import classNames from "classnames/bind";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";

const cx = classNames.bind(styles);

export default function SignUp({ onChangeForm }) {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
    mode: "all",
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onHandleSubmit = (data) => console.log(data);

  return (
    <div className={cx("sign-up")}>
      <h4>Sign Up</h4>
      <p>Enter your detail to create your account</p>
      <form
        className={cx("sign-up__form")}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <div className={cx("form-group")}>
          <input
            placeholder="Fullname"
            {...register("full-name", {
              required: "Fullname is required.",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="full-name"
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
          <input
            placeholder="Phone number"
            type="number"
            {...register("phone-number", {
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
            name="phone-number"
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
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required.",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Minimum eight characters, at least one letter and one number.",
              },
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
          <input
            placeholder="Confirm password"
            type="password"
            {...register("comfirm-password", {
              required: "Password comfirmation is required.",
              validate: (value) =>
                value === password.current ||
                "The password comfirmation does not match",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="comfirm-password"
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
        <div className={cx("form-group", "form-group--checkbox")}>
          <input
            type="checkbox"
            id="accept-terms"
            {...register("accept-terms", {
              required: "You must accept the terms and conditions.",
            })}
          />
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
          <ErrorMessage
            errors={errors}
            name="accept-terms"
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
