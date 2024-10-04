import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import DeckInterface from 'src/utils/DeckInterface';

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  title: string;

  @Column()
  deckQuantity: number;

  @Column()
  status: number;

  @Column('jsonb', { nullable: true })
  dealerHand: [DeckInterface];

  @Column('jsonb', { nullable: true })
  playerHand: [DeckInterface];

  @Column('jsonb', { nullable: true })
  cardsPlayed: [DeckInterface];
}
