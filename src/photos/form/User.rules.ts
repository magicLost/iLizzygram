import isEmail from "validator/lib/isEmail";
import { regex } from "../../utils/formValidators";

/* NAME */
export const nameMinLength = 2;
export const nameMaxLength = 254;
export const nameRequiredMessage = "Пожалуйста, представьтесь.";
export const nameMinLengthMessage =
  "Пожалуйста используйте в имени от 2 до 254 символов";
export const nameMaxLengthMessage = nameMinLengthMessage;
export const nameRegexMessage =
  "Не используйте спецсимволы в имени, пожалуйста.";

export const nameUseFormValidation = {
  required: nameRequiredMessage,
  validate: (value: string) =>
    regex(value, {
      pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
    }) || nameRegexMessage,
  minLength: {
    value: nameMinLength,
    message: nameMinLengthMessage,
  },
  maxLength: {
    value: nameMaxLength,
    message: nameMaxLengthMessage,
  },
};

/* EMAIL */
export const emailRequiredMessage = "Пожалуйста, укажите свой email.";
export const emailValidateMessage = "Некорректный электронный адрес.";

export const emailUseFormValidation = {
  required: emailRequiredMessage,
  validate: {
    email: (value: string) => isEmail(value) || emailValidateMessage,
  },
};

/* PASSWORD */
export const passwordMinLength = 6;
export const passwordMaxLength = 254;
export const passwordRequiredMessage = "Пожалуйста, придумайте пароль.";
export const passwordMinLengthMessage = "Минимальная длина пароля 6 символов.";
export const passwordMaxLengthMessage = "Что? Пароль слишком длинный...";

export const passwordUseFormValidation = {
  required: passwordRequiredMessage,
  minLength: {
    value: passwordMinLength,
    message: passwordMinLengthMessage,
  },
  maxLength: {
    value: passwordMaxLength,
    message: passwordMaxLengthMessage,
  },
};

/* PASSWORD CONFIRM */

export const passwordConfirmRequiredMessage =
  "Пожалуйста, подтвердите свой пароль...";
export const passwordConfirmValidateMessage = "Пароли не совпадают";
