import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import DeckInterface from 'src/utils/DeckInterface';

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  title: string;

  @Column()
  status: number;

  @Column()
  users: User;

  @Column()
  dealerHand: [DeckInterface];

  @Column()
  playerHand: [DeckInterface];

  @Column()
  cardsPlayed: [DeckInterface];
}
