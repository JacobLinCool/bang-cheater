# Bang Cheater

Cheat on <https://bang.jacoblin.cool/>

This is only a simple Tampermonkey script.

## How does it work?

The game server uses an encrypted address offset (`x`) to represent the card when we select it.

For hidden cards, can only get the `x` of the card, so we don't know the actual card information.

The only problem with the encryption is that the encryption will be performed only once, so we can have a "database" to record the relationship between `x` and shown card. Then, if a hidden card is stored in the database, we can to get the real card information from the database and show it on the screen.

## Usage

1. [Install Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. [Go to Release page and download `bang-cheater.user.js`](https://github.com/JacobLinCool/bang-cheater/releases)
