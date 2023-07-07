USE employees_db;
INSERT INTO department (name)
VALUES ("Sales"),
       ("Accounting"),
       ("HR"),
       ("Shipping"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ('Salesman', 72000, 1),
       ('Book Keeper', 63000, 2),
       ('Hiring Manager', 61500, 3),
       ('Shipping Manager', 67200, 4),
       ('Office Manager', 76000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jack', 'Smith', 5, 1),
       ('Sam', 'West', 4, 1),
       ('Brooke', 'Till', 3, 1),
       ('Laura', 'Mates', 2, 1),
       ('Steve', 'Timmons', 1, 1);
