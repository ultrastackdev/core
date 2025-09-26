import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Business } from './business.entity';
import { User } from './user.entity';

export enum Country {
  Egypt = 'Egypt',
  Sudan = 'Sudan',
  Nigeria = 'Nigeria',
  KSA = 'KSA',
  UAE = 'UAE',
}

export enum Industry {
  Distribution = 'Distribution',
  Manufacturing = 'Manufacturing',
  Retail = 'Retail',
  Education = 'Education',
  Services = 'Services',
  Agricultural = 'Agricultural',
  NonProfit = 'Non-Profit',
  Others = 'Others',
}

export enum NumberOfEmployees {
  OneToTen = '1-10',
  ElevenToFifty = '11-50',
  FiftyOneToTwoHundred = '51-200',
  TwoHundredOneToFiveHundred = '201-500',
  FiveHundredOneToOneThousand = '501-1000',
  OneThousandPlus = '1000+',
}

export enum Language {
  English = 'English',
}

export enum TimeZone {
  UTC = 'UTC',
  GMT = 'GMT',
  EST = 'EST',
  CST = 'CST',
  EET = 'EET',
  EDT = 'EDT',
  CET = 'CET',
  CEST = 'CEST',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  INR = 'INR',
  JPY = 'JPY',
  CNY = 'CNY',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  SGD = 'SGD',
  ZAR = 'ZAR',
  NZD = 'NZD',
  SEK = 'SEK',
  NOK = 'NOK',
  DKK = 'DKK',
  RUB = 'RUB',
  BRL = 'BRL',
  MXN = 'MXN',
  AED = 'AED',
  SAR = 'SAR',
  QAR = 'QAR',
  KWD = 'KWD',
}

export enum ChartOfAccounts {
  Standard = 'Standard',
  StandardWithNumbers = 'StandardWithNumbers',
}

export enum AccountNumberStartingWith {
  OneThousand = 1000,
  TenThousand = 10000,
  OneHundredThousand = 100000,
  OneMillion = 1000000,
}

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @Column({ enum: Country })
  country: Country;

  @Column({ enum: Industry })
  industry: Industry;

  @Column({ enum: NumberOfEmployees })
  numberOfEmployees: NumberOfEmployees;

  @Column({ enum: Language })
  language: Language;

  @Column({ enum: TimeZone })
  timeZone: TimeZone;

  @Column({ enum: Currency })
  currency: Currency;

  @Column({ enum: ChartOfAccounts })
  chartOfAccounts: ChartOfAccounts;

  @Column({ enum: AccountNumberStartingWith, nullable: true })
  accountNumberStartingWith: AccountNumberStartingWith;

  @Column()
  financialYearBeginsOn: Date;

  @ManyToOne(() => Business)
  @JoinColumn()
  business: Business;
}
