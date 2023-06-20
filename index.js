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
                choices: ['Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
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
    }).catch(err=> console.log(err))
}

const viewDepart = function() {
    db.query('SELECT * FROM department',(err, data)=> {
        console.table(data);
        menu();
    })
};

const viewRoles = function() {
    db.query('SELECT * FROM role',(err, data)=> {
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
                message: "What is the Employee's name?",
                name: 'employee'
            }
        ]).then(res => {
            db.query('INSERT INTO employee (name) values (?)', [res.employee], (err, data) => {
                console.table(data);
                menu();
            })
        })
}

const addRole = function() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the new role's name?",
                name: 'role'
            }
        ]).then(res => {
            db.query('INSERT INTO role (name) values (?)', [res.role], (err, data) => {
                console.table(data);
                menu();
            })
        })
}

const updateRole = function() {


    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select the employee to update.',
                choices: [    db.query('SELECT * FROM employee', (err, data) => {
                    console.table(data);
                 })
                ]
            }
        ]).then(res => {
            const empl = res;
            const roles = db.query('SELECT * FROM role',);

            inquirer.prompt([
                {
                    type: 'list',
                    message: "Select the Employee's new Role.",
                    name: 'RoleSelect',
                    choices: [roles],
                }
            ]). then(res => {
                db.query(`UPDATE employee SET role_id = {empl}`)
            })
        })
}

menu();