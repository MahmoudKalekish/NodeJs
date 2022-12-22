
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
const List = [help, quit, hello, batata, exit, add, remove, list];


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
  
  else if (text.startsWith("hello")) {
    hello(text);
  }
  else if (text === "list") {
    list();
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

function hello(arg) {
  arg == "hello" ? console.log("hello!") : console.log(arg + "!");
  console.log('----------------------------');
}

//taskkkkkkkkkkkkkkkkkkkkkkkkkk

// Initialize an empty array to store the tasks
const tasks = [];

function list() {
  // Print the task list
  console.log('Task list:');
  for (let i = 0; i < tasks.length; i++) {
    console.log(`${i + 1}: ${tasks[i]}`);
  }
  console.log('----------------------------');
}

function add(task) {
  // Add the task to the list
  tasks.push(task);
  console.log(`Added task: ${task}`);
  console.log('----------------------------');
}

function remove(index) {
  // Remove the task from the list
  if (index == null) {
    index = tasks.length - 1;
  }
  console.log(`Removed task: ${tasks.splice(index, 1)}`);
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
