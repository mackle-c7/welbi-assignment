import { Resolver, Query, Arg } from "type-graphql";
import { Program } from "../models/Program";
import { Resident } from "../models/Resident";

@Resolver()
export class AppResolver {
  @Query(() => [Program])
  programs() {
    return Program.find();
  }

  @Query(() => [Resident])
  residents() {
    return Resident.find();
  }

  @Query(() => Program)
  book(@Arg("id") id: string) {
    return Program.findOne({ where: { id } });
  }

  // I struggled with creating the queries using graphql/typeorm and then ran out of time
  // (happy to explain how I would go about this) 

  @Query(() => [Program])
  async findProjectThatEngagesMostResidents() {
     let programs: Program[] = await Program.find();

     let result: Program[] = [];

     programs.forEach(x => {
       if (x.attendees) result.push(x);
     });

    //  let programs: Program[] = await Program.find().then(programs => programs.sort((a,b) => ((a.attendees !== undefined ? a.attendees: []).length > (b.attendees !== undefined ? b.attendees: []).length) ? 1 : ((b.attendees !== undefined ? b.attendees: []).length > (a.attendees !== undefined ? a.attendees: []).length) ? -1 : 0))
    
    return result;

  }
 

}