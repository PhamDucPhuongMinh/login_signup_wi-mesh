import React, { useState } from "react";
import classNames from "classnames/bind";
import ConfirmOTP from "./ConfirmOTP";
import RegisterInformation from "./RegisterInformation";
import RegisterPhoneNumber from "./RegisterPhoneNumber";
import styles from "./SignUp.module.scss";

const cx = classNames.bind(styles);

export default function SignUp({ onChangeForm }) {
  // step Register: 1. register phone number, 2. OTP, 3. register information
  const [stepRegister, setStepRegister] = useState(1);
  const [phoneNumberRegister, setPhoneNumberRegister] = useState("");

  return (
    <div className={cx("sign-up")}>
      <h4>Sign Up</h4>
      <p>Enter your detail to create your account</p>
      <div>
        {stepRegister === 1 ? (
          <RegisterPhoneNumber
            onChangeStepRegister={setStepRegister}
            onChangeForm={onChangeForm}
            onChangePhoneNumberRegister={setPhoneNumberRegister}
          />
        ) : stepRegister === 2 ? (
          <ConfirmOTP onChangeStepRegister={setStepRegister} />
        ) : (
          <RegisterInformation
            onChangeStepRegister={setStepRegister}
            phoneNumber={phoneNumberRegister}
            onChangeForm={onChangeForm}
          />
        )}
      </div>
    </div>
  );
}
