import { SEARCH, MODAL, ALERT, AUTH } from "./queries";
import {
  IModalState,
  ISearchState,
  IAuthState,
  searchVar,
  modalVar,
  IAlertState,
} from "./cache";
import { useQuery } from "@apollo/client";

/* 
 const {
    data: {
      search: { isSortDesc, tagsIds, limit, isSearch },
    },
  } = useQuery<{ search: ISearchState }>(SEARCH);

  const {
    data: { modal: modalState },
  } = useQuery<{ modal: IModalState }>(MODAL);
*/

export const useModal = () => {
  const { data } = useQuery<{ modal: IModalState }>(MODAL);

  return {
    modalState: data.modal,
  };
};

export const useSearch = () => {
  const { data } = useQuery<{ search: ISearchState }>(SEARCH);

  return {
    searchState: data.search,
  };
};

export const useAlert = () => {
  const { data } = useQuery<{ alert: IAlertState }>(ALERT);

  return {
    alertState: data.alert,
  };
};

export const useAuth = () => {
  const { data } = useQuery<{ auth: IAuthState }>(AUTH);

  return {
    authState: data.auth,
  };
};
