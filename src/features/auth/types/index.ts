// Типы для запросов аутентификации
export type LoginAdminVariables = {
  email: string;
  password: string;
};

export type LoginAdminResponse = {
  loginAdmin: {
    logged: boolean;
  };
};
