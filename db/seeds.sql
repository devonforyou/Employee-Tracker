INSERT INTO departments (name)
VALUES ('Administration'),
('Marketing'),
('Human Resources'),
('IT');

INSERT INTO roles (title, salary, department_id)
VALUES ('IT Director', 160000, 4),
('System Administrator', 70000, 4),
('Database Administrator', 60000, 4),
('Chief HR Officer', 96000, 3),
('Recruiter', 74000, 3),
('Director of Sales', 180000 , 2),
('Account Manager', 90000, 2),
('Sales Representative', 62000, 2),
('Social Media Marketing', 55000, 2),
('Office Administration', 73000, 1),
('Secretary', 69000, 1),
('Chief Executive Officer', 430000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Chester', 'Bennington', 12, NULL),
('ASAP', 'Rocky', 6, NULL),
('ASAP', 'Ferg', 1, NULL), 
('Sullivan', 'King', 4, NULL),
('Jake', 'Hill', 3, 3),
('Jay', 'Zee', 8, 2),
('Lady', 'Gaga', 7, 2),
('Lil', 'Yachty', 8, 2),
('Katy', 'Perry', 2, 3),
('Black', 'Pink', 3, 3),
('Tyler', 'Creator', 11, 1),
('Mi', 'Gos', 8, 2),
('Pink', 'Doll', 9, 2),
('Ice', 'Spice', 5, 4),
('Kendrick', 'Lamar', 10, 1),
('Ill', 'Enium', 9, 2)
