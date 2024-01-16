export interface LoginDTO {
  email: string;
  password: string;
}
export type RegisterResponse = {
  data: Data;
  message: string;
};

export type Data = {
  email: string;
  first_name: string;
  last_name: string;
};
export type VerificationResponse = {
  message: Message;
};

export type Message = {
  access_token: string;
  refresh_token: string;
};
