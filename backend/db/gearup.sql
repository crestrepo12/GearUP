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
	imgurl VARCHAR DEFAULT '/images/User-Profile-256.png',
  company_name VARCHAR
);

CREATE TABLE age_group (
  ID SERIAL PRIMARY KEY UNIQUE,
  age_group_range VARCHAR
);

CREATE TABLE general_objectives (
  ID SERIAL PRIMARY KEY UNIQUE,
  age_group_id INTEGER REFERENCES age_group(ID) ON UPDATE CASCADE,
  objective VARCHAR,
  accomplished boolean
);

CREATE TABLE clients (
  ID SERIAL PRIMARY KEY UNIQUE,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  occupation VARCHAR,
  gender VARCHAR NOT NULL,
  residential_address VARCHAR NOT NULL,
	zipcode VARCHAR NOT NULL,
  phone_number VARCHAR(12) NOT NULL,
	imgurl VARCHAR DEFAULT '/images/User-Profile.png',
  bio VARCHAR,
  disability VARCHAR,
  medicaid boolean,
  -- hobbies VARCHAR,
  -- medical_history_id INTEGER REFERENCES medical_history(id),
  -- program_history VARCHAR,
  -- behaviors VARCHAR,
  -- behavior_strategy VARCHAR,
  provider_id INTEGER REFERENCES providers(ID) ON UPDATE CASCADE,
  general_objectives_id INTEGER REFERENCES general_objectives(ID) ON UPDATE CASCADE
);

