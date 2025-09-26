import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity } from 'typeorm';

@Entity('roles')
export class RoleTypeorm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: false })
  isDefault: boolean;
  @Column({ nullable: false })
  newColumnCustom: boolean;
}
