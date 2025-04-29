import { Context } from "../context";

export const Subscription = {
  cvAdded: {
    subscribe: async (_: any, __: any, { pubSub }: Context) =>
      pubSub.subscribe("CV_ADDED"),
    resolve: (payload: { cvAdded: any }) => payload.cvAdded,
  },
  cvUpdated: {
    subscribe: async (_: any, __: any, { pubSub }: Context) =>
      pubSub.subscribe("CV_UPDATED"),
    resolve: (payload: { cvUpdated: any }) => payload.cvUpdated,
  },
  cvDeleted: {
    subscribe: async (_: any, __: any, { pubSub }: Context) =>
      pubSub.subscribe("CV_DELETED"),
    resolve: (payload: { cvDeleted: any }) => payload.cvDeleted,
  },
};
/*to test 
subscription {
  cvAdded {
    id
    name
    job
    user {
      id
      name
    }
  }
}
*/