DROP DATABASE IF EXISTS gearup;
CREATE DATABASE gearup;

\c gearup;

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
	imgurl VARCHAR DEFAULT 'images/User-Profile-256.png',
  company_name VARCHAR
);

CREATE TABLE clients (
  ID SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  occupation VARCHAR,
  gender VARCHAR NOT NULL,
  residential_address VARCHAR NOT NULL,
	zipcode VARCHAR NOT NULL,
  phone_number VARCHAR(12) NOT NULL,
	imgurl VARCHAR DEFAULT 'images/User-Profile-256.png',
  bio VARCHAR,
  disability VARCHAR,
  medicaid boolean,
  -- hobbies VARCHAR,
  -- medical_history_id INTEGER REFERENCES medical_history(id),
  -- program_history VARCHAR,
  -- behaviors VARCHAR,
  -- behavior_strategy VARCHAR,
  provider_id INTEGER REFERENCES providers(id) ON UPDATE CASCADE
);

-- CREATE TABLE age_groups (
--   ID SERIAL PRIMARY KEY,
--   age_range VARCHAR
-- );

-- client_age INTEGER NOT NULL REFERENCES clients(age) ON UPDATE CASCADE

-- CREATE TABLE objectives (
--   ID SERIAL PRIMARY KEY,
--   age_group_id INTEGER REFERENCES age_groups(id) ON UPDATE CASCADE,
--   activity VARCHAR (50)
-- );

-- CREATE TABLE client_objective (
--   ID SERIAL PRIMARY KEY,
--   objectives_id INTEGER REFERENCES objectives(id) ON UPDATE CASCADE,
--   client_id INTEGER REFERENCES clients(id) ON UPDATE CASCADE,
--   completed boolean,
--   -- rating numeric(1),
--   notes VARCHAR 
-- );

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



INSERT INTO providers (firstname, lastname, email, password_digest, occupation, gender, bio, zipcode, phone_number, imgurl)
  VALUES
  ('carol', 'rest', 'ca@mail.com', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'MSW', 'Female', '12 years in Social Work, helping clients become more dependent on themselves and financially independent', '11215', '696-453-1121', DEFAULT),
  ('mike', 'mcd', 'mcdonald@mail.com', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'MSW', 'Male', '7 years in Social Work, helping clients become more dependent on themselves and financially independent', '10019', '696-425-1346', DEFAULT);

--
  
INSERT INTO clients (firstname, lastname, email, age, occupation, gender, residential_address, zipcode, phone_number, imgurl, bio, disability, medicaid, provider_id) 
  VALUES 
  ('Chadd', 'Lepere', 'clepere0@webnode.com', 12, 'Clinical Specialist', 'Male', '64393 Gateway Hill, NYC, NY', '10019', '681-833-4858', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=140', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 1),
  ('Camella', 'Antrobus', 'cantrobus1@noaa.gov', 27, 'Graphic Designer', 'Female', '2 Helena Junction, NYC, NY', '10019', '268-109-7437', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2),
  ('Blondie', 'Andreaccio', 'bandreaccio2@pbs.org', 27, 'Quality Control Specialist', 'Female', '6 Stephen Place, NYC, NY', '10019', '239-270-6423', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 1),
  ('Shaine', 'Carrol', 'scarrol3@tumblr.com', 15, 'Automation Specialist II', 'Male', '470 Twin Pines Circle, NYC, NY', '10019', '583-929-9660', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 2),
  ('Christoph', 'Lieb', 'clieb4@senate.gov', 13, 'Systems Administrator II', 'Male', '1842 Emmet Drive, NYC, NY', '10019', '173-184-3962', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 1),
  ('Vinita', 'Jedrzejewsky', 'vjedrzejewsky5@bluehost.com', 19, 'Nuclear Power Engineer', 'Female', '43366 Trailsway Way, NYC, NY', '10019', '982-380-3384', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 2),
  ('Krishnah', 'Luten', 'kluten6@weibo.com', 21, 'Chief Design Engineer', 'Male', '403 Waywood Alley, NYC, NY', '10019', '936-316-0710', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 1),
  ('Ardys', 'Grigorushkin', 'agrigorushkin7@unesco.org', 20, 'Computer Systems Analyst II', 'Female', '23796 Fulton Avenue, NYC, NY', '10019', '635-445-2226', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 2),
  ('Ulla', 'Been', 'ubeen8@moonfruit.com', 30, 'Registered Nurse', 'Female', '57181 Independence Lane, NYC, NY', '10019', '807-382-9031', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 1),
  ('Shani', 'Gostridge', 'sgostridge9@illinois.edu', 25, 'Software Consultant', 'Female', '2481 Menomonie Plaza, NYC, NY', '10019', '773-342-0963', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2),
  ('Bale', 'Pinnocke', 'bpinnockea@amazon.co.uk', 23, 'Automation Specialist I', 'Male', '2622 Lunder Trail, NYC, NY', '10019', '240-858-0789', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 1),
  ('Jinny', 'Zupa', 'jzupab@dagondesign.com', 15, 'Paralegal', 'Female', '98 Roxbury Court, NYC, NY', '10019', '140-219-9592', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2);

  -- 

-- INSERT INTO age_groups ( id, age_range ) 
--   VALUES (1, '12 - 15' );
-- INSERT INTO age_groups ( id, age_range ) 
--   VALUES (2, '16 - 19');
-- INSERT INTO age_groups ( id, age_range ) 
--   VALUES (3, '20 - 23');
-- INSERT INTO age_groups ( id, age_range ) 
--   VALUES (4, '24 - 27');
-- INSERT INTO age_groups ( id, age_range ) 
--   VALUES (5, '28 - 31');
