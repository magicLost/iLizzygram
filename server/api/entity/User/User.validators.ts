import isEmail from "validator/lib/isEmail";
import { regex } from "../../../utils/formValidators";

/* NAME */
export const nameMinLength = 2;
export const nameMaxLength = 254;
export const nameRequiredMessage = "Пожалуйста, представьтесь.";
export const nameMinLengthMessage =
  "Пожалуйста используйте в имени от 2 до 254 символов";
export const nameMaxLengthMessage = nameMinLengthMessage;
export const nameRegexMessage =
  "Не используйте спецсимволы в имени, пожалуйста.";

export const nameMongooseValidation = {
  required: [true, nameRequiredMessage],
  minlength: [nameMinLength, nameMinLengthMessage],
  maxlength: [nameMaxLength, nameMaxLengthMessage],
  validate: {
    validator: (value: string) =>
      regex(value, {
        pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
      }),
    message: nameRegexMessage,
  },
};

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

export const emailMongooseValidation = {
  required: emailRequiredMessage,
  validate: [isEmail, emailValidateMessage],
};

export const emailUseFormValidation = {
  required: emailRequiredMessage,
  validate: {
    email: (value: string) => isEmail(value) || emailValidateMessage,
  },
};

/* PASSWORD */

export const passwordMinLength = 8;
export const passwordMaxLength = 254;
export const passwordRequiredMessage = "Пожалуйста, придумайте пароль.";
export const passwordMinLengthMessage = "Минимальная длина пароля 8 символов.";
export const passwordMaxLengthMessage = "Что? Пароль слишком длинный...";

export const passwordMongooseValidation = {
  required: passwordRequiredMessage,
  minlength: [passwordMinLength, passwordMinLengthMessage],
  maxlength: [passwordMaxLength, passwordMaxLengthMessage],
};

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

export const passwordConfirmMongooseValidation = {
  required: passwordConfirmRequiredMessage,
  validate: {
    //This only work on .CREATE and .SAVE!!!
    validator: function (value: string): boolean {
      return value === (this as any).password;
    },
    message: passwordConfirmValidateMessage,
  },
};

/* ROLE */
export const roleValidationMessage = "Wrong role";

export const roleMongooseValidation = {
  enum: {
    values: ["god", "user", "parents", "relatives"],
    message: roleValidationMessage,
  },
};
