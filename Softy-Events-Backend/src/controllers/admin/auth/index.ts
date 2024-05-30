import { login } from './login.controller';
import { signup } from './signup.controller';
import { refreshToken } from './refreshToken.controller';
import { logout } from './logout.controller';
import { confirmEmail } from './confirmEmail.controller';
import { adminForgotPassword } from './adminForgotPassword';
import { adminResetPassword } from './adminResetPassword';
import { getMyProfile } from './getMe';
import { adminChangePassword } from './changePassword';

export default {
  confirmEmail,
  login,
  signup,
  refreshToken,
  logout,
  adminChangePassword,
  adminResetPassword,
  adminForgotPassword,
  getMyProfile,
};
