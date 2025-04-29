import { Context ,pubSub} from "../context";


export const Subscription = {
  cvAdded: {
    subscribe: () => pubSub.asyncIterator("CV_ADDED"),
    
    resolve: (payload: { cvAdded: any }) => payload.cvAdded,
  },
  
  cvUpdated: {
    subscribe: () => pubSub.asyncIterator("CV_UPDATED"),

    resolve: (payload: { cvUpdated: any }) => payload.cvUpdated,
  },
  
  cvDeleted: {
    subscribe: () => pubSub.asyncIterator("CV_DELETED"),

    resolve: (payload: { cvDeleted: any }) => payload.cvDeleted,
  },
};