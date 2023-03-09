CREATE TABLE level_of_care (
    id SERIAL,
    name VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT level_of_care_name UNIQUE (name)
);

CREATE TABLE dimension (
    id SERIAL,
    name VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT dimension_name UNIQUE (name)
);

CREATE TABLE facilitator (
    id SERIAL,
    name VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT facilitator_name UNIQUE (name)
);

CREATE TABLE hobby (
    id SERIAL,
    name VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT hobby_name UNIQUE (name)
);

CREATE TABLE residents (
    user_id VARCHAR(255),
    name VARCHAR(255),
    gender VARCHAR(255),
    birthday TIMESTAMP WITHOUT TIME ZONE,
    move_in_date TIMESTAMP WITHOUT TIME ZONE,
    level_of_care_id INT,
    room_number INT,
    PRIMARY KEY (user_id),
    CONSTRAINT FK_level_of_care FOREIGN KEY (level_of_care_id)
    REFERENCES level_of_care(id)
);

CREATE TABLE programs (
    id varchar(255),
    name VARCHAR(255),
    start_datetime TIMESTAMP WITHOUT TIME ZONE,
    end_datetime TIMESTAMP WITHOUT TIME ZONE,
    mode VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE programs_levels_of_care (
    program_id varchar(255),
    level_of_care_id INT,
    CONSTRAINT FK_program_levels_of_care_program_id FOREIGN KEY (program_id)
    REFERENCES programs(id),
    CONSTRAINT FK_program_levels_of_care_level_of_care_id FOREIGN KEY (level_of_care_id)
    REFERENCES level_of_care(id)
);

CREATE TABLE program_dimension (
    program_id varchar(255),
    dimension_id INT,
    CONSTRAINT FK_program_dimension_program_id FOREIGN KEY (program_id)
    REFERENCES programs(id),
    CONSTRAINT FK_program_dimension_dimension_id FOREIGN KEY (dimension_id)
    REFERENCES dimension(id)
);

CREATE TABLE program_facilitator (
    program_id varchar(255),
    facilitator_id INT,
    CONSTRAINT FK_program_facilitor_program_id FOREIGN KEY (program_id)
    REFERENCES programs(id),
    CONSTRAINT FK_program_facilitor_facilitator_id FOREIGN KEY (facilitator_id)
    REFERENCES facilitator(id)
);

CREATE TABLE resident_hobby (
    resident_id varchar(255),
    hobby_id INT,
    CONSTRAINT FK_resident_hobby_resident_id FOREIGN KEY (resident_id)
    REFERENCES residents(user_id),
    CONSTRAINT FK_resident_hobby_hobby_id FOREIGN KEY (hobby_id)
    REFERENCES hobby(id)
);

CREATE TABLE program_attendee (
    program_id varchar(255),
    resident_user_id varchar(255),
    CONSTRAINT FK_program_attendee_program_id FOREIGN KEY (program_id)
    REFERENCES programs(id),
    CONSTRAINT FK_program_attendee_resident_id FOREIGN KEY (resident_user_id)
    REFERENCES residents(user_id)
);

CREATE TABLE program_hobby (
    program_id varchar(255),
    hobby_id INT,
    CONSTRAINT FK_program_hobby_program_id FOREIGN KEY (program_id)
    REFERENCES programs(id),
    CONSTRAINT FK_program_hobby_hobby_id FOREIGN KEY (hobby_id)
    REFERENCES hobby(id)
);




