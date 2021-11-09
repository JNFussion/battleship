# Battleship

This project is from [The odin project's JavaScript course.](https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/javascript/lessons/battleship)

The goal of the project is to practise Test Driven Development. For this I have implemented a version of the board game battleship.

If you wanna see it, click [here.](https://jnfussion.github.io/battleship/)

## Description

There are two boards with 10 ships of different sizes placed in each grid.
The left one is yours, the right one is the opponent's. <br>
You can place and rotate yours ships a you please or click **Randomise** to rondimize the position of the ships. <br>
Click **Play** when you be ready.

| Ship's size | No. of ships |
| ----------- | ------------ |
| 2           | 4            |
| 3           | 3            |
| 4           | 2            |
| 5           | 1            |

## Rules

1. Ships must be one cell apart.
2. Ships cannot overlap.
3. One attack per turn.
4. Ships that have been hit are mark with a fire icon.
5. Missed attacks are mark with a water emblem.

## Improvement

- IA attack adjacent cells when a ship is hit.

- Board doesn't respond properly when window is resized.

- If window is resize and Randomize is clicked, it freezes the page.

## Resources used:

- Webpack as module bundler. [Link](https://webpack.js.org/)

- Eslint and prettier for formatting and linting. [Link](https://eslint.org/) | [Link](https://prettier.io/)

- Tailwindcss for styling. [Link](https://tailwindcss.com/)

- Color paletter [Link](https://coolors.co/)

- Fontawesome for icons. [Link](https://fontawesome.com/)

- Google Fonts for fonts. [Link](https://fonts.google.com/)

- Jest for unit testing. [Link](https://jestjs.io/)

- canvg for parsing SVG file into HTML canvas. [Link](https://github.com/canvg/canvg)

- Konva.js for implementing the boards. HTML5 2d canvas js library for desktop and mobile applications. [Link](https://konvajs.org/)

- PubSubJS is a topic-based publish/subscribe library written in JavaScript. [Link](https://github.com/mroderick/PubSubJS)
