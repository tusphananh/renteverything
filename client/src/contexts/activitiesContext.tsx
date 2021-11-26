import React from "react";
import {
  ActivitiesAction,
  ActivitiesState,
} from "../constants/ActivitiesConstants";
import { activities } from "../constants/ExampleConstants";
import activitiesReducer from "../reducers/activitiesReducer";

const initialState: ActivitiesState = {
  activities: activities,
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

export const useActivitiesContext = () => React.useContext(ActivitiesContext);
