My startup project for BYU cs260.

[My notes for the class](notes.md)

# Specification Deliverable

## Elevator Pitch
Stuck in a reading block? No one wants to hear you talk about the book you just finished? Join a virtual book club with like minded people. Get book recommendations, ratings, create clubs with your friends, or join a public one! Share your thoughts and discuss ideas! Suggest books to be read next! Browse the community library for inspiration!

## Design
All design features are subject to change.
![login page](https://github.com/aswens1/startup/blob/main/startup%20design%20elements/login_page.jpeg)
![personal dashboard](https://github.com/aswens1/startup/blob/main/startup%20design%20elements/personal_dashboard.jpeg)
![create_club](https://github.com/aswens1/startup/blob/main/startup%20design%20elements/create_club.jpeg)
![join_club](https://github.com/aswens1/startup/blob/main/startup%20design%20elements/join_club.jpeg)
![club_dashboard](https://github.com/aswens1/startup/blob/main/startup%20design%20elements/club_dashboard.jpeg)
![public_clubs](https://github.com/aswens1/startup/blob/main/startup%20design%20elements/public_clubs.jpeg)

## Key Features
- Secure login
- Browse public clubs based on what books they are reading
- Create a club for you and your friends
- Suggest books for the community library and rate them out of five
- Add books to your bookshelf to keep track of which ones you've read
- Write a review on books you've read
- Contribute to the club discussion post

## Technologies
#### HTML
HTML will be used for structure and organisation. Login, create club, join club, personal dashboard, club dashboard. If there is time, pages for public clubs and a public library.

#### CSS
CSS will be used for style and design, and overall making it look clean and readable.

#### JavaScript
JavaScript will be used for interactivity. Creating different buttons and user input areas.

#### Service
Backend service for login, joining clubs, finding books submitted by other users, and accessing reviews or discussions posted by other users.

#### Database/Authentication
Stores login information so you can access your account and clubs later. Stores book reccomendations and ratings. Have to be logged in to join a club, whether public or private.

#### Websocket
Fascilitates the discussion posts in the club pages. Questions and answers, and responding to others.

#### React
Uses the React web framework.

# HTML Deliverable
For this deliverable I built out the structure of my startup.
## Technologies
#### HTML
Used HTML to create 8 different pages with structure. There is the login, create account, create club, join clubs, personal dashboard, and club dashboards.

#### Links
The login page automatically takes you to the personal dashboard. The dashboard has a menu with hyperlinks to creating a club, joining a club, or visiting the dashboards of clubs you are apart of. There is also a link to add a book to your finished book list, and a link to my GitHub repository. The submit buttons on the create club and join club take you to the club dashboards.

#### Text
I've used text as a placeholder by creating an example club 'Bookworms', as well as fill in information on the personal dashboard. Those will both be able to be user inputed later on by the club creator and users as they track their reading.

#### Images
I've included an image of the book cover for the first Harry Potter book on the Bookworms dashboard. Once I can connect to a third party server, that information will come from there instead.

#### DB/Login
The main page is a login page with a placeholder for a username and a password. The joining clubs page, the club dashboard, and the personal dashboard will all contain data pulled from the database.

#### WebSocket
On the club dashboard is a placeholder for a discussion board that will use realtime posting from other users.

# CSS Deliverable
For this deliverable I used CSS to style the different pages of my startup.
## Technologies
#### Header, footer, main content body
#### Navigational elements
Every page except for the login page has a navigational header that displays all the various links necessary to navigate my startup. These links no longer have underlines and are styled.

#### Responsive window resizing
My application looks great on all sizes. I'm particularly proud of the bookshelf and the resizing there.

#### Application elements
Carefully picked out colours and spaced everything apart so it's easy to read.

#### Application text content
I used the Libre Baskerville font for all elements of text.

#### Application images
I have one image on the club dashboard page, and I used CSS to create a bookshelf on the personal dashboard page.
