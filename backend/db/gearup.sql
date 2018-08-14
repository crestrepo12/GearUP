-- DROP DATABASE IF EXISTS gearup;
-- CREATE DATABASE gearup;

-- \c gearup;

CREATE TABLE providers (
  ID SERIAL PRIMARY KEY UNIQUE,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password_digest VARCHAR NOT NULL,
  occupation VARCHAR,
  gender VARCHAR,
  bio VARCHAR,
	zipcode VARCHAR,
  phone_number VARCHAR(12),
	imgurl VARCHAR DEFAULT NULL,
  company_name VARCHAR
);

CREATE TABLE clients (
  ID SERIAL PRIMARY KEY UNIQUE,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  -- dob VARCHAR,
  age INTEGER NOT NULL,
  occupation VARCHAR,
  gender VARCHAR NOT NULL,
  residential_address VARCHAR NOT NULL,
	zipcode VARCHAR NOT NULL,
  phone_number VARCHAR(12) NOT NULL,
	imgurl VARCHAR DEFAULT NULL,
  bio VARCHAR,
  disability VARCHAR,
  medicaid BOOLEAN,
  -- hobbies VARCHAR,
  -- medical_history_id INTEGER REFERENCES medical_history(id),
  -- program_history VARCHAR,
  -- behaviors VARCHAR,
  -- behavior_strategy VARCHAR,
  provider_id INTEGER REFERENCES providers(ID) ON UPDATE CASCADE
);

CREATE TABLE life_skills (
  ID SERIAL PRIMARY KEY UNIQUE,
  categories VARCHAR
);

CREATE TABLE objectives (
  ID SERIAL PRIMARY KEY UNIQUE,
  life_skills_id INTEGER REFERENCES life_skills(ID) ON UPDATE CASCADE,
  objective VARCHAR
);

CREATE TABLE client_objectives (
  ID SERIAL PRIMARY KEY UNIQUE,
  client_id INTEGER REFERENCES clients(ID) ON UPDATE CASCADE,
  objective_id INTEGER REFERENCES objectives(ID) ON UPDATE CASCADE,
  objective_accomplished BOOLEAN
);

-- CREATE TABLE medical_history (
--   ID SERIAL PRIMARY KEY,
--   allergies VARCHAR,
--   diet VARCHAR,
--   current_medication VARCHAR,
--   past_medication VARCHAR
-- )
-- 
-- 
-- Values
-- * note only use single quotes
-- 

ALTER TABLE clients ALTER COLUMN medicaid SET DEFAULT FALSE;

INSERT INTO providers (firstname, lastname, email, password_digest, occupation, gender, bio, zipcode, phone_number, imgurl)
  VALUES
  ('carol', 'rest', 'ca@mail.com', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'MSW', 'Female', '12 years in Social Work, helping clients become more dependent on themselves and financially independent', '11215', '696-453-1121', DEFAULT),
  ('mike', 'mcd', 'mcdonald@mail.com', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'MSW', 'Male', '7 years in Social Work, helping clients become more dependent on themselves and financially independent', '10019', '696-425-1346', DEFAULT);

--

