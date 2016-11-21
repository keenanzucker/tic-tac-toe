# tic-tac-toe
##### A simple Tic Tac Toe Game for the browser, written in React

I developed this game as a coding challenge for an internship at Zendesk. You can see more of my work on my [personal website](http://keenanzucker.com/)

## How to user:

#### Check out the [live version!](http://keenanzucker.com/tic-tac-toe/)

#### Or follow the instructions to run it locally:

- copy the link from the clone option in the repository on the github page [here](https://github.com/keenanzucker/tic-tac-toe)
- navigate to your desired folder and run ```git clone <link-copied-from-github>```
- run ```cd tic-tac-toe```
- run ```npm install ``` to download the necessary packages
- run ```npm start``` to run it locally. It should automatically open a new browser tab but if not, navigate to ```http://localhost:3000/```in your browser

## Game Features:

### Three ways to play!
#### One Player -- Easy 
This is the best option if you want to stick it to the computer and win some games! I implemented a naive AI that will randomly choose a move out of the available tiles. You should be able to outsmart this one!
#### One Player -- Hard
If you want a challenge, try this version. The best possible outcome for the user is to tie. But try your hardest! I implemented a minimax algorith that calculates possible game states, and just won't lose! Darn those computers.
#### Two Player
If you want to challenge your friend, try the two player version. Take turns playing and see who is the ultimate tic-tac-toe master. The 'X' player will always go first, so keep that in mind! 
