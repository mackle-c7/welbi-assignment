import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Program } from "./Program";

@Entity()
@ObjectType()
export class LevelOfCare extends BaseEntity {
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
          name: 'level_of_care_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'program_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Program])
  programs: Promise<Program[]>;
}