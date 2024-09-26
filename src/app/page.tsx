import { getSessionList } from "./services/sessionAPI";
import Link from "next/link";

function sessionList(list: any) {
  let session = list.map((session: any) => (
    <div className=" text-center border-2 rounded-full my-4 mx-3 p-2 hover:bg-slate-600">
      <Link
        className="grid grid-cols-3 gap-4 w-full"
        href={`/session/${session.id}`}
        key={session.id}
      >
        <div className="col">{session.title}</div>
        <div className="col">{session.status}</div>
        <div className="col">{session.id}</div>
      </Link>
    </div>
  ));
  return session;
}

export default async function Home() {
  const sessionResponse = await getSessionList();
  return (
    <div className="flex h-85% gap-10">
      <div className="basis-3/5 box-border border-2 h-full rounded-3xl">
        <p className="text-2xl w-full text-center mt-2">Server List</p>
        {sessionList(sessionResponse)}
      </div>
      <div className="basis-2/5 box-border border-2 h-full rounded-3xl text-center">
        <p className="text-2xl">Choose an username</p>
        <input className="border-2 border-rose-500 "></input>
        <p className="text-2xl">Create a new Server</p>
        <button className="rounded-full bg-teal-400 text-black">
          Save Changes
        </button>
      </div>
    </div>
  );
}