INSERT INTO clients (firstname, lastname, email, age, occupation, gender, residential_address, zipcode, phone_number, imgurl, bio, disability, medicaid, provider_id) 
  VALUES 
  ('Chadd', 'Lepere', 'clepere0@webnode.com', 12, 'Student', 'Male', '64393 Gateway Hill, NYC, NY', '10019', '681-833-4858', 'https://images.pexels.com/photos/670740/pexels-photo-670740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', DEFAULT, 1),
  ('Camella', 'Antrobus', 'cantrobus1@noaa.gov', 27, 'Graphic Designer', 'Female', '2 Helena Junction, NYC, NY', '10019', '268-109-7437', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2),
  ('Blondie', 'Andreaccio', 'bandreaccio2@pbs.org', 27, 'College Student', 'Female', '6 Stephen Place, NYC, NY', '10019', '239-270-6423', 'https://images.pexels.com/photos/253758/pexels-photo-253758.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', DEFAULT, 1),
  ('Shaine', 'Carrol', 'scarrol3@tumblr.com', 15, 'Student', 'Male', '470 Twin Pines Circle, NYC, NY', '10019', '583-929-9660', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', DEFAULT, 2),
  ('Christoph', 'Lieb', 'clieb4@senate.gov', 13, 'Student', 'Male', '1842 Emmet Drive, NYC, NY', '10019', '173-184-3962', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 1),
  ('Vinita', 'Jedrzejewsky', 'vjedrzejewsky5@bluehost.com', 19, 'Student', 'Female', '43366 Trailsway Way, NYC, NY', '10019', '982-380-3384', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', DEFAULT, 2),
  ('Krishnah', 'Luten', 'kluten6@weibo.com', 21, 'Vocational Student', 'Male', '403 Waywood Alley, NYC, NY', '10019', '936-316-0710', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=140', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 1),
  ('Ardys', 'Grigorushkin', 'agrigorushkin7@unesco.org', 20, 'Day Care Program Aide', 'Female', '23796 Fulton Avenue, NYC, NY', '10019', '635-445-2226', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', DEFAULT, 2),
  ('Ulla', 'Been', 'ubeen8@moonfruit.com', 30, 'Registered Nurse', 'Female', '57181 Independence Lane, NYC, NY', '10019', '807-382-9031', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', DEFAULT, 1),
  ('Shani', 'Gostridge', 'sgostridge9@illinois.edu', 25, 'Software Engineer', 'Female', '2481 Menomonie Plaza, NYC, NY', '10019', '773-342-0963', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2),
  ('Bale', 'Pinnocke', 'bpinnockea@amazon.co.uk', 23, 'Automation Specialist', 'Male', '2622 Lunder Trail, NYC, NY', '10019', '240-858-0789', 'https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_1280.jpg', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', DEFAULT, 1),
  ('Jinny', 'Zupa', 'jzupab@dagondesign.com', 15, 'Student', 'Female', '98 Roxbury Court, NYC, NY', '10019', '140-219-9592', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2);

--

INSERT INTO life_skills (categories)
  VALUES
  ('Career Path and Employment'),
  ('Self Advocacy'),
  ('Health and Safety'),
  ('Socialization'),
  ('Community Participation and Personal Finances'),
  ('Transportation'),
  ('Recreation/Leisure'), 
  ('Home Living Skills');

--

INSERT INTO objectives (life_skills_id, objective)
  VALUES
  (1, 'Explore vocational interests and abilites for potential career path'),
  (1, 'Explore careers options'),
  (1, 'Join community services'),
  (1, 'Look into volunteer experiences'),
  (1, 'Have a dicussion about colleges, vocational, or technical schools'),
  (1, 'Look into employment programs'),
  (2, 'Review self advocacy'),
  (2, 'Attend self-advocacy groups to be aware of laws that protect you'),
  (2, 'Be informed about Social Security Benefits'),
  (2, 'Discuss about living arrangements (residential or independent living)'),
  (2, 'Review guardianship documentation'),
  (2, 'Register to vote'),
  (3, 'Review health and safety skills'),
  (3, 'Review health insurance option'),
  (4, 'Interacting over social media by not giving away personal information online'),
  (4, 'Do not not give your social security information to anybody'),
  (4, 'Make should you greet people with a hello and handshakes are optional'),
  (5, 'Review personal financial budget'),
  (5, 'Balance a check'),
  (6, 'Look into transporation services (public, ride sharing services, etc.)'),
  (7, 'Look into case managment services'),
  (7, 'Are you involved in recreation or leisure activities'),
  (8, 'Sort clothes by color'),
  (8, 'Fold clothes'),
  (8, 'Use the washer');

--
ALTER TABLE client_objectives ALTER COLUMN objective_accomplished SET DEFAULT FALSE;

INSERT INTO client_objectives (client_id, objective_id, objective_accomplished)
  VALUES
  (1, 1, DEFAULT), --12, student
  (1, 7, DEFAULT),
  (1, 13, DEFAULT),
  (1, 15, DEFAULT),
  (1, 17, true),
  (1, 22, true),
  (1, 23, true),
  (1, 24, true),
  (1, 25, true),
  (2, 7, DEFAULT), --27, graphic designer
  (2, 8, DEFAULT),
  (2, 9, DEFAULT),
  (2, 10, DEFAULT),
  (2, 12, true),
  (2, 22, true),
  (2, 23, true),
  (2, 24, true),
  (2, 25, DEFAULT),
  (3, 4, DEFAULT), --27, college student
  (3, 6, true),
  (3, 8, DEFAULT),
  (3, 9, DEFAULT),
  (3, 18, DEFAULT),
  (3, 23, DEFAULT),
  (3, 24, DEFAULT),
  (3, 25, DEFAULT),
  (4, 17, DEFAULT), --15, student
  (4, 22, DEFAULT),
  (4, 23, true),
  (4, 24, true),
  (5, 7,  DEFAULT), --13, student
  (5, 13, true),
  (5, 15, DEFAULT),
  (5, 17, DEFAULT),
  (5, 22, true),
  (5, 23, DEFAULT),
  (6, 13, DEFAULT), --19, student
  (6, 15, DEFAULT),
  (6, 17, DEFAULT),
  (6, 22, DEFAULT),
  (6, 23, DEFAULT),
  (7, 13, DEFAULT), --21, vocational student
  (7, 15, DEFAULT),
  (7, 17, true),
  (7, 22, DEFAULT),
  (7, 23, true),
  (7, 24, DEFAULT),
  (7, 25, DEFAULT),
  (8, 7, DEFAULT), --20, day care program aide
  (8, 8, DEFAULT),
  (8, 9, DEFAULT),
  (8, 10, true),
  (8, 11, DEFAULT),
  (8, 12, DEFAULT),
  (9, 7, DEFAULT),--30, registered nurse
  (9, 8, DEFAULT),
  (9, 9, DEFAULT),
  (9, 18, DEFAULT),
  (9, 23, true),
  (9, 24, true),
  (9, 25, true), 
  (10, 8, DEFAULT), --25, software engineer
  (10, 9, DEFAULT),
  (10, 18, DEFAULT),
  (10, 19, DEFAULT),
  (10, 23, true),
  (10, 24, true),
  (10, 25, true),
  (11, 9, DEFAULT), --23, automation specialist
  (11, 18, DEFAULT),
  (11, 19, DEFAULT),
  (11, 23, true),
  (11, 24, true),
  (11, 25, true),
  (12, 1, DEFAULT), --15, student
  (12, 7, DEFAULT),
  (12, 13, DEFAULT),
  (12, 15, DEFAULT),
  (12, 17, true),
  (12, 22, true),
  (12, 23, true),
  (12, 24, true),
  (12, 25, true);