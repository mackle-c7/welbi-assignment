import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Program } from "./Program";

@Entity()
@ObjectType()
export class Dimension extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @ManyToMany(() => Program, { lazy: true })
  @JoinTable({
      name: 'program_dimensions',
      joinColumn: {
          name: 'dimension_id',
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