CREATE TABLE client_objectives (
  ID SERIAL PRIMARY KEY UNIQUE,
  client_id INTEGER NOT NULL REFERENCES clients(ID) ON UPDATE CASCADE,
  objective VARCHAR,
  accomplished boolean 
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



INSERT INTO providers (firstname, lastname, email, password_digest, occupation, gender, bio, zipcode, phone_number, imgurl)
  VALUES
  ('carol', 'rest', 'ca@mail.com', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'MSW', 'Female', '12 years in Social Work, helping clients become more dependent on themselves and financially independent', '11215', '696-453-1121', DEFAULT),
  ('mike', 'mcd', 'mcdonald@mail.com', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'MSW', 'Male', '7 years in Social Work, helping clients become more dependent on themselves and financially independent', '10019', '696-425-1346', DEFAULT);

--

INSERT INTO clients (firstname, lastname, email, age, occupation, gender, residential_address, zipcode, phone_number, imgurl, bio, disability, medicaid, provider_id) 
  VALUES 
  ('Chadd', 'Lepere', 'clepere0@webnode.com', 12, 'Student', 'Male', '64393 Gateway Hill, NYC, NY', '10019', '681-833-4858', 'https://cdn.pixabay.com/photo/2017/10/12/10/41/child-2844209_1280.jpg', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 1),
  ('Camella', 'Antrobus', 'cantrobus1@noaa.gov', 27, 'Graphic Designer', 'Female', '2 Helena Junction, NYC, NY', '10019', '268-109-7437', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2),
  ('Blondie', 'Andreaccio', 'bandreaccio2@pbs.org', 27, 'College Student', 'Female', '6 Stephen Place, NYC, NY', '10019', '239-270-6423', 'https://cdn.pixabay.com/photo/2017/10/27/16/56/young-2894884_1280.jpg', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 1),
  ('Shaine', 'Carrol', 'scarrol3@tumblr.com', 15, 'Student', 'Male', '470 Twin Pines Circle, NYC, NY', '10019', '583-929-9660', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 2),
  ('Christoph', 'Lieb', 'clieb4@senate.gov', 13, 'Student', 'Male', '1842 Emmet Drive, NYC, NY', '10019', '173-184-3962', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 1),
  ('Vinita', 'Jedrzejewsky', 'vjedrzejewsky5@bluehost.com', 19, 'Student', 'Female', '43366 Trailsway Way, NYC, NY', '10019', '982-380-3384', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 2),
  ('Krishnah', 'Luten', 'kluten6@weibo.com', 21, 'Vocational Student', 'Male', '403 Waywood Alley, NYC, NY', '10019', '936-316-0710', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=140', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 1),
  ('Ardys', 'Grigorushkin', 'agrigorushkin7@unesco.org', 20, 'Day Care Program Aide', 'Female', '23796 Fulton Avenue, NYC, NY', '10019', '635-445-2226', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 2),
  ('Ulla', 'Been', 'ubeen8@moonfruit.com', 30, 'Registered Nurse', 'Female', '57181 Independence Lane, NYC, NY', '10019', '807-382-9031', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 1),
  ('Shani', 'Gostridge', 'sgostridge9@illinois.edu', 25, 'Software Engineer', 'Female', '2481 Menomonie Plaza, NYC, NY', '10019', '773-342-0963', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2),
  ('Bale', 'Pinnocke', 'bpinnockea@amazon.co.uk', 23, 'Automation Specialist', 'Male', '2622 Lunder Trail, NYC, NY', '10019', '240-858-0789', 'https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_1280.jpg', 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', false, 1),
  ('Jinny', 'Zupa', 'jzupab@dagondesign.com', 15, 'Student', 'Female', '98 Roxbury Court, NYC, NY', '10019', '140-219-9592', DEFAULT, 'Hello my name is _______, I come from _________. When I grow up, I would like to be a ________________.', 'autism spectrum', true, 2);


INSERT INTO client_objectives (client_id, objective, accomplished)
  VALUES
  (1, 'Write Letter', false),
  (1, 'Balance a check', false),
  (1, 'Sort clothes by color', true),
  (1, 'Fold clothes', true),
  (1, 'Use the washer', true),
  (2, 'Money Management', true),
  (2, 'Write Letter', false),
  (2, 'Balance a check', false),
  (2, 'Sort clothes by color', true),
  (2, 'Fold clothes', true),
  (2, 'Use the washer', true),
  (3, 'Write Letter', false),
  (3, 'Balance a check', false),
  (3, 'Sort clothes by color', true),
  (3, 'Fold clothes', true),
  (3, 'Use the washer', true),
  (3, 'Money Management', true),
  (4, 'Write Letter', false),
  (4, 'Balance a check', false),
  (4, 'Sort clothes by color', true),
  (4, 'Fold clothes', true),
  (4, 'Use the washer', true),
  (4, 'Money Management', true),
  (5, 'Write Letter', false),
  (5, 'Balance a check', false),
  (5, 'Sort clothes by color', true),
  (5, 'Fold clothes', true),
  (5, 'Use the washer', true),
  (5, 'Money Management', true),
  (6, 'Write Letter', false),
  (6, 'Balance a check', false),
  (6, 'Sort clothes by color', true),
  (6, 'Fold clothes', true),
  (6, 'Use the washer', true),
  (6, 'Money Management', true),
  (7, 'Write Letter', false),
  (7, 'Balance a check', false),
  (7, 'Sort clothes by color', true),
  (7, 'Fold clothes', true),
  (7, 'Use the washer', true),
  (7, 'Money Management', true),
  (8, 'Write Letter', false),
  (8, 'Balance a check', false),
  (8, 'Sort clothes by color', true),
  (8, 'Fold clothes', true),
  (8, 'Use the washer', true),
  (8, 'Money Management', true),
  (9, 'Write Letter', false),
  (9, 'Balance a check', false),
  (9, 'Sort clothes by color', true),
  (9, 'Fold clothes', true),
  (9, 'Use the washer', true),
  (9, 'Money Management', true),
  (10, 'Write Letter', false),
  (10, 'Balance a check', false),
  (10, 'Sort clothes by color', true),
  (10, 'Fold clothes', true),
  (10, 'Use the washer', true),
  (10, 'Money Management', true),
  (11, 'Write Letter', false),
  (11, 'Balance a check', false),
  (11, 'Sort clothes by color', true),
  (11, 'Fold clothes', true),
  (11, 'Use the washer', true),
  (11, 'Money Management', true),
  (12, 'Write Letter', false),
  (12, 'Balance a check', false),
  (12, 'Sort clothes by color', true),
  (12, 'Fold clothes', true),
  (12, 'Use the washer', true),
  (12, 'Money Management', true);

INSERT INTO age_group (age_group_range)
  VALUES
  ('12 - 16'), 
  ('17 - 22'), 
  ('23+'); 

INSERT INTO general_objectives (age_group_id, objective, accomplished) 
  VALUES
  (1, 'Explore vocational interests and abilites for potential career path', false),
  (1, 'Explore careers options', false),
  (1, 'Join community services', false),
  (1, 'Look into volunteer experiences', false),
  (1, 'Review self advocacy', false),
  (1, 'Review health and safety skills', false),
  (2, 'Have a dicussion about colleges, vocational, or technical schools', false),
  (2, 'Be informed about Social Security Benefits', false),
  (2, 'Discuss about living arrangements (residential or independent living)', false),
  (2, 'Look into employment programs', false),
  (2, 'Look into transporation services (public, ride sharing services, etc.)', false),
  (2, 'Register to vote', false),
  (3, 'Review health insurance option', false),
  (3, 'Look into case managment services', false),
  (3, 'Review guardianship documentation', false),
  (3, 'Are you involved in recreation or leisure activities', false),
  (3, 'Attend self-advocacy groups to be aware of laws that protect you', false),
  (3, 'Review personal financial budget', false);