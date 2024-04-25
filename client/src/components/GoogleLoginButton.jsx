import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const responseGoogle = (response) => {
    if (response.accessToken) {
      // Đăng nhập thành công
      onSuccess(response);
    } else {
      // Đăng nhập thất bại
      onFailure(response);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId="744082164546-3r5s32c0591dp8dpoljl2dqeqj0qmrq6.apps.googleusercontent.com"
        buttonText="Đăng nhập bằng Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginButton;
