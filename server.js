var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "12345",
    database: "employeesDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected employeeDB from SQL")
    FirstQuestion();
});

//////////////////////////////////////////////////////////////////  0 first question: what do you want to do? (week12, activity13) /////////////////////////////////

function FirstQuestion () {
    inquirer 
    .prompt ({
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
            "View Employees",
            "View by Departments",
            "Add Department",
            "Add Roles",
            "Add Employees",
            "Update Employee's Role",
            "End"
            ]
    })
    .then(function ({ action }) {
        switch (action) {

        case "View Employees":
            viewEmployees();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "Add Departments":
            addDepartments();
            break;
        case "AddRoles":
            addRoles();
            break;
        case "AddEmployees":
            addEmployees();
            break;
        case "Update Employee's Role":
            updateEmployeeRole();
            break;
        case "End":
            end();
            break;

        }
    });

}

//////////////////////////////////////////////////////////////////////////////  1 view all employee ///////////////////////////////////////////////////

  function viewEmployees() {
    console.log("view all employee");
    var query= `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON d.id = r.department_id
    LEFT JOIN employee m ON m.id = e.manager_id`
      
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log("connected SQL for data");
      console.table(res);
      FirstQuestion();
    });
  }
  
////////////////////////////////////////////////////////////////////////////// 2 view employee by "department" //////////////////////////////////////////////

function viewDepartments(){

    var query = "SELECCT d.id, d.name, r.salary FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id"
    
    connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoice = res.map(data => ({
    value: data.id, name: data.name
    }));
    console.table(res);
    console.log("employee by department viewed successfully!")
    promptDepartment(departmentChoice);
  });
}

function promptDepartment () {
    inquirer
    .prompt ([
        {
            type: "list",
            name: "department_name",
            message: "which department'employee would you like to see? ",
            choice: departmentChoice
        }
    ])
    .then(function (answer) {
        console.log("answer", answer.department_name);

        var query = "SELECCT d.id, d.name, r.salary FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON d.id = r.department_id WHERE d.id = ?"
        
        connection.query(query, answer.department_name, function (err, res) {
            if(err) throw err;
            console.table("response", res);
            FirstQuestion();
        });
    });
}




////////////////////////////////////////////////////////////////////////////// 2 add Employee ////////////////////////////////////////////////////////////////


function addEmployees() {
    console.log("adding employee")

    var query = "SELECT r.id, r.title, r.salary FROM role r"
    
    connection.query(query, function(err,res) {
        if(err) throw err;
        const roleChoices = res.map (({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
        }));
        console.table(res);
        console.log("add employee");
        promptAdd(roleChoices);
    });
}
function promptAdd (roleChoices) {

    inquirer
    .prompt ([
        {
            type: "input",
            name: "first_name",
            message: "what is employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "what is employee's last name?"
        },
        {
            type: "input",
            name: "rold_id",
            message: "what is employee's role?"
        }
    ])
    .then (function (answer) {
        console.log(answer);

        var query = 'INSERT INTO employee SET'
        connection.query(query, 
            { 
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function (err, res) {
                if (err) throw err;

                console.table (res);
                FirstQuestion();
            });
        });
}

////////////////////////////////////////////////////////////////////////////// 2'. add role ////////////////////////////////////////////



function addRoles() {
    var query = connection.query(query, function(err,res) {
        if(err) throw err;

        const addRole = res.map (({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
        }));
    console.table(res);
    promptAddRole(addRole);
    });
}
function promptAddRole (addRole) {

    inquirer
    .prompt ([
  
        {
            type: "input",
            name: "rold_title",
            message: "what role do you want to add?"
        },
        {
            type: "input",
            name: "role_salary",
            message: "how much salary is for the role?"
        },
        {
            type: "input",
            name: "rold_department",
            message: "what department is for the role?"
        },
    ])
    
    .then (function (answer) {
        console.log(answer);
        var query = 'INSERT INTO role SET'
        connection.query(query, 
            { 
                role_title: answer.role_title,
                role_salary: answer.role_salary,
                role_department: answer.role_department,
            },
            function (err, res) {
                if (err) throw err;

                console.table (res);
                FirstQuestion();
            });
        });
}




//////////////////////////////////////////////////////////////////////////////  3 update employee role /////////////////////////////////////////////////////////


function updateEmployeeRole () {
    employeeArray ();
}

function employeeArray() {
    console.log("Updating Employee");

    var query = connection.query(query, function (err,res) {
        if(err) throw err;
        const employeeChoices= res.map (({ id, first_name, last_name}) => ({
            value: id, name: `${first_name} ${last_name}`
         }));
    console.table(res);

    roleArray(employeeChoices)
        });
    }




function roleArray(employeeChoices) {
    console.log("Update employee'role");

    var query = `SELELCT r.id, r.title, r.salary from role.r`
    let roleChoices;

    connection.query(query,function(err,res) {
        if(err) throw err;
        roleChoices = res.map (({id, title,salary}) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));

        console.table(res);

        promptEmployeeRole(employeeChoices, roleChoices);
    });
}



function promptEmployeeRole(EmployeeChoices, roleChoices) {

    inquirer
    .prompt ([
        {
            type: "List",
            name: "employeeId",
            message: "which role do you want to set with the role?",
            choices: employeeChoices
        },
        {
            type:"list",
            name: "roleId",
            message: "which role do you want to update?",
            choices: roleChoices
        },
    ])
    .then(function (answer) {
        var query = 'UPDATE employee SET role_id = ?'
        connection.query(query, 
            [answer.roleId,
            answer.employeeId
        ],
        function (err,res) {
            if(err) throw err;
            
            console.table(res);
        
        FirstQuestion();
        });
    });
}