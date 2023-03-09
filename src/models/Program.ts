import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Facilitator } from "./Facilitator";
import { Dimension } from "./Dimension";
import { Resident } from "./Resident";
import { LevelOfCare } from "./LevelOfCare";
import { Hobby } from "./Hobby";

@Entity('programs')
@ObjectType()
export class Program extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({name: 'start_datetime'})
  start: string;

  @Field(() => String)
  @Column({name: 'end_datetime'})
  end: string;

  @Field(() => String)
  @Column()
  mode: string;

  @ManyToMany(() => Facilitator, { lazy: true })
  @JoinTable({
      name: 'program_facilitator',
      joinColumn: {
          name: 'program_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'facilitator_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Facilitator])
  facilitators: Promise<Facilitator[]>;

  @ManyToMany(() => Dimension, { lazy: true })
  @JoinTable({
      name: 'program_dimensions',
      joinColumn: {
          name: 'program_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'dimension_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Dimension])
  dimensions: Promise<Dimension[]>;

  @ManyToMany(() => LevelOfCare, { lazy: true })
  @JoinTable({
      name: 'programs_levels_of_care',
      joinColumn: {
          name: 'program_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'level_of_care_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [LevelOfCare])
  levelsOfCare: Promise<LevelOfCare[]>;

  @ManyToMany(() => Hobby, { lazy: false })
  @JoinTable({
      name: 'program_hobby',
      joinColumn: {
          name: 'program_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'hobby_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Hobby])
  hobbies: Hobby[];

  @ManyToMany(() => Resident, { lazy: false })
  @JoinTable({
      name: 'program_attendee',
      joinColumn: {
          name: 'program_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'resident_user_id',
          referencedColumnName: 'userId'
      }
  })
  @Field(() => [Resident])
  attendees: Resident[];

}