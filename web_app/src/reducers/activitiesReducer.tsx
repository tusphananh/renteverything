import { toNumber } from "lodash";
import {
  ActivitiesTypes,
  ActivitiesState,
  ActivitiesAction,
} from "../constants/ActivitiesConstants";

const activitiesReducer = (
  state: ActivitiesState,
  action: ActivitiesAction
): ActivitiesState => {
  switch (action.type) {
    case ActivitiesTypes.ADD_PROVIDE_ACTIVITIES:
      return {
        ...state,
        provideActivities: [
          ...state.provideActivities,
          ...action.payload.activities,
        ],
      };
    case ActivitiesTypes.ADD_PROVIDE_ACTIVITY:
      return {
        ...state,
        provideActivities: [
          ...state.provideActivities,
          action.payload.activity,
        ],
      };
    case ActivitiesTypes.REMOVE_PROVIDE_ACTIVITY:
      return {
        ...state,
        provideActivities: state.provideActivities.filter(
          (activity) => activity.id !== action.payload.activityId
        ),
      };
    case ActivitiesTypes.ADD_RENT_ACTIVITIES:
      return {
        ...state,
        rentActivities: [...state.rentActivities, ...action.payload.activities],
      };
    case ActivitiesTypes.ADD_RENT_ACTIVITY: {
      console.log("Add Rent Activity");
      return {
        ...state,
        rentActivities: [...state.rentActivities, action.payload.activity],
      };
    }
    case ActivitiesTypes.REMOVE_RENT_ACTIVITY:
      return {
        ...state,
        rentActivities: state.rentActivities.filter(
          (activity) => activity.id !== action.payload.activityId
        ),
      };
    case ActivitiesTypes.ADD_MESSAGE:
      let found = false;
      let newRentActivities = state.rentActivities.map((activity) => {
        if (toNumber(activity.chat.id) === action.payload.message?.chatId) {
          found = true;
          return {
            ...activity,
            chat: {
              ...activity.chat,
              messages: [...activity.chat.messages, action.payload.message],
            },
          };
        }
        return activity;
      });
      let newProvideActivities = !found
        ? state.provideActivities.map((activity) => {
            if (toNumber(activity.chat.id) === action.payload.message?.chatId) {
              found = true;
              return {
                ...activity,
                chat: {
                  ...activity.chat,
                  messages: [...activity.chat.messages, action.payload.message],
                },
              };
            }
            return activity;
          })
        : state.provideActivities;
      return {
        ...state,
        rentActivities: newRentActivities,
        provideActivities: newProvideActivities,
      };
    case ActivitiesTypes.SET_CHAT_SOCKET:
      return {
        ...state,
        chatSocket: action.payload.socket,
      };
    case ActivitiesTypes.UPDATE_ACTIVITY:
      return {
        ...state,
        provideActivities: state.provideActivities.map((activity) => {
          if (activity.id === action.payload.activity.id) {
            return action.payload.activity;
          }
          return activity;
        }),
        rentActivities: state.rentActivities.map((activity) => {
          if (activity.id === action.payload.activity.id) {
            return action.payload.activity;
          }
          return activity;
        }),
      };

    default:
      return state;
  }
};
export default activitiesReducer;
// Language: typescript
