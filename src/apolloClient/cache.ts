import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { IPhoto } from "../../server/api/entity/Photo/Photo.model";
import { Color } from "@material-ui/lab/Alert";
import { IUserResponseToClient } from "./../../server/api/entity/User/User.model";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    /*  Photo: {
      keyFields: ["_id"],
    },
    Tag: {
      keyFields: ["_id"],
    }, */
    Query: {
      fields: {
        csrf: {
          read() {
            return csrfVar();
          },
        },
        auth: {
          read() {
            return authVar();
          },
        },
        modal: {
          read() {
            return modalVar();
          },
        },
        search: {
          read() {
            return searchVar();
          },
        },
        alert: {
          read() {
            //console.log("ALERT QUERY ");
            return alertVar();
          },
        },
      },
    },
  },
});

/* AUTH STATE  */

export const localStorageKey = "lg_super_puper_user";

export interface IAuthState {
  user: IUserResponseToClient | undefined;
  loading: boolean;
}

const authInitialState: IAuthState = {
  user: undefined,
  loading: true,
};

if (process) console.log("NODE_ENV!!!!!!!", process.env.NODE_ENV);
console.log("AUTH INIT STATE", authInitialState);

export const authVar: ReactiveVar<IAuthState> = makeVar<IAuthState>(
  authInitialState
);

/* ALERT STATE */

export interface IAlertState {
  isShow: boolean;
  type: Color;
  message: string;
}

const alertInitialState: IAlertState = {
  isShow: false,
  type: "info",
  message: "",
};

export const alertVar: ReactiveVar<IAlertState> = makeVar<IAlertState>(
  alertInitialState
);

/* CSRF STATE */

export interface ICsrfState {
  token: string;
  loading: boolean;
}

const csrfInitialState: ICsrfState = {
  token: "",
  loading: false,
};

export const csrfVar: ReactiveVar<ICsrfState> = makeVar<ICsrfState>(
  csrfInitialState
);

/* SEARCH STATE */

export interface ISearchState {
  isSortDesc: boolean;
  tagsIds: string[];
  limit: number;
  isSearch: boolean;
}

export const searchInitialState: ISearchState = {
  isSortDesc: true,
  tagsIds: [],
  limit: 5,
  isSearch: false,
};

export const searchVar: ReactiveVar<ISearchState> = makeVar<ISearchState>(
  searchInitialState
);

/* MODAL STATE */

export interface IModalState {
  openSlider: boolean;
  openEditForm: boolean;
  openAddForm: boolean;
  openLoginForm: boolean;
  openSearch: boolean;
  initActiveIndex: number;
  photo: IPhoto;
}

const modalInitialState: IModalState = {
  openSlider: false,
  openEditForm: false,
  openAddForm: false,
  openLoginForm: false,
  openSearch: false,
  initActiveIndex: 0,
  photo: undefined,
};

export const modalVar: ReactiveVar<IModalState> = makeVar<IModalState>(
  modalInitialState
);

/* RESET CACHE */
/* export const resetCache = () => {
  csrfVar(csrfInitialState);
  modalVar(modalInitialState);
  
} */
