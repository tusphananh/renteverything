import React from "react";
import {
  ActivitiesState,
  ActivitiesAction,
} from "../constants/ActivitiesConstants";
import activitiesReducer from "../reducers/activitiesReducer";

const initialState: ActivitiesState = {
  activities: [],
  isFetching: false,
  error: null,
};

export const ActivitiesContext = React.createContext<{
  activitiesState: ActivitiesState;
  activitiesDispatch: React.Dispatch<ActivitiesAction>;
}>({
  activitiesState: initialState,
  activitiesDispatch: () => undefined,
});

export const ActivitiesProvider: React.FC = ({ children }) => {
  const [activitiesState, activitiesDispatch] = React.useReducer(
    activitiesReducer,
    initialState
  );
  const values = {
    activitiesState,
    activitiesDispatch,
  };
  return (
    <ActivitiesContext.Provider value={values}>
      {children}
    </ActivitiesContext.Provider>
  );
};
