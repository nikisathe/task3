
CREATE DATABASE college;
USE college;

CREATE TABLE college_list (
  college_code VARCHAR(10) PRIMARY KEY,
  college_name VARCHAR(100) NOT NULL
);

INSERT INTO college_list (college_code, college_name)
VALUES
  ('PREC01', 'PREC College'),
  ('Amrt17', 'PVP College'),
  ('pvp45', 'AMRT College');
 select * from college_list;