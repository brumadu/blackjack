import { UserModel } from 'src/user/user.model';
import DeckInterface from 'src/utils/DeckInterface';
import { SessionStatus } from 'src/utils/SessionStatus';

export class SessionModel {
  constructor(
    public id: string,
    public title: string,
    public status: SessionStatus,
    public user: {
      user: UserModel;
      money: number;
      playerHand: [DeckInterface];
    },
    public dealerHand: [DeckInterface],
    public deck: [DeckInterface],
  ) {}
}
