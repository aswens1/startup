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

Server deployed and accessible with custom domain name - [My server link](https://8bitalley.click).
