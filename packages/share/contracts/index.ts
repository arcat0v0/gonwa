// contract.ts

import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const contract = c.router({
  getToken: {
    method: "GET",
    path: "/webrtc-api/get-token",
    responses: {
      200: z.object({
        status: z.number(),
        message: z.string(),
        data: z.object({
          token: z.string(),
        }),
      }),
    },
    query: z.object({
      roomName: z.string(),
      identity: z.string(),
    }),
  },
  createRoom: {
    method: "POST",
    path: "/webrtc-api/create-room",
    body: z.object({
      roomName: z.string(),
      roomDescription: z.string(),
    }),
    responses: {
      200: z.object({
        status: z.number(),
        message: z.string(),
        data: z.object({
          roomId: z.string().optional(),
        }),
      }),
    },
  },
  findRoom: {
    method: "GET",
    path: "/webrtc-api/find-room",
    query: z.object({
      roomId: z.string().optional(),
    }),
    responses: {
      200: z.object({
        status: z.number(),
        message: z.string(),
        data: z.object({
          name: z.string(),
          description: z.string(),
        }),
      }),
    },
  },
  joinRoom: {
    method: "POST",
    path: "/webrtc-api/join-room",
    responses: {
      200: z.object({
        status: z.number(),
        message: z.string(),
        data: z.object({
          token: z.string(),
          usersInRoom: z.array(z.string()),
          livekitUrl: z.string().optional(),
        }),
      }),
    },
    body: z.object({
      roomId: z.string(),
      identity: z.string(),
    }),
  },
  registerUser: {
    method: "POST",
    path: "/webrtc-api/register-user",
    body: z.object({}).optional(),
    responses: {
      200: z.object({
        status: z.number(),
        message: z.string(),
        data: z.object({
          userId: z.string(),
        }),
      }),
    },
  },
});
