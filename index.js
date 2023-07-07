const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

console.log(process.env);

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: process.env.PASSWORD,
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const menu = function() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'Choices',
                choices: ['Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'View Employees'],
            }
        ]
    ).then(res => {
        if (res.Choices === 'View All Departments') {
            viewDepart();
        }
        if (res.Choices === 'Add Department') {
            addDepart();
        }
        if (res.Choices === 'Add Role') {
            addRole();
        }
        if (res.Choices === 'View All Roles') {
            viewRoles();
        }
        if (res.Choices === 'Update Employee Role') {
            updateRole();
        }
        if (res.Choices === 'Add Employee') {
            addEmpl();
        }
        if (res.Choices === 'View Employees') {
            viewEmpl();
        }
    }).catch(err=> console.log(err))
}

const viewEmpl = function() {
    db.query('SELECT * FROM employee', (err, data) => {
        console.table(data);
        menu();
    })
};

const viewDepart = function() {
    db.query('SELECT * FROM department',(err, data) => {
        console.table(data);
        menu();
    })
};

const viewRoles = function() {
    db.query('SELECT * FROM role',(err, data) => {
        console.table(data);
        menu();
    })
};

const addDepart = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the Department name?',
                name: 'department'
            }
        ]).then(res => {
            db.query('INSERT INTO department (name) values (?)', [res.department], (err, data) => {
                console.table(data);
                menu();
            })
        })
}

const addEmpl = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the Employee's first name?",
                name: 'employeeFirst'
            },
            {
                type: 'input',
                message: "What is the Employee's last name?",
                name: 'employeeLast'
            },
            {
                type: 'input',
                message: 'What is the Role id #?',
                name: 'roleId'
            },
            {
                type: 'input',
                message: 'What is the Manager id #?',
                name: 'mangId'
            }

        ]).then(res => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)', [res.employeeFirst, res.employeeLast, res.roleId, res.mangId], (err, data) => {
                console.table(data);
                console.log(err);
                menu();
            })
        })
}

const addRole = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the new role's title?",
                name: 'title'
            },
            {
                type: 'input',
                message: "What is the new role's salary?",
                name: 'salary'
            },
            {
                type: 'input',
                message: "What is the new role's department id?",
                name: 'deptId'
            },

        ]).then(res => {
            db.query('INSERT INTO role (title, salary, department_id) values (?,?,?)', [res.title, res.salary, res.deptId], (err, data) => {
                console.table(data);
                console.log(err);
                menu();
            })
        })
}

const updateRole = function() {


    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Select the employee to update.',
                name: 'empl'
            },
            {
                type: 'input',
                message: "What is the employee's new role id?",
                name: 'roleId'
            }
        ]).then(res => {
            db.query(`UPDATE employee, SET role_id = ${res.roleId} WHERE id = ${res.empl}`, (err, data) => {
                console.table(data);
                console.log(err);
                menu();
            })
        })
}

menu();