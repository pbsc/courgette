#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const directory = 'uiTests/features/'
const jsonFiles = fs.readdirSync(directory);

const types = {
  url: (url) => `Given I am on the page with url '${url}'`
  waitBody: () => `When I wait '0.5' seconds`
  click: ({  }) => `When I wait '0.5' seconds`
}

jsonFiles.forEach((fileName) => {
  const newPath = path.join(directory, fileName);
  if(newPath.endsWith('.json')){
    const newSteps = []
    const steps = JSON.parse(fs.readFileSync(newPath, 'utf8'));
    steps.forEach(({ type, data }) => {
      if (types[type]) {
        newSteps.push(types[type](data))
      }
    })
    const stepsStr = newSteps.map((str) => `${str}
    `).join('')
    const str = `
@rename-feature
Feature: Rename Feature

  @rename-scenario
  Scenario: Rename Scenario
    ${stepsStr}`

    fs.writeFileSync(path.join(directory, fileName.replace(/\.json$/, '.feature')), str)
  }
});

// [
//     {
//         "type": "url",
//         "data": "https://localhost:3000"
//     },
//     {
//         "type": "waitBody"
//     },
//     {
//         "type": "click",
//         "data": {
//             "path": "#root img",
//             "x": 16,
//             "y": 11,
//             "button": 0,
//             "text": "",
//             "option": false
//         }
//     },
//     {
//         "type": "select",
//         "data": {
//             "path": "#root select",
//             "type": "value",
//             "value": "super_manager",
//             "text": ""
//         }
//     },
//     {
//         "type": "click",
//         "data": {
//             "path": "#root button.create-user-btn1",
//             "x": 91,
//             "y": 16,
//             "button": 0,
//             "text": "Login with test User...",
//             "option": false
//         }
//     },
//     {
//         "type": "waitBody"
//     },
//     {
//         "type": "click",
//         "data": {
//             "path": "//span[text()=\"Library\"]",
//             "x": 29,
//             "y": 9,
//             "button": 0,
//             "text": "Library",
//             "option": false
//         }
//     },
//     {
//         "type": "expect",
//         "data": {
//             "sleep": "300",
//             "type": "text",
//             "params": [
//                 "#root tbody:nth-child(2) > tr.table-row > td:nth-child(1) > div.table-label"
//             ],
//             "compare": "contain",
//             "to": "2019 ISDA Bank Custodian SA (NY Law)"
//         }
//     }
// ]
