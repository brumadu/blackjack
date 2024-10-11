"use server";
import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log(err));

if (!client.isOpen) {
  client.connect();
}

const add = async (key: string, value: {}) => {
  await client.hSet(key, value);
  await client.expire(key, 10);
};

const get = (key: string) => client.hGet(key, "session");

const getAll = async () => {
  const allKeys = await client.keys("*");
  const promises = allKeys.map((key) => client.hGetAll(key));
  const results = await Promise.all(promises);
  const array = results.map((result) => JSON.parse(JSON.stringify(result)));
  return array;
};
const del = (key: string) => client.hDel(key, "session");

export { add, getAll, get, del };
