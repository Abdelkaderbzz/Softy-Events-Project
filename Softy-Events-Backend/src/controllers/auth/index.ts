import { login } from './login.controller';
import { signup } from './signup.controller';
import { refreshToken } from './refreshToken.controller';
import { logout } from './logout.controller';
import { confirmEmail } from './confirmEmail.controller';
import { forgetPassword } from './forgetPassword';
import { resetPassword } from './resetPassword';

export default {
  confirmEmail,
  login,
  signup,
  refreshToken,
  logout,
  forgetPassword,
  resetPassword,
};
