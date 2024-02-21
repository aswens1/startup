These are my notes for the class.

# Using Git and GitHub
So far I have learned some syntax and common commands to use while using Git in my command line.

to start working on an area
- clone -> clones a repository to a new directory
- init -> create an empty repository using git

work on the current change
- add -> add file contents to the index
- mv -> move or rename a file, directory, or a symlink
- restore -> restore working tree files
- rm -> remove fules from the working tree and from the index

examine history and state
- bisect -> use binary search to find the commit that introduced a bug
- diff -> show changes between commits, commit and working tree, etc
- grep -> print lines matching a pattern
- log -> show commit logs
- show -> show various types of objects
- status -> show the working tree status

grow, mark, and tweak your common history
- branch -> list, create, or delete branches
- commit -> record changes to the repository
- merge -> join two or more development histories together
- rebase -> reapply commits on top of another base tip
- reset -> reset current HEAD to the specified state
- switch -> switch branches
- tag -> create, list, delete, or verify a tag obkect signed with GPG

collaborate
- fetch -> download obkects and refs from another repository
- pull -> fetch from and integrate with another repository or a local branch
- push -> update remote refs along with associated objects

# startup application
The different elements of our startup.
- html -> basic structural and organisational elements
- css -> style and animation
- javascript -> interaction
- service -> remote functions that your application calls on your, or someone els's web server
- database/login -> persisted app and auth data
- websocket -> data pushed from server, chat, realtime data from the server
- react -> web framework

# history of the web
Key Players
- Tim Berners-Lee -> HTTP, HTML, URL
- Håkon Wium Lie -> CSS
- Brendan Eich -> JavaScript

What We're Using
- Web browser -> HTML, CSS, JavaScript
- Web Server -> Web service
- Cloud Services -> Devices

# Technology Stack, EC2, Route 53
- React, Caddy2, nodejs, mongoDB

heres how you access the server from the console

ssh -i [key pair file] ubuntu@[ip address]

# Caddy, HTTPS, TLS, certs
Caddy
- runs on the webserver
- handles routing requests
- web certificates for HTTPS

web certificate
- client wants secure access
- goes to your server
- goes to a third party to encrypt
- gets decrypted to verify
- trusted third party - both sides trust
- need the public key to verify

use sudo service caddy restart to save the files and restart it so you can see the changes, or the change won't save

# Console and Editors
terminal allows you to
- navigate your disk
- run console applications (ones without graphical user interface/GUI)

common console commands
- echo -> output the parameters of the command
- cd -> change directory
- mkdir -> make directory
- rmdir -> remove directory
- rm -> remove file(s)
- mv -> move file(s)
- cp -> copy files
- ls -> list files
- curl -> command line client URL browser
- grep -> regular expression search
- find -> find files
- top -> view running processess
- df -> view disk statistics
- cat -> output file
- less -> interactive file output
- wc -> count words
- ps -> view processess
- kill -> kill a process
- sudo -> execute as admin
- ssh -> remote shell
- scp -> securely copy files to a remote computer
- history -> show history of commands
- ping -> test connection
- tracert -> trace network
- dig -> DNS information
- man -> look in the manual

pipe & redirect
- printf "hello world" > test.txt
- ls -l | grep ' Nov ' | wc -l
- curl -s www.google.com > google.html
- cat google.html | grep '<a' | wc
- curl -s www.google.com | wc

control keys
- CTRL-C -> cancel command
- CTRL-R -> recall command
- CTRL-Z -> background command

visual studio code extensions
- live server
- GitLens

# HTML - Hypertext Markup Language

link references
- absolute
  - ```<a href="https://cs260.click/profile.png" />```
- relative
  - ```<a href="profile.png" />```
  - ```<a href="../images/profile.png" />```
 
elements
- html -> the page container
- head -> header information
- title -> title of the page
- meta -> metadata for the page such as character set or viewport settings
- script -> JavaScript reference. Either external reference, or inline
- include -> external content reference
- body -> the entire content of the page
- header -> header content
- footer -> footer of the main content
- nav -> navigational inputs
- main -> main content of the page
- section -> a section of main content
- aside -> aside content from the main content
- div -> a block division of content
- span -> an inline span of content
- h<1-9> -> text heading. from h1, the highest level, down to h9, the lowest
- p -> a paragraph of text
- b -> bring attention
- table -> table
- tr -> table row
- th -> table header
- td -> table data
- ol, ul -> ordered or unordered list
- li -> list item
- a -> anchor the text to a hyperlink
- img -> graphical image reference
- dialog -> interactive component such as a confirmation
- form -> a collection of user input
- input -> user input field
- adio -> audio content
- video -> video content
- svg -> scalable vector graphic content
- iframe -> inline frame of another HTML page

