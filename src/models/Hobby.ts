import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Program } from "./Program";
import { Resident } from "./Resident";

@Entity('hobby')
@ObjectType()
export class Hobby extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @ManyToMany(() => Program, { lazy: true })
  @JoinTable({
      name: 'program_hobby',
      joinColumn: {
          name: 'hobby_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'program_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Program])
  programs: Promise<Program[]>;

  @ManyToMany(() => Resident, { lazy: true })
  @JoinTable({
      name: 'resident_hobby',
      joinColumn: {
          name: 'hobby_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'resident_id',
          referencedColumnName: 'userId'
      }
  })
  @Field(() => [Resident])
  residents: Promise<Resident[]>;

}