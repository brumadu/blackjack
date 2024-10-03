import { getSessionList } from "./api/sessionAPI";
import Link from "next/link";
import CreateServerArea from "./ui/CreateServerArea";

function statusEnum(status: number) {
  switch (status) {
    case 1:
      return "Started";
    case 2:
      return "Player done";
    case 3:
      return "Finished";
    default:
      return "Waiting";
  }
}

function sessionList(list: any) {
  let session;
  if (list.statusCode != 404) {
    session = list.map((session: any, i: number) => (
      <div
        className="flex text-center w-100%  rounded mb-2 hover:bg-white shadow-sm shadow-black hover:shadow-slate-900/70"
        key={i}
      >
        <div
          className={`relative m-[1px] rounded ${
            i % 2 == 0 ? "bg-slate-600" : "bg-slate-700"
          }`}
        >
          <Link
            className="grid grid-cols-3 gap-4 w-full"
            href={`/session/${session.id}`}
          >
            <div className="col-span-1">{session.title}</div>
            <div className="col-span-1">{statusEnum(session.status)}</div>
            <div className="col-span-1">{session.id}</div>
          </Link>
        </div>
      </div>
    ));
  } else {
    session = (
      <div className="flex text-center my-4 mx-3 p-2">No sessions found</div>
    );
  }
  return session;
}

export default async function Home() {
  const sessionResponse = await getSessionList();

  return (
    <div className="flex h-85% gap-10">
      <div className="flex basis-3/5 w-100% rounded-lg shadow-lg ">
        <div className="rounded-lg w-100% bg-gradient-to-b from-green-800 to-green-900 ">
          <div className="text-2xl w-100% h-10% flex items-center justify-center">
            <p>Session List</p>
          </div>
          <div className="self-end h-90% p-2 rounded-b-3xl rounded-t-md">
            <div className="flex border w-[98%] border-black rounded-md bg-slate-500 justify-around text-center text-black mb-2">
              <div className="w-1/3">title</div>
              <div className="w-1/3">status</div>
              <div className="w-1/3">Deck quantity</div>
            </div>
            <div className="h-100% overflow-auto scrollbar pr-3">
              {sessionList(sessionResponse)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex basis-2/5 rounded-lg text-center shadow-lg ">
        <div className="rounded-lg w-100% bg-gradient-to-b from-green-800 to-green-900">
          <p className="text-2xl text-center my-3 stroke-3 stroke-black text-white">
            Create New Session
          </p>
          <CreateServerArea />
        </div>
      </div>
    </div>
  );
}
