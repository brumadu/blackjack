import { getSessionList } from "./api/sessionAPI";
import CreateServerArea from "./ui/FrontPage/CreateServerArea";
import Header from "./ui/FrontPage/Header";
import HighlightArea from "./ui/FrontPage/HighlighArea";
import SessionListComponent from "./ui/FrontPage/SessionListComponent";
import { PageWrapper } from "./utils/PageWrapper";
export const dynamic = "force-dynamic";

export default async function Home() {
  const sessionResponse = await getSessionList();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center w-100%">
        <div className="h-[10%] w-100%">
          <Header />
        </div>
        <div className="flex w-[80%] h-85% gap-10 mx-20">
          <div className="flex basis-3/5 md-max:basis-full rounded-2xl  shadow-2xl shadow-black">
            <SessionListComponent sessionResponse={sessionResponse} />
          </div>
          <div className="flex basis-2/5 md-max:basis-full rounded-lg text-center">
            <div className="flex flex-col rounded-lg w-100% justify-between">
              <div className="rounded-lg h-[48%] bg-slate-secondary  shadow-2xl  shadow-black">
                <div className="flex text-3xl h-[4vw] bg-slate-primary rounded-t-lg items-center justify-start pl-14">
                  <div className="w-90% text-start pl-2 text-white tracking-wider">
                    CREATE NEW SESSION
                  </div>
                </div>
                <div className="flex w-100% h-[75%]  items-center justify-center">
                  <div className="w-[60%]">
                    <CreateServerArea />
                  </div>
                </div>
              </div>
              <div className="rounded-lg h-[48%] bg-slate-secondary  shadow-2xl shadow-black">
                <div className="flex text-3xl h-[4vw] bg-slate-primary rounded-t-lg items-center justify-start pl-14 ">
                  <div className="w-90% text-start pl-2 text-white tracking-wider">
                    HIGHLIGHTS
                  </div>
                </div>
                <div className="flex justify-center text-start items-center w-[100%] h-[75%] ">
                  <div className="w-[90%] h-[95%] p-4 overflow-y-auto scrollbar">
                    <HighlightArea />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
