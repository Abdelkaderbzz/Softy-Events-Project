export interface AuthState {
  status: string;
  isAuthenticated: boolean;
  isInitialised: boolean;
  user: {
    avatar: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    id: string;
    name: string;
    email: string;
  } | null;
  error: string | null;
}
export type userTypes = {
  avatar: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  id: string;
  name: string;
  email: string;
} | null;
export type LoginPayload = {
  email: string;
  password: string;
};
export type RegisterPayload = {
  firstName: string;
  lastName:string;
  phoneNumber:string;
  email: string;
  password: string;
  confirmPassword?: string;
};
export type updateCredentialPayload = {
  name: string;
  email: string;
};
export type updateAvatarPayload = {
  avatar: File | null;
};
export type updatePasswordPayload = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
export type profileState = {
  status: string;
  error: null | string;
  isUpdated: boolean;
};
