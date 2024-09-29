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

  @Get()
  getSessionList() {
    return this.sessionsService.getSessionsList();
  }

  @Get(':id')
  getSession(@Param('id') id: string) {
    return this.sessionsService.getSession(id);
  }

  @Get(':id/card')
  startRound(@Param('id') id: string) {
    const card = this.sessionsService.startRound(id);
    return { card: card };
  }

  @Patch(':id')
  playerChoice(
    @Param('id') id: string,
    @Body() body: { playerAction: string },
  ) {
    const playerAction = this.sessionsService.playerChoice(
      id,
      body.playerAction,
    );
    return { playerAction: playerAction };
  }

  @Patch(':id/clearHand')
  clearHand(@Param('id') sessionId: string) {
    this.sessionsService.clearHand(sessionId);
  }

  @Delete(':id')
  deleteSession(@Param('id') id: string) {
    this.sessionsService.deleteSession(id);
    return null;
  }
}
