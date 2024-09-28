import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionModel } from './sessions.model';
import { SessionStatus } from 'src/utils/SessionStatus';
import { UserModel } from 'src/user/user.model';
import DeckList from 'src/utils/DeckList';
import DeckInterface from 'src/utils/DeckInterface';
import CardValue from 'src/utils/CardValue';

@Injectable()
export class SessionsService {
  private sessions: SessionModel[] = [];
  private user: UserModel[] = [];

  private calculateHand(hand: [DeckInterface]) {
    let numbers = [];
    hand.forEach((e) => numbers.push(CardValue(e.values)));
    let firstResult = 0;
    let secondResult = 0;
    numbers.forEach((num) => {
      firstResult += num;
    });
    if (numbers.find((e) => e == 1)) {
      numbers[numbers.findIndex((e) => e == 1)] = 11;
      numbers.forEach((num) => {
        secondResult += num;
      });
    }
    return [firstResult, secondResult];
  }

  private findSession(id: string): [SessionModel, number] {
    let sessionIndex = this.sessions.findIndex((e) => e.id == id);
    let session = this.sessions[sessionIndex];
    return [session, sessionIndex];
  }

  private getRandomCard(deck: [DeckInterface]) {
    //Already removes the card from the array
    let randomCard = deck.splice(Math.floor(Math.random() * deck.length), 1);
    if (Object.keys(randomCard).length === 0) {
      return this.getRandomCard;
    }
    if (!randomCard) {
      return this.getRandomCard;
    }
    return randomCard;
  }

  clearHand(sessionId: string) {
    let [session, index] = this.findSession(sessionId);
    session.dealerHand = [
      {
        suits: '',
        values: '',
      },
    ];
    session.user.playerHand = [
      {
        suits: '',
        values: '',
      },
    ];
    session.status = SessionStatus['idle'];
  }

  createSession(title: string, deckQuantity: number) {
    let newDeck = DeckList(deckQuantity);
    const sessionId = Math.floor(Math.random() * 10000);
    const newSession = new SessionModel(
      String(sessionId),
      title,
      SessionStatus['idle'],
      {
        user: { id: '0', username: '0' },
        money: 0,
        playerHand: [
          {
            suits: '',
            values: '',
          },
        ],
      },
      [
        {
          suits: '',
          values: '',
        },
      ],
      [...newDeck],
    );

    this.sessions.push(newSession);
    return newSession;
  }

  updateSession(
    sessionId: string,
    status: SessionStatus,
    user: { user: UserModel; money: number; playerHand: [deckInterface] },
    title: string,
  ) {
    let [session, index] = this.findSession(sessionId);
    const updatedSession = { ...session };
    if (title) {
      updatedSession.title = title;
    }
    if (status) {
      updatedSession.status = status;
    }
    if (user) {
      updatedSession.user = user;
    }

    this.sessions[index] = updatedSession;
  }

  startRound(sessionId: string) {
    let [session, index] = this.findSession(sessionId);
    if (!session) {
      throw new NotFoundException('Not a valid session');
    }
    if (session.status != SessionStatus['idle']) {
      throw new NotFoundException(
        'Cannot start a new round, already in progress',
      );
    } else {
      session.status = SessionStatus['in_progress'];
      for (let i = 0; i < 2; i++) {
        session.user.playerHand.push(this.getRandomCard(session.deck)[0]);
        session.dealerHand.push(this.getRandomCard(session.deck)[0]);
      }
      let hands = { user: session.user.playerHand, dealer: session.dealerHand };
      return hands;
    }
  }

  playerChoice(sessionId: string, playerAction: string) {
    let [session, index] = this.findSession(sessionId);
    if (!session) {
      throw new NotFoundException('Not a valid session');
    } else {
      switch (playerAction) {
        case 'hit':
          session.user.playerHand.push(this.getRandomCard(session.deck)[0]);
          let totalValueHit = this.calculateHand(session.user.playerHand);
          if (totalValueHit[0] > 21) {
            session.status = SessionStatus['finished'];
            return 'you lost';
          }
          return totalValueHit;
        case 'stand':
          let totalValueStand = this.calculateHand(session.user.playerHand);
          session.status = SessionStatus['player_done'];
          let totalDealer = this.dealerTurn(sessionId);
          if (totalDealer > 21) {
            session.status = SessionStatus['finished'];
            return 'you win ' + totalDealer + ' ' + totalValueStand;
          }
          if (totalDealer === 21) {
            session.status = SessionStatus['finished'];
            return 'you lose :c' + totalDealer + ' ' + totalValueStand;
          }
          if (
            totalValueStand[0] > totalDealer ||
            totalValueStand[1] > totalDealer
          ) {
            session.status = SessionStatus['finished'];
            return 'you win ' + totalDealer + ' ' + totalValueStand;
          } else {
            session.status = SessionStatus['finished'];
            return 'you lose ' + totalDealer + ' ' + totalValueStand;
          }

        case 'double_down':
          session.user.playerHand.push(this.getRandomCard(session.deck)[0]);
          let totalValueDD = this.calculateHand(session.user.playerHand);
          if (totalValueDD[0] > 21) {
            return 'you lost';
          }
          return totalValueDD;
        case 'split':
          return 'function not added';
        default:
          throw new NotFoundException('Not a valid action');
      }
    }
  }

  dealerTurn(sessionId: string) {
    let [session, index] = this.findSession(sessionId);
    let totalDealer = this.calculateHand(session.dealerHand);
    if (totalDealer[1] > 17 && totalDealer[1] < 21) {
      return totalDealer[1];
    }
    if (totalDealer[0] > 17) {
      return totalDealer[0];
    } else {
      session.dealerHand.push(this.getRandomCard(session.deck)[0]);
      return this.dealerTurn(sessionId);
    }
  }

  getSessionsList() {
    let session = this.sessions;
    if (session.length == 0) {
      throw new NotFoundException('No sessions found');
    } else {
      return [...session];
    }
  }

  getSession(id: string) {
    let [session, index] = this.findSession(id);
    if (!session) {
      throw new NotFoundException('No sessions match');
    }
    return { ...session };
  }

  deleteSession(id: string) {
    let [session, index] = this.findSession(id);
    if (!session) {
      throw new NotFoundException('No sessions match');
    } else {
      this.sessions.splice(index, 1);
    }
  }
}
