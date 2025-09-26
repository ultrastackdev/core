import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Company } from './company.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  middleName: string;

  @Column({
    nullable: true,
  })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  password: string;

  @Column({
    nullable: true,
  })
  designation: string;

  @Column({ nullable: true })
  enabled: boolean;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  language: string;

  @Column({ enum: ['male', 'female'], nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  intersets: string;

  @Column({ nullable: true })
  bio: string;
}
