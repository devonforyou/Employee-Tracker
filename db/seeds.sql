INSERT INTO  department (name)
VALUES ("Administration"),
("Marketing"),
("Human Resources"),
("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("IT Director", 160.000, 4),1 
("System Administrator", 70.000, 4),2
("Database Administrator", 60.000, 4),3
("Chief HR Officer", 96.000, 3),4
("Recruiter", 74.000, 3),5
("Director of Sales", 180.000 , 2),6
("Account Manager", 90.000, 2),7
("Sales Representative", 62.000, 2), 8
("Social Media Marketing", 55.000, 2),9
("Office Administration", 73.000, 1),10
("Secretary", 69.000, 1),11
("Chief Executive Officer", 430.000, 1)12

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jake", "Hill", 3, NULL),
("Jay", "Zee", 4, 1),
("Lady", "Gaga", 7, 1),
("Chester", "Bennington", 12, NULL),
("Lil", "Yachty", 8, NULL),
("Katy", "Perry", 2, NULL),
("Black", "Pink", 3, NULL ),
("Sullivan", "King", 4, 1),
("Tyler", "Creator", 11, NULL),
("Mi", "Gos", 8, NULL),
("Pink", "Doll", 9, NULL),
("Ice", "Spice", 5, NULL),
("ASAP", "Rocky", 6, 1),
("ASAP", "Ferg", 1, 1),
("Kendrick", "Lamar", 10, NULL),
("Ill", "Enium", 9, NULL)
