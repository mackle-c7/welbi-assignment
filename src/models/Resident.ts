import { Entity, BaseEntity, Column, ManyToMany, JoinTable, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Hobby } from './Hobby';
import { LevelOfCare } from './LevelOfCare';
import { Program } from "./Program";


@Entity('residents')
@ObjectType()
export class Resident extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({name: "user_id" })
  userId: string;

  @Field(() => String)
  @Column({nullable: true})
  name: string;

  @Field(() => String)
  @Column({nullable: true})
  gender: string;

  @Field(() => String)
  @Column({nullable: true})
  birthday: string;

  @Field(() => String)
  @Column({nullable: true, name: 'move_in_date'})
  moveInDate: string;

  @ManyToMany(() => Hobby, { lazy: true })
  @JoinTable({
      name: 'resident_hobby',
      joinColumn: {
          name: 'resident_id',
          referencedColumnName: 'userId'
      },
      inverseJoinColumn: {
          name: 'hobby_id',
          referencedColumnName: 'id'
      }
  })
 
  @ManyToMany(() => Hobby, { lazy: false })
  @JoinTable({
      name: 'resident_hobby',
      joinColumn: {
          name: 'resident_id',
          referencedColumnName: 'userId'
      },
      inverseJoinColumn: {
          name: 'hobby_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Hobby])
  hobbies: Hobby[];
  
  @OneToOne(() => LevelOfCare)
  @JoinColumn({name: 'level_of_care_id'})
  levelOfCare: LevelOfCare

  @ManyToMany(() => Program, { lazy: true })
  @JoinTable({
      name: 'program_attendee',
      joinColumn: {
          name: 'resident_user_id',
          referencedColumnName: 'userId'
      },
      inverseJoinColumn: {
          name: 'program_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Program])
  programs: Promise<Program[]>;
}