
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
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
const List = [help, quit, hello, batata, exit, add, remove, list, edit, check, uncheck];


function onDataReceived(text) {
  var text = text.trim();

  if (text === 'quit' || text ==='exit') {
    quit();
  }
  else if(text==='hello\n'){
    hello();
  }
  else if (text.startsWith("add")) {
    add(text);
  }
  else if (text.startsWith("remove")) {
    remove(text);
  }
  else if (text.startsWith("edit")) {
    edit(text);
  }
  
  else if (text.startsWith("hello")) {
    hello(text);
  }
  else if (text === "list") {
    list();
  }
  else if (text.startsWith("check")) {
    check(text);
  }
  else if (text.startsWith("uncheck")) {
    uncheck(text);
  }
  else if(text === 'batata'){
    batata();
  }
  else if (text === 'help') {
    help();
  }
  else{
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){

  console.log('hello!');
}
function batata(){
  console.log('batata!');
}
// help: when you type this command it will show you all the commands that you can enter.

function help() {
  List.forEach(element => console.log("-", element));
  console.log('----------------------------');

}

function hello(text) {
  text == "hello" ? console.log("hello!") : console.log(text + "!");
  console.log('----------------------------');
}

//STEP 4::::::::

// Initialize an empty array to store the tasks
const tasks = [];
// tasks.checked=true;
// taskName=tasks;

// const task = {
//   description: "get milk",
//   done: false,
// };

// function check(index) {
//   tasks[index].done = true;
// }

// function list() {
//   // Print the task list
//   console.log('Task list:');
//   for (let i = 0; i < tasks.length; i++) {
//   console.log(`${i + 1}: ${tasks[i]}`);
//   }
//   console.log('----------------------------');
//   }
function list() {
  let nb = 0;
  for (let i = 0; i < tasks.length; i += 1) {
    nb++;
    console.log(nb + " - " + tasks[i] );
  }
}
// function list() {
//   tasks.forEach((obj, index) =>
//     obj.checked ? console.log(`[✓] ${index + 1}- ${obj.taskName}`) : console.log(`[ ] ${index + 1}- ${obj.taskName}`));
//   console.log('----------------------------');
// }

// function list() {
//   tasks.forEach((obj, index) => {
//   if (obj.checked) {
//   console.log(`[✓] ${index + 1}- ${obj.taskName}`);
//   } else {
//   console.log(`[ ] ${index + 1}- ${obj.taskName}`);
//   }
//   });
//   console.log('----------------------------');
//   }
  


  function add(text) {
    if (text == "add") {
    console.log('"error" no task to add!')
    } else {
    arg = text.replace("add ", "");
    tasks.push(`[ ] ${arg}`);
    // tasks.push(arg);
    console.log(arg + ' has been added to list successfully.')
    }
    list();
    console.log('----------------------------');
    }

function remove(text) {
  if (text == "remove") {
    tasks.pop();
    console.log('task ' + (tasks.length + 1) + ' has been removed from list successfully.')
  }
  else {
    let arr = text.split(" ");
    let index = parseInt(arr[1]);
    if (isNaN(index)) {
      console.log("please enter a number to remove task");
    }
    else if (index < 1 || index > tasks.length) {
      console.log('this task number is not exist!');
    }
    else {
      tasks.splice(index - 1, 1);
      console.log('task ' + index + ' has been removed from list successfully.')
    }
  }
  console.log('----------------------------');
}

//STEP 5:::::::


function edit(text) {
  if (text == "edit") {
  console.log('"error" no task to edit!')
  } else {
  let arr = text.split(" ")
  let index = parseInt(arr[1]);
  if (isNaN(index)) {
  console.log('Please specify a valid task number to edit.');
  } else {
  let str = String(arr.splice(2, arr.length - 2)).replace(/,/g, " ");
  tasks[index - 1] = str;
  console.log("Task " + index + " has been changed to " + str + ".");
  }
  }
  console.log('----------------------------');
  }
  

  // STEP 6:::::::::


  // function check(text) {
  //   if (text == "check") {
  //     console.log('error: no task to be checked');
  //   } else {
  //     let index = parseInt(text.replace("check ", ""));
  //     tasks[index - 1].checked = true;
  //     console.log('checked successfully');
  //   }
  //   console.log('----------------------------');
  // }
  
  // function uncheck(text) {
  //   if (text == "uncheck") {
  //     console.log('error: no task to be unchecked')
  //   } else {
  //     let index = parseInt(text.replace("uncheck ", ""));
  //     tasks[index - 1].checked = false;
  //     console.log('unchecked successfully');
  //   }
  //   console.log('----------------------------');
  // }
  

  function check(text) {
    if (text == "check") {
    console.log('error: no task to be checked');
    } else {
    let index = parseInt(text.replace("check ", ""));
    if (index < 1 || index > tasks.length) {
    console.log(`error: invalid task index ${index}`);
    } else if (tasks[index - 1].checked) {
    console.log(`error: task ${index} is already checked`);
    } else if(text.match(/\d+/g)) {
    // tasks[index - 1].checked = true;
    let access = (text.match(/\d+/g) - 1) ;
    tasks[access] = `[✓] ${arg}`;
    console.log('checked successfully');
    }
    list();
    }
    console.log('----------------------------');
    }
    
    function uncheck(text) {
    if (text == "uncheck") {
    console.log('error: no task to be unchecked')
    } else {
    let index = parseInt(text.replace("uncheck ", ""));
    if (index < 1 || index > tasks.length) {
    console.log(`error: invalid task index ${index}`);
    } else if (!tasks[index - 1].checked) {
    console.log(`error: task ${index} is already unchecked`);
    } else {
    tasks[index - 1].checked = false;
    console.log('unchecked successfully');
    }
    }
    console.log('----------------------------');
    }
  
  


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
function exit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}



// The following line starts the application
startApp("Mahmoud Kalekish")
