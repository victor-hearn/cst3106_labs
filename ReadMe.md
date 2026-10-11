# Yahtzee Game Design Documentation

The following is the design details for the Yahtzee game built to be played on a webpage. It will outline the rulesof the game, as well as the colors, fonts, specific designs and static HTML/CSS mockups of the page.

The rules for this game will be primarily based on the Hasbro owned version of **Yahtzee**, with slight adjustments to the scoring rules from the European based version of **Yatzy**

**General Design Idea:** Made to look like it is being played at home on the dining room table. The game should feel comfortable like it is being played for family game night. 
*Note that despite being made to look like family game night, the page will remain as a single player version of the game*

---

## Overview of the Game

Yahtzee is a game of dice, which has an element of both luck and strategy. 

## Rules

### Rounds

- Each round the player may roll the dice up three times.
- After each roll the player may choose to hold on to specific dice. These dice will remain held until the next round begins.
- After the player's third roll they must choose a empty box on the scorecard to fill in their score.
- If the dice combination does not align with any empty boxes, the player must choose a box to fill with a 0.
- The player may choose to fill a box with their score after their first or second roll if they desire, thus ending the round early.
- Each box may only be used once, and the game ends when all 13 boxes are filled.

### Scoring

#### Upper Section

| Box | Score |
| --- | ----- |
| Ones - Sixes | Sum of the dice showing that number |
| Bonus | +35 if the upper section totals 63 or more |

#### Lower Section

| Box | Requirement | Score |
| --- | ----------- | ----- |
| 3 of a kind | Three dice of the same number | Add up total of the 3 matching dice |
| 4 of a kind | Four dice of the same number | Add up total of the 4 matching dice |
| Full House | Three of a kind and a different pair | 25 points, or total of the dice |
| Small Straight | any four numbers in sequence | 30 points |
| Big Straight | any five numbers in squence | 40 points |
| Yahtzee | All five dice are the same number | 50 points |
| Chance | Anything | total of all the dice |

#### Final Score

When all 13 boxes are filled the player's final score is their total of the upper section plus the bonus plus the total of the lower section