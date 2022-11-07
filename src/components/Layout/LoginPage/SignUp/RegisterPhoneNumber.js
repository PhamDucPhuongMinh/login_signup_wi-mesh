import React from "react";
import classNames from "classnames/bind";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";
import { checkPhoneNumber } from "../../../../firebase/fakeAPI";

const cx = classNames.bind(styles);

export default function RegisterPhoneNumber({
  onChangeStepRegister,
  onChangePhoneNumberRegister,
  onChangeForm,
}) {
  // Validate form
  const {
    register,
    formState: { errors },
    resetField,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      phoneNumber: "",
    },
  });

  const handleCheckPhoneNumber = (data) => {
    // Call API
    const resultCheckPhoneNumber = checkPhoneNumber(data.phoneNumber);
    resultCheckPhoneNumber.then((res) => {
      if (res) {
        onChangePhoneNumberRegister(data.phoneNumber);
        onChangeStepRegister(2);
      } else {
        resetField("phoneNumber");
        alert("Phone number is registered");
      }
    });
  };

  return (
    <form
      className={cx("sign-up__form")}
      onSubmit={handleSubmit(handleCheckPhoneNumber)}
    >
      <div className={cx("form-group")}>
        <input
          placeholder="Phone number"
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
  );
}
