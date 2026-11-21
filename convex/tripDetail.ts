import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    uid: v.id('UserTable'),
    tripDetail: v.any()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('TripDetailTable', {
      tripDetail: args.tripDetail,
      tripId: args.tripId,
      uid: args.uid
    });
  }
})

export const GetUserTrips = query({
  args: {
    uid: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    const trips = await ctx.db
      .query('TripDetailTable')
      .filter(q => q.eq(q.field('uid'), args.uid))
      .collect();
    return trips;
  }
})

export const GetTripById = query({
  args: {
    tripId: v.string()
  },
  handler: async (ctx, args) => {
    const trip = await ctx.db
      .query('TripDetailTable')
      .filter(q => q.eq(q.field('tripId'), args.tripId))
      .first();
    return trip;
  }
})