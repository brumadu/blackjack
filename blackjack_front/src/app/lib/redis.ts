"use server";
import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log(err));

if (!client.isOpen) {
  client.connect();
}

const add = (key: string, value: string, expirationTime?: number) => {
  if (expirationTime) {
    client.hSet(key, "session", value);
    client.expire(key, expirationTime);
  } else {
    client.hSet(key, "session", value);
  }
};
const get = (key: string) => client.hGet(key, "session");

const del = (key: string) => client.hDel(key, "session");

export { add, get, del };
