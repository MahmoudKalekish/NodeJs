/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}
let savefile;
if (process.argv[2] == null) {
  savefile = "database.json";
} else {
  savefile = process.argv[2];
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
const List = [help, quit, hello, batata, exit, add, remove, list, edit, check, uncheck];

function onDataReceived(text) {
  text = text.trim();

  // Iterate through the List array and call the functions that match the input text
  List.forEach(function(func) {
    if (text.startsWith(func.name)) {
      func(text);
    }
  });
}

var list1
const fs = require("fs");
try {
  let data = fs.readFileSync(savefile);
  var objList = JSON.parse(data);
}
catch (e) {
  console.log(`this file is not present, we will create it!`)
}
if (objList !== undefined) {
  list1 = objList.list1;
} else {
  objList = { "list1": [] }
  list1 = objList.list1;
}


/**
 * Prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */

function hello() {
  console.log('hello!');
}

function batata() {
  console.log('batata!');
}

// help: when you type this command it will show you all the commands that you can enter.
function help() {
  console.log('Commands:');
  List.forEach(function(func) {
    console.log(`- ${func.name}: ${func.description}`);
  });
  console.log('----------------------------');
}

function hello(text) {
  console.log(`hello ${text.substring(6)}!`);
  console.log('----------------------------');
}

var tasks = [];

function list() {
  console.log('Task list:');
  tasks.forEach(function(task, index) {
    console.log(`${index + 1}: ${task}`);
  });
  console.log('----------------------------');
}

function add(text) {
  tasks.push(text.substring(4));
  console.log(`Task "${text.substring(4)}" added to the list!`);
  console.log('----------------------------');
}

function remove(text) {
  const index = parseInt(text.substring(7)) - 1;
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log("Please enter a valid task number.");
  } else {
    tasks.splice(index, 1);
    console.log(`Task ${index + 1} removed from the list!`);
  }
  console.log('----------------------------');
}

function edit(text) {
  const parts = text.split(" ");
  if (parts.length < 3) {
    console.log("Please enter a task number and a new task description.");
  } else {
    const index = parseInt(parts[1]) - 1;
    if (isNaN(index) || index < 0 || index >= tasks.length) {
      console.log("Please enter a valid task number.");
    } else {
      tasks[index] = parts.slice(2).join(" ");
      console.log(`Task ${index + 1} edited!`);
    }
  }
  console.log('----------------------------');
}

function check(text) {
  const index = parseInt(text.substring(6)) - 1;
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log("Please enter a valid task number.");
  } else {
    tasks[index] = `[✓] ${tasks[index]}`;
    console.log(`Task ${index + 1} checked!`);
  }
  console.log('----------------------------');
}

function uncheck(text) {
  const index = parseInt(text.substring(8)) - 1;
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log("Please enter a valid task number.");
  } else {
    if (tasks[index].startsWith("[✓]")) {
      tasks[index] = tasks[index].substring(4, tasks[index].length);
      console.log(`Task ${index + 1} unchecked!`);
    } else {
      console.log("This task is already unchecked.");
    }
  }
  console.log('----------------------------');
}







/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  let fs = require("fs");
  let data = JSON.stringify(objList);
  try {
    fs.writeFileSync(savefile, data);
    console.log(`Saving changes...`);
  } catch (error) {
    console.error(error);
  }

  console.log("Quitting now, goodbye!");
  process.exit();
}
// function quit(){
//   console.log('Quitting now, goodbye!')
//   process.exit();
// }
function exit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}



// The following line starts the application
startApp("Mahmoud Kalekish")