p and div work in similar ways, but you can have more information in a p tag. That way you can separate text. Simply by looking, it doesn't know what div means, but the p tag tells the tools what to do.

you can include comments by starting text with ```<!--- commented text -->``` -> the text in the comments will be ignored while being rendered

characters
- & -> ```&amp;```
- '<' -> ```&lt;```
- '>' -> ```&gt;```
- " -> ```&quot;```
- ' -> ```&apos;```
- 😀 -> ```&#128512;```

by default, the browser will display the index.html page if you don't provide a specific file. It is common to name the main HTML file index.html

|element|meaning|example|
|---|---|---|
|`form`|input container and submission|`<form action="form.html" method="post>`|
|`fieldset`|labeled input grouping|`<fieldset>...</fieldset>`|
|`input`|multiple types of user input|`<input type="" />`|
|`select`|selection dropdown|`<select><option>1</option></select>`|
|`optgroup`|grouped selection dropdown|`<optgroup><option>1</option></optgroup>`|
|`option`|selection option|`<option selected>option2</option>`|
|`textarea`|multiline text input|`<textarea></textarea>`|
|`label`|individual input label|`<label for="range">Range: </label>`|
|`output`|output of input|`<output for="range">0</output>`|
|`meter`|display valye with a known range|`<meter min="0" max="100" value="50"></meter>`|

input elements
|type|meaning|
|---|---|
|text|single line textual value|
|password|obscured password|
|email|email address|
|tel|telephone number|
|url|URL address|
|number|numerical value|
|checkbox|inclusive selection|
|radio|exclusive selection|
|range|range limited number|
|date|year, month, day|
|datetime-local|date and time|
|month|year, month|
|week|week of year|
|color|colour|
|file|local file|
|submit|button to trigger form submission|

to create input you have to specificy the type attribute and any others needed for that specific input.

ex: checked radio button 

`<label for="checkbox1">Check me</label> <input type="checkbox" name="varCheckbox" value="checkbox1 checked />`

most common attributes
|attribute|meaning|
|---|---|
|name|the name of the input. this is submitted as the name of the input if used in a form|
|disabled|disables the ability for the user to interact with the input|
|value|the initial value of the input|
|required|signifies that a valye is required in order to be valid|

# Simon HTML

default page should be called index.html
add placeholders for necessary technologies

# CSS

## Selectors

|selector|meaning|example|description|
|---|---|---|---|
|element|all elements of a specific name|`p` `div`|any selection that is a descendent of a body|
|ID|the element with the given ID|`#root`|the element with the attribute `id='root'`|
|class|all elements with the given class|`.highlight`|any element with the attribute `class='highlight'`|
|element class|any elements with the specific name and class|`p.highlight`|any p element with the attribute `class='highlight'`|
|list|any of the given selectors|`body, section`|body or section elements|
|descendant|a list of descendants|`body section`|any section that is a descendant of a body|
|child|a list of direct children|`section>p`|any p that is a direct child of a section|
|psuedo|state based|`p:hover`|the mouse is hovering over a p element|

## Declarations

|property|value|example|discussion|
|---|---|---|---|
|background|colour|`red`|fill the background colour|
|border|colour width style|`#fad solid medium`|sets the border using shorthand where any or all of the values may be provided|
|colour|colour|`rgb(128, 0, 0)`|sets the text colour|
|display|type|`none`|defines how to display the element and its children|
|font|family size style|`Arial 1.2em bold`|defines the text font using shorthand|
|margin|unit|`5px 5px 0 0`|sets the margin spacing|
padding|unit|`1em 2em`|sets the padding spacing|

units
|unit|description|
|---|---|
|px|the number of pixels|
|pt|the number of points (1/72 of an inch)|
|%|a percentage of the parent element|
|em|a multiplier of the width of the letter `m` in the parents font|
|rem|a multiplier of the width of the letter `m` in the roots font|
|vw|a percentage of the viewports width|
|vh|a percentage of the viewports height|
|vmin|a percentage of the viewports smaller dimension|
|vmax|a percentage of the viewports larger dimension|

