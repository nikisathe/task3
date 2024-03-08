CREATE DATABASE AMRT12;
USE AMRT12;

CREATE TABLE student (
  stud_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  stud_username VARCHAR(20) NOT NULL,
  stud_password VARCHAR(20) NOT NULL,
  college_code VARCHAR(10) NOT NULL
 
);

INSERT INTO student (stud_username, stud_password, college_code)
VALUES
  ('Auser1', 'pass1', 'AMRT12'),
  ('Auser2', 'pass2', 'AMRT12'),
  ('Auser3', 'pass3', 'AMRT12');
   