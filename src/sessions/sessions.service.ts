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
  private sessionDeck = new Map();
  private findSession(id: string) {
    const sessionData = this.sessionsRepository.findOneBy({ id });
    if (!sessionData) {
      throw new NotFoundException('No sessions match');
    }
    return sessionData;
  }

  async createSession(title: string, deckQuantity: number) {
    const newDeck = DeckList(deckQuantity);
    const status = SessionStatus['idle'];
    const sessionData = this.sessionsRepository.create({
      title: title,
      status: status,
    });
    const data = await this.sessionsRepository.save(sessionData);
    if (data.id !== undefined) {
      this.sessionDeck[data.id] = { newDeck };
    }
    return data;
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
    if (sessionData.status === 0) {
      let startSession = {
        dealerHand: [],
        playerHand: [],
        cardsPlayed: [],
        status: undefined,
      };
      for (let i = 0; i < 2; i++) {
        let dealerCard = this.getRandomCard(this.sessionDeck[id].newDeck)[0];
        let playerCard = this.getRandomCard(this.sessionDeck[id].newDeck)[0];
        startSession.dealerHand.push(dealerCard);
        startSession.playerHand.push(playerCard);
        startSession.cardsPlayed.push(dealerCard, playerCard);
      }
      startSession.status = SessionStatus['in_progress'];

      const sessionMerge = this.sessionsRepository.merge(
        sessionData,
        startSession,
      );

      let data = await this.sessionsRepository.save(sessionMerge);
      return data;
    }
    throw new NotFoundException('Already in progress');
  }

  private dealerTurn(session: Sessions) {
    let totalDealer = this.calculateHand(session.dealerHand);
    if (totalDealer[1] > 17 && totalDealer[1] < 21) {
      return totalDealer[1];
    }
    if (totalDealer[0] > 17) {
      return totalDealer[0];
    } else {
      let newCard = this.getRandomCard(this.sessionDeck[session.id].newDeck)[0];
      session.dealerHand.push(newCard);
      session.cardsPlayed.push(newCard);
      this.sessionsRepository.save(session);
      return this.dealerTurn(session);
    }
  }

  private calculateHand(session) {
    console.log(session);
    let numbers = [];
    session.forEach((e) => numbers.push(CardValue(e.values)));
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

    switch (playerAction) {
      case 'hit':
        let newCard = this.getRandomCard(this.sessionDeck[id].newDeck)[0];
        sessionData.playerHand.push(newCard);
        sessionData.cardsPlayed.push(newCard);
        sessionData.status = SessionStatus['in_progress'];
        this.sessionsRepository.save(sessionData);
        let totalValueHit = this.calculateHand(sessionData.playerHand);
        if (totalValueHit[0] >= 21) {
          sessionData.status = SessionStatus['player_done'];
        }
        return await this.sessionsRepository.save(sessionData);
      case 'stand':
        sessionData.status = SessionStatus['player_done'];
        let totalValueStand = this.calculateHand(sessionData.playerHand);
        let totalDealer = this.dealerTurn(sessionData);

        if (totalDealer > 21) {
          sessionData.status = SessionStatus['finished'];
          return 'you win';
        }
        if (totalDealer === 21) {
          sessionData.status = SessionStatus['finished'];
          return 'you lose';
        }
        if (
          totalValueStand[0] > totalDealer ||
          totalValueStand[1] > totalDealer
        ) {
          sessionData.status = SessionStatus['finished'];
          return 'you win';
        } else {
          sessionData.status = SessionStatus['finished'];
          return 'you lose';
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
