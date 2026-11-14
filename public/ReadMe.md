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

## Design System

### Colour Palette

Most of the page will be made using images. This will allow to get much closer to the "game night at the kitchen table" vibe than would be possible using only traditional colours.

| Colour | Use |
| ------ | --- |
| Black (#000000) | Most text, most shadows, pips |
| White (#ffffff) | Small inset shadow on pips |
| #000050 | Score text |
| #fcf7eb | Dice |
| #F9FBFF | Paper background |

#### Reasoning

Black: Most of the time printers will use black ink for text and tables. The pips on the dice most people would have are black. Using black for shadows with varying transparency looks like the object is actually blocking light.

White: Using a slight inset shadow that is white makes the pips look like they are actually carved into the dice and not just flat prints on top of them by imitating the light reflections we would normally see in real life.

#000050: Keeping with the theme of family game night and paper many pens are a dark blue colour. Matched with the Kalam font makes it more convincing that the scores are written and not computer printed.

#fcf7eb: Most of the time when dice are used in games they have been used for a fair amount of time. By using an off-white colour for the dice it gives them the slightly aged look that most people would be more familiar with

#F9FBFF: Specifying the background colour of the paper allows me to slightly blend the paper image into it so that it has both the texture from the image and the slight off-white colour of old paper. Different from dice colour because paper and dice discolour slightly differently. 

#### Background

The background is a picture of a table to once again give the family game night vibe.

### Fonts

| Use | Font | Style |
| --- | ---- | ----- |
| Main/scorecard | Inter | Default |
| Points | Kalam | Default, dark blue |

#### Reasoning

Inter: Inter is a fairly generic font which makes it more believable that a family has gone through all their original yahtzee papers and had to print more they found on the internet

Kalam: Kalam is a font that is meant to look like handwriting. Using it in a dark blue colour for the points makes it more convincing that this is a game being played by the family and the scores are being written down as the game goes on.

### Design Comments

#### Overall Layout

I've chosen to keep as much of the content looking like realy opjects as possible to give the illusion of the game being played in real life as opposed to on a website

#### Possible Interactions and Animations

- I plan of having the dice be animated in some way, likely not 3d rolling, but at least making the pips cycle through a couple random faces before settling in their final place. I'll liekly do this by just performing the roll step in javascript more times.
- I plan on slightly moving the held dice in some way to make it clear they are not being rerolled.
- I plan on having the roll button look like the cup that often comes with Yahtzee for rolling the dice and having the user click that to initiate the rolling.
- I plan on trying to animate the scores being written in to look like a person is writing them with a pen. There will also be a pen somewhere on the table
- I'd like to give an animation to the rolling to make it look like the dice are being put into the cup, shaken, and then thrown back out, but am unsure of the feasibility of this within the time constraints