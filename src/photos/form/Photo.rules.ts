import { regex } from "../../utils/formValidators";
//import trim from "validator/lib/trim";
import isEmail from "validator/lib/isEmail";
import isDate from "validator/lib/isDate";

export const descRules = {
  regex: (value: string) =>
    regex(value, {
      pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
    }) || "Не используйте спец символы.",
  maxLength: {
    value: 3000,
    message: "Да ладно...", // <p>error message</p>
  },
};

export const photoFileRules = {
  //required: "А где фота?",
  validate: {
    file: (fileList: FileList) => {
      //console.log(fileList);
      return fileList.length > 0 || "А где фота?";
    },
  },
};

export const dateRules = {
  required: "Укажите в какое время сделана фота, хотя бы примерно, пожалуйста.",
  validate: {
    date: (value: any) => {
      console.log("isDate", value);
      //if (!value) return true;
      const minDate = new Date("2018-07-07");
      const maxDate = new Date();
      const date = new Date(value);
      if (!isDate(date, "dd/MM/yyyy")) return "Некорректная дата.";

      if (date < minDate) return "Раньше 2018-07-08?";
      if (date > maxDate) return "Фотка сделана в будущем?";

      return true;
      //return isDate(value, "MM/dd/yyyy") || "Некорректная дата.";
    },
  },
};

export const tagsRules = {
  validate: (tags: { [name: string]: boolean }) => {
    //console.log("tags required", tags);

    let isTap = false;

    if (!tags) isTap = false;

    for (let i in tags) {
      if (tags[i] === true) {
        isTap = true;
        break;
      }
    }

    return isTap || "Добавьте хотя бы один тэг.";
  },
};