## Fonts
- san serif -> only major strokes
- serif -> minor strokes off the major strokes
- monospace -> all letters have the same size
- handwriting -> cursive strokes
use google fonts to browse open source fonts

```@font-face {
font family: 'Quicksand';
src: url('https://cs260.click/fonts/quicksand.ttf');
}

p {
 font-family: Quicksand;
}

```
```
@import url("https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap");

p {
 font-family: "Rubik Microbe";
}
```
using import is just referencing the link and using css

## Unicode and UTF-8
```
<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="UTF-8" />
 </head>
 <body>
   <p>하나님은 나의 빛이시다</p>
   <p>😃 &#128521;</p>
 </body>
</html>
```

# JavaScript

## Introduction
```'Hello' + 'world';```

console.log('Hello' + ' ' + 'world'); -> // OUTPUT: Hello world

create your own functions:
function join(a, b) {
    return a + ' ' + b;
}

console.log(join('Hello', 'world')); -> // OUTPUT: Hello world

comments:

// line comments

/*
block comment
*/

code delimiters:
- end JS statements with a semicolon (;)
- code blocks, and resulting scope, are defined with curly brackets ({})

## JavaScript Console
The console lets us interact with the JS runtime debugger console. Provides functionality for outputting the value of text and objects, running timers, and counting iterations. These are useful for degbugging.
This is not the same thing as the computers command line/terminal.

### Log
Basic usage of the console is to output a log message

console.log('hello'); -> // OUTPUT: Helo 

formatted messages:

console.log('hello %s', 'world'); -> //OUTPUT: hello world

specify CSS declarations to style the log output

console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;'); -> // OUTPUT: JavaScript Demo //in large green text

### Timers
You can see how long a piece of code is running

console.time('demo time');

// ... some code that takes a long time

console.timeEnd('demo time');

// OUTPUT: demo time: 9762.74 ms

### count
Tells how many times a block of code is called

console.count('a'); -> // OUTPUT: a: 1

console.count('a'); -> // OUTPUT a: 2

console.count('b'); -> // OUTPUT b: 1

## Adding JavaScript to HTML
You can add JS to HTML by either directly including it in the HTML within the content of a \<script> element, or by using the src attribute of the script element and referencing an external JS file

if we have a file index.js
```javascript
function sayHello() {
  console.log('hello');
}
```

heres how we call it in our html index.html
```html
<head>
  <script src="javascript.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
```

We call the sayHello and sayGoodbye JS functions in HTML in the onclick attribute of the buttom element. Some special attributes automatically create event listeners for different DOM events that call the code contained in the attribute's value. The code in the attribute can be a simple function call or any JavaScript code.

```html
<button onclick="let i=1;i++;console.log(i)">press me</button>
<!-- OUTPUT: 2 -->
```
## JavaScript type and construct

