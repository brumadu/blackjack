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

@Controller('/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async createSession(@Body() body: { title: string; deckQuantity: number }) {
    const session = await this.sessionsService.createSession(
      body.title,
      body.deckQuantity,
    );

    return session;
  }

  @Get()
  async getSessionList() {
    const session = await this.sessionsService.getSessionsList();
    return session;
  }

  @Get(':id')
  async getSession(@Param('id') id: string) {
    const session = await this.sessionsService.getSession(id);
    return session;
  }

  @Get(':id/card')
  async startRound(@Param('id') id: string) {
    const card = await this.sessionsService.startRound(id);
    return card;
  }

  @Patch(':id')
  async playerChoice(
    @Param('id') id: string,
    @Body() body: { playerAction: string },
  ) {
    const playerAction = await this.sessionsService.playerChoice(
      id,
      body.playerAction,
    );
    return playerAction;
  }

  @Patch(':id/clearHand')
  clearHand(@Param('id') sessionId: string) {
    this.sessionsService.clearHand(sessionId);
  }

  @Delete(':id')
  deleteSession(@Param('id') id: string) {
    this.sessionsService.deleteSession(id);
  }
}
