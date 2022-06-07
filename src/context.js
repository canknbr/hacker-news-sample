import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import {
  SET_LOADING,
  SET_STORİES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';
const AppContext = React.createContext();
const url = 'http://hn.algolia.com/api/v1/search?';
const initialState = {
  isLoading: false,
  hits: [],
  query: '',
  page: 0,
  nbPages: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getFetch = async url => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const { hits, nbPages } = await response.json();
      dispatch({ type: SET_STORİES, payload: { hits, nbPages } });
    } catch (error) {}
  };
  useEffect(() => {
    getFetch(`${url}query=${state.query}&page=${state.page}`);
  }, []);
  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};
export const useGlobalContext = () => useContext(AppContext);
export { AppProvider, AppContext };
