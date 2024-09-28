import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionStatus } from '../utils/SessionStatus';
import { UserModel } from 'src/user/user.model';

@Controller('/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  createSession(@Body() body: { title: string; deckQuantity: number }) {
    const session = this.sessionsService.createSession(
      body.title,
      body.deckQuantity,
    );
    return { session: session };
  }

  @Patch(':id')
  playerChoice(
    @Param('id') sessionId: string,
    @Body() body: { playerAction: string },
  ) {
    let playerAction = this.sessionsService.playerChoice(
      sessionId,
      body.playerAction,
    );
    return playerAction;
  }

  @Get(':id/card')
  startRound(@Param('id') sessionId: string) {
    let card = this.sessionsService.startRound(sessionId);
    return card;
  }

  @Patch(':id/clearHand')
  clearHand(@Param('id') sessionId: string) {
    this.sessionsService.clearHand(sessionId);
  }

  @Get()
  getSessionList() {
    return this.sessionsService.getSessionsList();
  }

  @Get(':id')
  getSession(@Param('id') id: string) {
    return this.sessionsService.getSession(id);
  }

  @Patch(':id')
  updateSession(
    @Param('id') sessionId: string,
    @Body()
    body: {
      userId: string;
      username: string;
      sessionStatus: string;
      currentMoney: number;
      title: string;
    },
  ) {
    let user: UserModel = { username: body.username, id: body.userId };
    this.sessionsService.updateSession(
      sessionId,
      SessionStatus['idle'],
      {
        user: user,
        money: body.currentMoney,
        playerHand: [
          {
            suits: '',
            values: '',
          },
        ],
      },
      body.title,
    );
    return null;
  }

  @Delete(':id')
  deleteSession(@Param('id') id: string) {
    this.sessionsService.deleteSession(id);
    return null;
  }
}
