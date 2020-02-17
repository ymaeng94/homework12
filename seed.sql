USE employeeDB;

INSERT INTO departement (name) VALUES ("Sales");
INSERT INTO departement (name) VALUES ("Engineering");
INSERT INTO departement (name) VALUES ("Finance");
INSERT INTO departement (name) VALUES ("Legal");


INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 125000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Chan", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ashley", "Rodriguez", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Tupik", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Malia", "Brown", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Lourd", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Allen", 7, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Christian", "Eckenrode", 8, 2);



