import { getSessionList } from "./api/sessionAPI";
import Link from "next/link";
import CreateServerArea from "./ui/CreateServerArea";
import Clubs from "./assets/clubs";

function statusEnum(status: number) {
  switch (status) {
    case 1:
      return "started";
    case 2:
      return "player done";
    case 3:
      return "finished";
    default:
      return "Waiting";
  }
}

function sessionList(list: any) {
  let session;
  console.log(list);
  if (list.statusCode != 404) {
    session = list.map((session: any, i: number) => (
      <div
        className={`flex text-center w-100% card-wrapper rounded-2xl mb-2 hover:bg-white  shadow-md shadow-slate-700/50  hover:shadow-slate-900/70`}
        key={i}
      >
        <div
          className={`relative m-1 rounded-2xl ${
            i % 2 == 0 ? "bg-slate-600" : "bg-slate-700"
          }`}
        >
          <Link
            className="grid grid-cols-3 gap-4 w-full"
            href={`/session/${session.id}`}
          >
            <div className="col">{session.title}</div>
            <div className="col">{statusEnum(session.status)}</div>
            <div className="col">{session.id}</div>
          </Link>
        </div>
      </div>
    ));
  } else {
    session = (
      <div className="text-center my-4 mx-3 p-2">No sessions found</div>
    );
  }
  return session;
}

export default async function Home() {
  const sessionResponse = await getSessionList();

  return (
    <div className="flex h-85% gap-10">
      <div className="flex basis-3/5 border-2  rounded-3xl">
        <div className="rounded-3xl bg-gradient-to-b from-green-800 to-green-700 ">
          <div className="text-2xl w-100% h-10% flex items-center justify-center">
            <p>Session List</p>
          </div>
          <div className="bg-green-900 self-end h-90% p-2 rounded-b-3xl rounded-t-md">
            <div className="h-100% overflow-auto scrollbar mx-2 pr-3">
              {sessionList(sessionResponse)}
            </div>
          </div>
        </div>
      </div>
      <Clubs />
      <div className="flex basis-2/5 border-2 rounded-3xl text-center">
        <div className="rounded-3xl w-100% bg-gradient-to-b from-green-800 to-green-700">
          <p className="text-2xl text-center my-3 stroke-3 stroke-black text-white">
            Create New Session
          </p>
          <CreateServerArea />
        </div>
      </div>
    </div>
  );
}
