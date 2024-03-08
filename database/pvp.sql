CREATE DATABASE pvp45;
USE pvp45;

CREATE TABLE student (
  stud_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  stud_username VARCHAR(20) NOT NULL,
  stud_password VARCHAR(20) NOT NULL,
  college_code VARCHAR(10) NOT NULL
 
);

INSERT INTO student (stud_username, stud_password, college_code)
VALUES
  ('puser1', 'pass1', 'pvp45'),
  ('puser2', 'pass2', 'pvp45'),
  ('puser3', 'pass3', 'pvp45');
   