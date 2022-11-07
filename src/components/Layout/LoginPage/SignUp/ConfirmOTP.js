import React from "react";
import classNames from "classnames/bind";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";
import { checkOTP } from "../../../../firebase/fakeAPI";

const cx = classNames.bind(styles);

export default function ConfirmOTP({ onChangeStepRegister }) {
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      OTP: "",
    },
  });

  const handleCheckOTP = (data) => {
    // Call API
    const resultCheckOTP = checkOTP(data.OTP);
    if (resultCheckOTP) {
      onChangeStepRegister(3);
    } else {
      alert("OTP is wrong");
      resetField("OTP");
    }
  };

  return (
    <form
      className={cx("sign-up__form")}
      onSubmit={handleSubmit(handleCheckOTP)}
    >
      <div className={cx("form-group")}>
        <input
          placeholder="Enter OPT"
          type="number"
          {...register("OTP", {
            required: "OTP is required.",
            minLength: {
              value: 6,
              message: "OTP must consist of 6 digits",
            },
            maxLength: {
              value: 6,
              message: "OTP must consist of 6 digits",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="OTP"
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
