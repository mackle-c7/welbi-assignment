
import json

jsonDataFileName = 'backend.json'
insertQueryFileName = 'insert_queries.SQL'

json_file = open(jsonDataFileName)

open(insertQueryFileName, 'w').close()

def write_to_db_insert_script(text):
    with open(insertQueryFileName, 'a') as f:
        f.write(text+"\n")

def create_hobby_insert_query(name):
    name =name.replace("'","''")
    insert_query = f"INSERT INTO hobby (name) VALUES ('{name}') ON CONFLICT (name) DO NOTHING;"
    write_to_db_insert_script(insert_query)

def create_facilitator_insert_query(name):
    name =name.replace("'","''")
    insert_query = f"INSERT INTO facilitator (name) VALUES ('{name}') ON CONFLICT (name) DO NOTHING;"
    write_to_db_insert_script(insert_query)

def create_dimension_insert_query(name):
    name =name.replace("'","''")
    insert_query = f"INSERT INTO dimension (name) VALUES ('{name}') ON CONFLICT (name) DO NOTHING;"
    write_to_db_insert_script(insert_query)

def create_level_of_care_insert_query(name):
    name =name.replace("'","''")
    insert_query = f"INSERT INTO level_of_care (name) VALUES ('{name}') ON CONFLICT (name) DO NOTHING;"
    write_to_db_insert_script(insert_query)

def create_residents_insert_query(userId, name, gender, birthday, moveInDate, levelOfCare, roomNumber):
    name =name.replace("'","''")
    insert_query = f"INSERT INTO residents (user_id, name, gender, birthday, move_in_date, level_of_care_id, room_number) VALUES ('{userId}', '{name}', '{gender}', '{birthday}', '{moveInDate}', (SELECT id FROM level_of_care WHERE name = '{levelOfCare}'), '{roomNumber}');"
    write_to_db_insert_script(insert_query)

def create_program_insert_query(id, name, start, end, mode):
    name =name.replace("'","''")
    insert_query = f"INSERT INTO programs (id, name, start_datetime, end_datetime, mode) VALUES ('{id}', '{name}', '{start}', '{end}', '{mode}');"
    write_to_db_insert_script(insert_query)

def create_program_levels_of_care_insert_query(programId, levelOfCare):
    name =name.replace("'","''")
    insert_query = f"INSERT INTO program_levels_of_care (program_id, level_of_care_id) VALUES ('{programId}', (SELECT id FROM level_of_care WHERE name = '{levelOfCare}'));"
    write_to_db_insert_script(insert_query)

def create_program_dimension_insert_query(programId, programDimension):
    insert_query = f"INSERT INTO program_dimension (program_id, dimension_id) VALUES ('{programId}', (SELECT id FROM dimension WHERE name = '{programDimension}'));"
    write_to_db_insert_script(insert_query)

def create_program_facilitor_query(programId, facilitatorName):
    insert_query = f"INSERT INTO program_facilitor (program_id, facilitator_id) VALUES ('{programId}', (SELECT id FROM facilitator WHERE name = '{facilitatorName}'));"
    write_to_db_insert_script(insert_query)

def create_program_attendee_query(programId, residentUserId):
    insert_query = f"INSERT INTO program_attendee (program_id, resident_user_id) VALUES ('{programId}', '{residentUserId}');"
    write_to_db_insert_script(insert_query)

def create_program_hobby_query(programId, hobby):
    insert_query = f"INSERT INTO program_hobby (program_id, hobby_id) VALUES ('{programId}', (SELECT id FROM hobby WHERE name = '{hobby}'));"
    write_to_db_insert_script(insert_query)

def create_resident_hobby_query(residentId, hobby):
    insert_query = f"INSERT INTO resident_hobby (resident_id, hobby_id) VALUES ('{residentId}', (SELECT id FROM hobby WHERE name = '{hobby}'));"
    write_to_db_insert_script(insert_query)

def insertHobbies(hobbiesString):
    hobbies = hobbiesString.split(",")
    for hobby in hobbies:
        create_hobby_insert_query(hobby)

def insertLevelsOfCare(levelsOfCareString):
    levelsOfCare = levelsOfCareString.split(",")
    for levelOfCare in levelsOfCare:
        create_level_of_care_insert_query(levelOfCare)

def insertDimensions(dimensionsStrin):
    dimensions = dimensionsStrin.split(",")
    for dimension in dimensions:
        create_dimension_insert_query(dimension)

def insertFacilitators(facilitatorsString):
    facilitators = facilitatorsString.split(",")
    for facilitator in facilitators:
        create_facilitator_insert_query(facilitator)

def insertProgramLevelsOfCare(programId, levelsOfCareString):
    levelsOfCare = levelsOfCareString.split(",")
    for levelOfCare in levelsOfCare:
        create_program_levels_of_care_insert_query(programId, levelOfCare)
    
def insertProgramDimensions(programId, dimensionsString):
    dimensions = dimensionsString.split(",")
    for dimension in dimensions:
        create_program_dimension_insert_query(programId, dimension)

def insertProgramFacilitators(programId, facilitatorsString):
    facilitators = facilitatorsString.split(",")
    for facilitator in facilitators:
        create_program_facilitor_query(programId, facilitator)   

def insertProgramAttendee(programId, attendeeArray):
    for attendee in attendeeArray:
        create_program_attendee_query(programId, attendee['userId'])   

def insertProgramHobbies(programId, hobbiesString):
    hobbies = hobbiesString.split(",")
    for hobby in hobbies:
        create_program_hobby_query(programId, hobby)

def insertResidentHobbies(residentId, hobbiesString):
    hobbies = hobbiesString.split(",")
    for hobby in hobbies:
        create_resident_hobby_query(residentId, hobby)

# returns JSON object as 
# a dictionary
data = json.load(json_file)
  
# Iterating through the json
# list
for resident in data['residents']:
    if resident['hobbies'] is not None:
        insertHobbies(resident['hobbies'])
    if resident['levelOfCare'] is not None:
        insertLevelsOfCare(resident['levelOfCare'])

for program in data['programs']:
    if program['hobbies'] is not None:
        insertHobbies(program['hobbies'])
    if program['levelsOfCare'] is not None:
        insertLevelsOfCare(program['levelsOfCare'])
    if program['facilitators'] is not None:
        insertFacilitators(program['facilitators'])
    if program['dimensions'] is not None:
        insertDimensions(program['dimensions'])

for resident in data['residents']:
    create_residents_insert_query(resident['userId'], resident['name'], resident['gender'], resident['birthday'], resident['moveInDate'], resident['levelOfCare'], resident['roomNumber'])
    if resident['hobbies'] is not None:
        insertResidentHobbies(resident['userId'], resident['hobbies'])

for program in data['programs']:
    create_program_insert_query(program['id'], program['name'], program['start'], program['end'], program['mode'])
    if program['dimensions'] is not None:
        insertProgramDimensions(program['id'], program['dimensions'])
    if program['facilitators'] is not None:
        insertProgramFacilitators(program['id'], program['facilitators'])
    if program['hobbies'] is not None:
        insertProgramHobbies(program['id'], program['hobbies'])
    if program['attendees'] is not None:
        insertProgramAttendee(program['id'], program['attendees'])

  
print('Complete')