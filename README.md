# 8-Bit Alley

[My Class Notes](notes.md)

8-Bit Alley is a pixel based arcade, where you can play pixel games with friends and contribute to the community canvas!

## 🚀 Specification Deliverable

### Elevator pitch

Ever wanted a simple way to draw with pixels with your friends? 8-Bit Alley is a real-time multiplayer pixel arcade! Players can create and join competetive games, or contribute to the community canvas! Pixel colours and canvas progress are updated live to everyone online. So come collaborate, compete, or just cause chaosin the 8-Bit Alley!

### Design

Landing page:
![landing page](mockups/landing-page.jpeg)

Lobby:
![lobby](mockups/lobby.jpeg)

Gameplay:
![gameplay](mockups/gameplay.jpeg)

Leaderboard:
![leaderboard](mockups/leaderboard.jpeg)

### Key features

- Secure login and activity tracking
- Collaborative pixel canvases
- Create and join pixel mulitple arcade games
- Real-time multiplayer
- Leaderboards per game style

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - HTML will be used for the core structureand organisation by creating the pages for the login/sign up, lobby/collaborative canvas, gameplay pages, and the leaderboards.
- **CSS** - CSS will be used to style the pixel grids, UI panels, and controls. It will also be used to animate pixel changes and help with a responsive layout based on screen size.
- **React** - React will be used to break the UI into reusable compenents, manages the page connections, and handles reactive updates to pixel and gameplay.
- **Service** - Service will be used to handle authentication, endpoints for the current board state, accepts and validates pixels, and supplies leaderboard data. I will also use the [Colormind API](http://colormind.io/api-access/) to randomise the pixel colour for teams in game play. 
- **DB/Login** - The Database will store accounts and auth information, saves the pixel data for each board, and stores game boards and leaderboard stats.
- **WebSocket** - WebSocket will be used to update boards in real-time to other players when a pixel is changed, sends board resets and game state changes, and enables live multiplayer interactions.

## 🚀 AWS deliverable

Server deployed and accessible with custom domain name - [8bitalley.click](https://8bitalley.click).

## 🚀 HTML deliverable

I reviewed and deployed the Simon HTML code to my project - found at [simon.8bitalley.click](https://simon.8bitalley.click).

I've also deployed my HTML to my project - found at [startup.8bitalley.click](https://startup.8bitalley.click).

- **HTML pages** - So. far I have 5 HTML pages, [gameSelectionMenu](pages/gameSelectionMenu.html), [getStarted](pages/getStarted.html), [leaderboard](pages/leaderboard.html), [lobby](pages/lobby.html), [collaborativeCanvas](pages/collaborativeCanvas.html), [index](index.html), and an example for [gamePlayCanvas](pages/gamePlayCanvas.html).
- **Proper HTML element usage** - I'ved used proper HTML throughout all the HTML pages I've made to form the main structure of each page.
- **Links** - I've been using links and the anchor tag on every page in a nav element to get from page to page. There is also a link to this repo in the footer of all the pages. There is also a link to my github repo on every page.
- **Text** - I've used text as a placeholder for the leaderboard entries and the game options in the creating a game section. I plan to use it as placeholder data in the join a game section as well.
- **3rd party API placeholder** - On the [gamePlayCanvas](pages/gamePlayCanvas.html), there is a mock colour pallette. When I include the [Colormind API](http://colormind.io/api-access/), there will be a randomized colour pallette for each game when it is created.
- **Images** - I've put an svg image on the index page that I would like to have as the background of that main page, just much fainter than it is now.
- **Login placeholder** - There is a login and sign up placeholder on the [getStarted](pages/getStarted.html) page.
- **DB data placeholder** - There is text and form placeholders everywhere where the database will be called - login/register, create/join a game, collaborate and gameplay canvas, and the leaderboard.
- **WebSocket placeholder** - When I add WebSocket, it will be used on the gameplay canvases and the collaborative canvas to update the board in real time as players place pixels.

## 🚀 CSS deliverable
I reviewed and deployed the Simon CSS code to my project - found at [simon.8bitalley.click](https://simon.8bitalley.click).
