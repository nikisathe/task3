CREATE DATABASE PREC01;
USE PREC01;

CREATE TABLE student (
  stud_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  stud_username VARCHAR(20) NOT NULL,
  stud_password VARCHAR(20) NOT NULL,
  college_code VARCHAR(10) NOT NULL
 
);

INSERT INTO student (stud_username, stud_password, college_code)
VALUES
  ('user1', 'pass1', 'PREC01'),
  ('user2', 'pass2', 'Amrt17'),
  ('user3', 'pass3', 'pvp45');
   