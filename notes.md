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

