import React, { useRef } from "react";
import classNames from "classnames/bind";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";
import { registerUser } from "../../../../firebase/fakeAPI";

const cx = classNames.bind(styles);

export default function RegisterInformation({
  onChangeStepRegister,
  phoneNumber,
  onChangeForm,
}) {
  // Validate form
  const {
    register,
    formState: { errors },
    resetField,
    watch,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      name: "",
      phoneNumber: phoneNumber,
      password: "",
      comfirmPassword: "",
      acceptTerms: false,
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onHandleSubmit = (data) => {
    delete data["comfirmPassword"];
    delete data["acceptTerms"];
    // Call API
    registerUser(data).then((res) => {
      if (res) {
        alert("Sign up successfully");
        // go to login
        onChangeForm();
      } else {
        resetField("name");
        resetField("password");
        resetField("comfirmPassword");
        resetField("acceptTerms");
        alert("Sign up failed");
      }
    });
  };
  return (
    <form
      className={cx("sign-up__form")}
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      <div className={cx("form-group")}>
        <input
          placeholder="Fullname"
          {...register("name", {
            required: "Fullname is required.",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="name"
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
          {...register("comfirmPassword", {
            required: "Password comfirmation is required.",
            validate: (value) =>
              value === password.current ||
              "The password comfirmation does not match",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="comfirmPassword"
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
          {...register("acceptTerms", {
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
          name="acceptTerms"
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
          onClick={() => onChangeStepRegister(1)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
