const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const fs = require('fs');
const inquirer = require('inquirer');

let storeEmployees = [];


const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the employees name?',
    },
    {
        type: 'list',
        name: 'title',
        message: 'What is the employees position?',
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the employees email?',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the employees id number?',
    },
];

const ifManager = [
    {
        type: 'input',
        name: 'credentials',
        message: 'What is the managers office number?',
    },
];

const ifEngineer = [
    {
        type: 'input',
        name: 'credentials',
        message: 'What is the engineers github link?',
    },
];

const ifIntern = [
    {
        type: 'input',
        name: 'credentials',
        message: 'What is the interns school name?',
    },
];

const addnew = [
    {
        type: 'list',
        name: 'addNew',
        message: 'Add new Employee?',
        choices: ["Yes", "No"]
    },
]


function writeToFile(fileName) {

    let startHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>

        <div class="mt-4 p-5 bg-primary text-white rounded">
            <h1>My Team</h1>
        </div>

        <div class="container mt-3">
            <div class="row">`;

        storeEmployees.forEach(emp => {

            startHTML = startHTML + `
            <div class="col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">${emp.name}</h4>
                        <p class="card-text">${emp.id}</p>
                        <p class="card-text">${emp.title}</p>
                        <p class="card-text">${emp.email}</p>
                        <p class="card-text">${emp.credentials}</p>
                    </div>
                </div>
            </div>`;
        });

        startHTML = startHTML + `</div></body></html>`;

        fs.writeFile(fileName, startHTML, (err) => {
            err ? console.log(err) : console.log('HTML created.')
        });

        
    
}


function init() {

    inquirer.prompt(questions)
        .then((answers => {

            if(answers.title === 'Manager') {
                var subQuestion = ifManager;
            }
            else if(answers.title === 'Engineer') {
                var subQuestion = ifEngineer;
            }
            else {
                var subQuestion = ifIntern;
            }

            
            inquirer.prompt(subQuestion)
                .then(ans => {

                    let data = {
                        name: answers.name,
                        id: answers.id,
                        title: answers.title,
                        email: answers.email,
                        credentials: ans.credentials,
                    }

                    storeEmployees.push(data);

                    inquirer.prompt(addnew)
                        .then(res => {

                            if(res.addNew === 'Yes') {
                                init();
                            }
                            else {
                                writeToFile("index.html");
                            }


                        });
                });  
        }));
}


init();

