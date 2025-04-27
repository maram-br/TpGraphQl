
import { Context } from "../context";

export const Subscription = {
  cvAdded: {
    subscribe: (_parent: any, _args: any, { pubSub }: Context) =>
      pubSub.subscribe("CV_ADDED"),

    resolve: (payload: { cvAdded: any }) => payload.cvAdded,
  },

  cvUpdated: {
    subscribe: (_parent: any, _args: any, { pubSub }: Context) =>
      pubSub.subscribe("CV_UPDATED"),
    resolve: (payload: { cvUpdated: any }) => payload.cvUpdated,
  },

  cvDeleted: {
    subscribe: (_: any, _args: any, { pubSub }: Context) =>
      pubSub.subscribe("CV_DELETED"),
    resolve: (payload: { cvDeleted: any }) => payload.cvDeleted
  },
};
