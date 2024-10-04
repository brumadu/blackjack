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
        className={`flex w-100% h-10 text-center items-center rounded mb-2 border border-transparent hover:border-white shadow-sm shadow-black hover:shadow-slate-900/70  ${
          i % 2 == 0 ? "bg-slate-600" : "bg-slate-700"
        }`}
        key={i}
      >
        <Link
          className="grid grid-cols-3 w-100% h-100"
          href={`/session/${session.id}`}
        >
          <div className="col-span-1">{session.title}</div>
          <div className="col-span-1">{statusEnum(session.status)}</div>
          <div className="col-span-1">{session.deckQuantity}</div>
        </Link>
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
    <>
      <header className="flex h-10% items-center justify-start"></header>
      <div className="flex gap-10 h-85% md-max:flex-wrap md-max:h-[300%] xxl:text-4xl sm-max:text-xs">
        <div className="flex basis-3/5 md-max:basis-full rounded-lg shadow-lg">
          <div className="rounded-lg w-100% bg-gradient-to-b from-green-800 to-green-900 ">
            <div className=" w-100% h-10% flex items-center justify-center">
              <div className=" xxl:text-7xl lg:text-3xl font-bold ">
                SESSION LIST
              </div>
            </div>
            <div className="self-end w-100% h-90% p-2 rounded-b-3xl rounded-t-md">
              <div className="flex border  border-black rounded-md bg-slate-500 justify-around text-center text-black mb-2">
                <div className="w-1/3">title</div>
                <div className="w-1/3">status</div>
                <div className="w-1/3">Deck quantity</div>
              </div>
              <div className="h-90% overflow-auto scrollbar">
                {sessionList(sessionResponse)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex basis-2/5 md-max:basis-full rounded-lg text-center shadow-lg ">
          <div className="flex flex-col h-100% items-center  rounded-lg w-100% bg-gradient-to-b from-green-800 to-green-900">
            <div className="flex items-center text-center h-10% stroke-3 stroke-black text-white xxl:text-7xl lg:text-3xl font-bold ">
              CREATE NEW SESSION
            </div>
            <div className="h-90% w-[60%]">
              <CreateServerArea />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
