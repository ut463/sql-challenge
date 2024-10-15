const inquirer = require("inquirer");
const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'Pie',
        host: 'localhost',
        database: 'who makes the money'
    },
    console.log(`Connected to the database.`)
)

pool.connect()

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'what would you like to do?',
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Role',
                'Exit',
            ],
        }
    ]).then((answer) => {
        switch (answer.action) {
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
            case 'Exit':
                process.exit();
        }
    });
}

function viewDepartments() {
    const query = 'SELECT * FROM departments';
    pool.query(query, (err, result) => {
        if (err) throw err;
        console.table(result.rows); // collect rows from result
        start();
    });
}

function viewRoles() {
    const query = `
    SELECT 
        roles.title, 
        roles.id, 
        departments.department_name, 
        roles.salary 
    FROM 
        roles 
    JOIN 
        departments 
    ON 
        roles.department_id = departments.id
    `;
    pool.query(query, (err, result) => {
        if (err) throw err;
        console.table(result.rows);
        start();
    });
}

function viewEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    `;
    pool.query(query, (err, result) => {
        if (err) throw err;
        console.table(result.rows);
        start();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter name of new department:',
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO departments (department_name) VALUES ('${answer.name}')`;
            pool.query(query, (err, result) => {
                if (err) throw err;
                console.log(`Added department ${answer.name}.`);
                start();
            })
        });
}

function addRole() {
    const query = `
    SELECT 
        departments.department_name as name,
        departments.id as value
    FROM
        departments`;

    pool.query(query, (err, departments) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the new role title:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary of new role:',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select the department for the role:',
                    choices: departments.rows,
                },
            ])
            .then((answers) => {
                const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1,$2,$3)';
                pool.query(
                    query,
                    Object.values(answers),
                    (err, result) => {
                        if (err) throw err;
                        console.log(`Added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department.`);
                        start();
                    });
            })
    });


}