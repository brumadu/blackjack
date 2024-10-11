import { getSessionById } from "@/app/api/sessionAPI";
import GameHeader from "@/app/ui/GameplayLoop/GameHeader";
import { PageWrapper } from "@/app/utils/PageWrapper";
import GamePlayArea from "@/app/ui/GameplayLoop/GamePlayArea";

export default async function sessionId({
  params,
}: {
  params: { id: string };
}) {
  const sessionData = await getSessionById(params.id);

  return (
    <PageWrapper>
      <div className="flex flex-col w-100% items-center">
        <GameHeader></GameHeader>
        <GamePlayArea session={sessionData} />
      </div>
    </PageWrapper>
  );
}
