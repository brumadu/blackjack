import { getSessionList } from "./services/sessionAPI";
import Link from "next/link";
import CreateServerArea from "./ui/CreateServerArea";

function sessionList(list: any) {
  let session;
  if (!list.error) {
    session = list.map((session: any, i: string) => (
      <div
        className=" text-center border-2 rounded-full my-4 mx-3 p-2 hover:bg-slate-600"
        key={i}
      >
        <Link
          className="grid grid-cols-3 gap-4 w-full"
          href={`/session/${session.id}`}
        >
          <div className="col">{session.title}</div>
          <div className="col">{session.status}</div>
          <div className="col">{session.id}</div>
        </Link>
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
      <div className="basis-3/5 box-border border-2 h-full rounded-3xl">
        <p className="text-2xl w-full text-center mt-2">Server List</p>
        {sessionList(sessionResponse)}
      </div>
      <div className="basis-2/5 box-border border-2 h-full rounded-3xl text-center">
        <CreateServerArea />
      </div>
    </div>
  );
}