### Declaring Variables
Variables are declared using either let or const keyword. let allows you to change the value of the varibale while const will always stay the same (you'll get an error if you try to change it)

```javascript
let x = 1;
const y = 2;
```

### Type
There are several primative types

|type|meaning|
|---|---|
|`Null`|the type of a variable that has not been assigned a value|
|`Undefined`|the type of a variable that has not been defined|
|`Boolean`|true or false|
|`Number`|a 64-bit signed number|
|`BigInt`|a number of arbitrary magnitude|
|`String`|a textual sequence of characters|
|`Symbol`|a unique value|

Boolean, Number, and String are the most commonly used when creating variables. But variables also often refer to the Null or Undefined primitive. JavaScript does not enforce the declaration of a variable before you use it, so it could have the type Undefined.

There are also defined objects types.

|type|use|example|
|---|---|---|
|`Object`|a collection of properties represented by name-value pairs. values can be any type| `{a:3, b:'fish'`|
|`Function`|an object that has the ability to be called|`function a() {}`|
|`Date`|calendar dates and times|`new Date('1995-12-17')`|
|`Array`|an ordered sequence of any type|`[3, 'fish']`|
|`Map`|a collection of key-value pairs that support efficient lookups|`new Map()`|
|`JSON`|a lightweight data-interchange format used to share information across programs|`{"a":3, "b":"fish"}`|

### Common Operators
When dealing with numbers, there are standard mathematical operators.
- `+` -> add
- `-` -> subtract
- `*` -> multiply
- `/` -> divide
- `===` -> equality

For strings:
- `+` -> concatenation
- `===` -> equality

### Type Conversions
JS is a weakly typed function, which means a variable always has a type but it can be changed when the value changes, or the type can be converted based on context. Sometimes the conversions are unexpected if you're used to strongly typed languages.

```javascript
2 + '3';
// OUTPUT: '23'
2 * '3';
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN
```

Getting unexpected results is really common with the equality operator.

```javascript
1 == '1';
// OUTPUT: true
null == undefined;
// OUTPUT: true
'' == false;
// OUTPUT: true
```

JavaScript uses complex rules for defining equality that depends upon the conversion of a type of boolean value. This is sometimes called falsy and truthy evaluations. To fix this, there is strict equality and equality. The strict operators skip the type conversion when computing equality.

- `===` -> strict equality
- `!==` -> inequality

```javascript
1 === '1';
// OUTPUT: false
null === undefined;
// OUTPUT: false
'' === false;
// OUTPUT: false
```

Strict equality is considered more intuitive, and is preferred. 

```javascript
('b' + 'a' + +'a' + 'a').toLowerCase();
```

### Conditionals
Javascript supports many common programming language conditional constructs, including if, else, and if else.

```javascript
if (a === 1) {
  //...
} else if (b === 2) {
  //...
} else {
  //...
}
```

There is also the ternary operator, which provides a compact if else representation.

```javascript
a === 1 ? console.log(1) : console.log('not 1');
```

You can use boolean operations in the expression to create complex predicates. Common operators are:

- `&&` -> and
- `||` -> or
- `!` -> not

```javascript
if (true && (!false || true)) {
  //...
}
```

### Loops
JavaScript supports many common looping constructs. This includes, for, for in, for of, while, do while, switch. Here are examples.

#### For Loop
Introduces common post increment operation `i++` for adding one to a number.

```javascript
for (let i = 0; i < 2; i++) {
  console.log(i);
}
// OUTPUT: 0 1
```

#### Do While

```javascriptlet
i = 0;
do {
  console.log(i);
  i++;
} while (i < 2);
// OUTPUT: 0 1
```

#### While

```javascript
let i = 0;
while (i < 2) {
  console.log(i);
  i++;
}
// OUTPUT: 0 1
```

#### For in
Iterates over an objects property names.

```javascript
const obj = { a: 1, b: 'fish' };
for (const name in obj) {
  console.log(name);
}
// OUTPUT: a
// OUTPUT: b
```

For arrays the objects name is the array index

```javascript
const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
}
// OUTPUT: 0
// OUTPUT: 1
```

#### For of
Iterates over an iterables (array, map, set, etc) property values

```javascript
const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'
```

#### Break and continue
All of the examples either use a break or continue statement to abort or advance a loop

```javascript
let i = 0;
while (true) {
  console.log(i);
  if (i === 0) {
    i++;
    continue;
  } else {
    break;
  }
}
// OUTPUT: 0 1
```

## Strings
``` javascript
'quoted text'; // " also works

const l = 'literal';
console.log(`string ${l + (1 + 1)} text`);
// OUTPUT: string literal2 text
```
- primative types
- can use single quotes, double quotes, or backticks `

### Unicode Support
Defines a string as a 16-bit unsigned integer that represents UTF-16 strings.
Lets JavaScript display most languages on the planet. This includes those that are read right to left.

### String functions
The string object has several interesting functions associated with it. Here are the common ones

|Function|meaning|
|---|---|
|length|the number of characters in the string|
|indexOf()|the starting index of a given substring|
|split()|split the string into an array on the given delimiter string|
|startsWith()|true if the string has a given prefix|
|endsWith()|true if the string has a given suffix|
|toLowerCase()|converts all characters to lower case|

```javascript
const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
```

## Functions
Functions are first class objects. They can be assigned a name, passed as a parameter, returned as a result, and referenced from an object or array like any other variable.

Syntax begins with the function keyword followed by zero or more parameters and a body that may contain zero or more return statements. The return statment may return a single value. There are no type declarations, as the type is always inferred by the assignment of the value to the parameter.

```javascript
function hello(who) {
  return 'hello ' + who;
}

console.log(hello('world'));
// OUTPUT: hello world
```

If the function doesn't return a value, it usually is there to produce a side effect like modifying a parameter or interacting with an external program. In the next example the side effect is to output text to the debugger.

```javascript
function hello(who) {
  who.count++;
  console.log('hello ' + who.name);
}

hello({ name: 'world', count: 0 });
// OUTPUT: hello world
```

### Function Parameters
The one who calls the function decides what parameters to provide. If there are no parameters, the value is undefined when the function executes.

The function can also define a default value. This is done by assigning a value to the parameter in the function declaration.

```javascript
function labeler(value, title = 'title') {
  console.log(`${title}=${value}`);
}

labeler();
// OUTPUT: title=undefined

labeler('fish');
// OUTPUT: title=fish

labeler('fish', 'animal');
// OUTPUT: animal=fish
```

### Anonymous Functions
Functions are commonly assigned a variable so that they can be passed as a parameter in other functions or stored as an object property. You can do this easily by define a function anonymously and assign it to a variable.

```javascript
// Function that takes a function as a parameter
function doMath(operation, a, b) {
  return operation(a, b);
}

// Anonymous function assigned to a variable
const add = function (a, b) {
  return a + b;
};

console.log(doMath(add, 5, 3));
// OUTPUT: 8

// Anonymous function assigned to a parameter
console.log(
  doMath(
    function (a, b) {
      return a - b;
    },
    5,
    3
  )
);
// OUTPUT: 2
```

### Creating, Passing, and Returning Functions
Example of assigning functions to variables, as well as using a function as parameters and return values.

```javascript
// Anonymous declaration of the function that is later assigned to a variable
const add = function (a, b) {
  return a + b;
};

// Function that logs as a side effect of its execution
function labeler(label, value) {
  console.log(label + '=' + value);
}

// Function that takes a function as a parameter and then executes the function as a side effect
function addAndLabel(labeler, label, adder, a, b) {
  labeler(label, adder(a, b));
}

// Passing a function to a function
addAndLabel(labeler, 'a+b', add, 1, 3);
// OUTPUT: a+b=4

// Function that returns a function
function labelMaker(label) {
  return function (value) {
    console.log(label + '=' + value);
  };
}

// Assign a function from the return value of the function
const nameLabeler = labelMaker('name');

// Calling the returned function
nameLabeler('value');
// OUTPUT: name=value
```

### Inner Functions
Functions can also be declared inside other functions. This way you can modularise your code without always exposing private details.

```javascript
function labeler(value) {
  function stringLabeler(value) {
    console.log('string=' + value);
  }
  function numberLabeler(value) {
    console.log('number=' + value);
  }

  if (typeof value == 'string') {
    stringLabeler(value);
  } else if (typeof value == 'number') {
    numberLabeler(value);
  }
}

labeler(5);
// OUTPUT: number=5

labeler('fish');
// OUTPUT: string=fish
```

## JavaScript Arrow Function
These are used to clean up code and make it more compact. This replaces the need for the function keyword with the symbols `=>` places after the parameter declaration. The curly braces around it are optional.

This function takes no parameters and always returns 3.
```javascript
() => 3;
```

The following two are equivalent.

```javascript
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```

Arrow functions cannot be used for constructors or iterator generators.

### Return Values
There are special rules for the return keyword. This is optional if no curly braces are provided for the function and it contains a single expression. In that case the result of the function is automatically returned. If curly braces are provided, then the arrow function behaves just like a standard function.

```javascript
() => 3;
// RETURNS: 3

() => {
  3;
};
// RETURNS: undefined

() => {
  return 3;
};
// RETURNS: 3
```

### This pointer
Arrow functions inherit the this pointer from the scope of where it is created. This makes it a closure. A closure allows a function to continue referencing its creation scope, even after it has passed out of that scope. 

In this example, the function returns an anonymous function using the arrow syntax. The `a` parameter is overridden, a new `b` variable is created, and both `a` and `b` are referenced in the arrow function. They are both part of the closure for the returned function.

```javascript
function makeClosure(a) {
  a = 'a2';
  const b = 'b2';
  return () => [a, b];
}
```

Then we can declare the variables `a` and `b` at the top level scope, and call  `makeClosure` with `a`.

```javascript
const a = 'a';
const b = 'b';

const closure = makeClosure(a);
```

Then when we call closure it will output the values contained in scope where it was created instead of the current values of the variables.

```javascript
console.log(closure());
// OUTPUT: ['a2', 'b2']

console.log(a, b);
// OUTPUT: 'a' 'b'
```

Closures provide a valuable property when we do things like execute JavaScript within the scope of an HTML page, because it can remember the values of variables when the function was created instead of what they are when they are executed.

### Putting it all together

Test all together by using a debounce function.
The point of a debounce function is to only execute a specified function once within a given time window. Any requests to execute the debounce function more frequently than this will make the window reset. This is important in cases where a user can trigger expensive events thousands of times per second. Without a debounce the performance can suffer.

This example uses the browsers `window.addEventListener` function to add a callback function that is invoked whenever the user scrolls the browsers web pages. The first parameter specified that it wants to listen for scroll events. The second parameter provides the function to call when a scroll event happends. In this example its debounce.

The debounce takes two parameters, the time window for executing the window function, and the window function to call within that limit. 

```javascript
window.addEventListener(
  'scroll',
  debounce(500, () => {
    console.log('Executed an expensive calculation');
  })
);
```

The debounce function implements the execution of windowFunc within the restricted time window by creating a closure that contains the current timeout and returning a function that will reset the timeout every time it is called. The returned function is what the scroll event will actually call when the user scrolls the page. However, instead of directly calling the windowFunc it sets a timer based on the value of windowMs. If the debounce function is called again before the window times out then it resets the timeout.

```javascript
function debounce(windowMs, windowFunc) {
  let timeout;
  return function () {
    console.log('scroll event');
    clearTimeout(timeout);
    timeout = setTimeout(() => windowFunc(), windowMs);
  };
}
```

## JavaScript Array
An array object represents a sequence of other objects and primatives. You can reference the members of the array using a zero based index. You can create an array with the array constructor or using the array literal notation shown below.

```javascript
const a = [1, 2, 3];
console.log(a[1]);
// OUTPUT: 2

console.log(a.length);
// OUTPUT: 3
```

### Object Functions
The array has several interesting static functions associated with it.

|Function|Meaning|Example|
|---|---|---|
|push|add an item to the end of an array|`a.push(4)`|
|pop|remove an item from the end of the array|`x = a.pop()`|
|slice|returns a sub-array|`a.slice(1,-1)`|
|sort|run a function to sort an array in place|`a.sort((a,b) => b-a)`|
|values|creates an iterator for use with a `for of` loop|`for (i of a.values()) {...}`|
|find|find the first item satisfied by a test function|`a.find(i => i < 2)`|
|forEach|run a function on each array item|`a.forEach(console.log)`|
|reduce|run a function to reduce each array item to a single item|`a.reduce((a,c) => a + c)`|
|map|run a function to map an array to a new array|`a.map(i => i+i)`|
|filter|run a function to remove items|`a.filter(i => i%2)`|
|every|run a function to test if all items match|`a.every (i => i < 3)`|
|some|run a function to test if any items match|`a.some(i => 1 < 1)`|

```javascript
const a = [1, 2, 3];

console.log(a.map((i) => i + i));
// OUTPUT: [2,4,6]
console.log(a.reduce((v1, v2) => v1 + v2));
// OUTPUT: 6
console.log(a.sort((v1, v2) => v2 - v1));
// OUTPUT: [3,2,1]

a.push(4);
console.log(a.length);
// OUTPUT: 4
```
## JavaScript Object Notation (JSON)
Created by Douglas Crockford in 2001 while working at Yahoo. It's pronounced like the name Jason. Officially standardised in 2013 and 2017.
JSON gives a simple and effective way to share and store data. It's easily convertable to, and from, JS objects, which makes it very convenient when working with web technologies. JSON is one of the worlds most popular data formats.

### Format
JSON document has one of these data types
|type|example|
|---|---|
|string|`"crockford"`|
|number|`42`|
|boolean|`true`|
|array|`[null,42,"crockford"]`|
|object|`{"a":1,"b":"crockford"}`|
|null|`null`|

A JSON document has an object. These contain zero or more key value pairs. A key is always a string, and the value has to be one of the valid JSON data types. Key value pairs are set with commas, curly braces mean an object, square brackets and commas mean arrays, and strings are always made with double quotes.

example:
```JSON
{
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}
```
Always encoded with UTF-8, allowing for the representation of global data.

### Converting to JavaScript
Convert JSON to and from JS using the `JSON.parse` and `JSON.stringify` functions.

```javascript
const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
```

In this example, JSON cannot represent JS undefined object so it gets dropped when converting from JS to JSON.

## JavaScript Object and Classes
