import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionStatus } from '../utils/SessionStatus';
import DeckList from '../utils/DeckList';
import DeckInterface from '../utils/DeckInterface';
import CardValue from '../utils/CardValue';
import { InjectRepository } from '@nestjs/typeorm';
import { Sessions } from 'src/database/sessions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private sessionsRepository: Repository<Sessions>,
  ) {}
  private sessionDeck: {};

  private findSession(id: string) {
    const sessionData = this.sessionsRepository.findOneBy({ id });
    if (!sessionData) {
      throw new NotFoundException('No sessions match');
    }
    return sessionData;
  }

  async createSession(title: string, deckQuantity: number): Promise<Sessions> {
    const newDeck = DeckList(deckQuantity);
    const status = SessionStatus['idle'];
    const sessionData = await this.sessionsRepository.create({ title, status });
    this.sessionDeck[sessionData.id] = newDeck;
    return sessionData;
  }

  async getSessionsList(): Promise<Sessions[]> {
    const sessionData = await this.sessionsRepository.find();
    if (!sessionData) {
      throw new NotFoundException('No sessions found');
    }
    return sessionData;
  }

  async getSession(id: string): Promise<Sessions> {
    const sessionData = await this.findSession(id);
    return sessionData;
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

  async startRound(id: string) {
    const sessionData = await this.findSession(id);
    let startSession: Sessions;
    for (let i = 0; i < 2; i++) {
      startSession.dealerHand.push(this.getRandomCard(this.sessionDeck[id])[0]);
      startSession.playerHand.push(this.getRandomCard(this.sessionDeck[id])[0]);
    }
    startSession.status = SessionStatus['in_progress'];
    const sessionMerge = this.sessionsRepository.merge(
      sessionData,
      startSession,
    );
    return await this.sessionsRepository.save(sessionMerge);
  }

  private dealerTurn(session: Sessions) {
    let totalDealer = this.calculateHand(session);
    let newDealerCard: Sessions;
    if (totalDealer[1] > 17 && totalDealer[1] < 21) {
      return totalDealer[1];
    }
    if (totalDealer[0] > 17) {
      return totalDealer[0];
    } else {
      newDealerCard.dealerHand.push(
        this.getRandomCard(this.sessionDeck[session.id])[0],
      );
      const sessionMerge = this.sessionsRepository.merge(
        session,
        newDealerCard,
      );
      this.sessionsRepository.save(sessionMerge);
      return this.dealerTurn(sessionMerge);
    }
  }

  private calculateHand(session: Sessions) {
    let numbers = [];
    session.playerHand.forEach((e) => numbers.push(CardValue(e.values)));
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

  async playerChoice(id: string, playerAction: string) {
    const sessionData = await this.findSession(id);
    let choiceSession: Sessions;

    switch (playerAction) {
      case 'hit':
        choiceSession.playerHand = this.getRandomCard(this.sessionDeck[id])[0];
        choiceSession.status = SessionStatus['in_progress'];
        const sessionMerge = this.sessionsRepository.merge(
          sessionData,
          choiceSession,
        );
        let totalValueHit = this.calculateHand(sessionMerge);
        if (totalValueHit[0] >= 21) {
          sessionMerge.status = SessionStatus['player_done'];
        }
        return await this.sessionsRepository.save(sessionMerge);
      case 'stand':
        sessionData.status = SessionStatus['player_done'];
        let totalValueStand = this.calculateHand(sessionData);
        let totalDealer = this.dealerTurn(sessionData);

        if (totalDealer > 21) {
          sessionData.status = SessionStatus['finished'];
          return 'you win ' + totalDealer + ' ' + totalValueStand;
        }
        if (totalDealer === 21) {
          sessionData.status = SessionStatus['finished'];
          return 'you lose :c' + totalDealer + ' ' + totalValueStand;
        }
        if (
          totalValueStand[0] > totalDealer ||
          totalValueStand[1] > totalDealer
        ) {
          sessionData.status = SessionStatus['finished'];
          return 'you win ' + totalDealer + ' ' + totalValueStand;
        } else {
          sessionData.status = SessionStatus['finished'];
          return 'you lose ' + totalDealer + ' ' + totalValueStand;
        }
      case 'double_down':
        return 'function not added';
      case 'split':
        return 'function not added';
      default:
        throw new NotFoundException('Not a valid action');
    }
  }

  async clearHand(id: string) {
    const sessionData = await this.findSession(id);
    await this.sessionsRepository.update(sessionData.id, {
      dealerHand: [],
      playerHand: [],
      status: SessionStatus['idle'],
    });
    return sessionData;
  }

  async deleteSession(id: string) {
    const sessionData = await this.findSession(id);
    if (!sessionData) {
      throw new NotFoundException('No sessions match');
    } else {
      await this.sessionsRepository.delete(id);
    }
  }
}
