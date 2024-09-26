import { UserModel } from 'src/user/user.model';
import { deckInterface } from 'src/utils/deckInterface';
import { SessionStatus } from 'src/utils/sessionsStatus';

export class SessionModel {
  constructor(
    public id: string,
    public title: string,
    public status: SessionStatus,
    public user: {
      user: UserModel;
      money: number;
      playerHand: [deckInterface];
    },
    public dealerHand: [deckInterface],
    public deck: [deckInterface],
  ) {}
}
