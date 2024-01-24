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
