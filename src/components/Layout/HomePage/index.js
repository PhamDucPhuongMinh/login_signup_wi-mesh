import React from "react";
import classNames from "classnames/bind";
import { useCookies } from "react-cookie";
import style from "./index.module.scss";
import { Navigate } from "react-router-dom";
const cx = classNames.bind(style);

export default function HomePage() {
  const [cookies, , removeCookie] = useCookies();
  return (
    <>
      {cookies.userWiMesh ? "" : <Navigate to="/login" />}
      <div className={cx("home-page")}>
        <h4>HomePage</h4>
        <p>
          Bạn đang đăng nhập bằng tài khoản <span>{cookies.userWiMesh}</span>
        </p>
        <button
          className="btn btn--primary"
          onClick={() => removeCookie("userWiMesh", { path: "/" })}
        >
          Logout
        </button>
      </div>
    </>
  );
}
