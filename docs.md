# Yandex SDK

Yandex SDK API Manager for Yandex.Games

 **Param: Fullscreen on start**  *(Enable Fullscreen on game start.)* 

 **Param: Orientation**  *(Device orientation portrait or landscape or any.)* 

 **Param: Lock orientation**  *(Lock orientation. Yandex SDK ask user for rotate device if orientations does not match.)* 

 **Param: Metrica ID**  *(Yandex.Metrica Counter ID for use Metrica Actions. 0 is don't load and use Metrica.)* 

## Actions

### Show Fullscreen

Show fullscreen banner.

### Reach Goal

 **Param: Target**  *(Target ID (name))* 

Send Goal to Yandex.Metrica

### Sign in

Auth player by Yandex.Passport.

### Load Catalog

Load products catalog.

### Load Purchases

 **Param: Auto Sign In**  *(Auto Sign In if not signed.)* 

Load player purchases.

### Buy

 **Param: Purchase ID**  *(Purchase ID.)* 

Buy product by ID.

### Show Rewarded Video

Show rewarded video.

### Consume Purchase

 **Param: ID**  *(ID of product.)* 

Consume purchase by id.

### Increment State

 **Param: Key**  *(Name of stats key of player.)* 

 **Param: Value**  *(Increment by Value.)* 

Add Value to player state key.

### Set Player State

 **Param: Key**  *(Name of stats key of player.)* 

 **Param: Value**  *(Value to set.)* 

Set Value of player state key.

### Set Player Data

 **Param: Key**  *(Name of data key of player.)* 

 **Param: Value**  *(Value to set.)* 

Set Value of player data key.

### Load Player Stats

Load player stats.

### Load Player Data

Load player data.

## Conditions

### On Adv Close

Triggers when adv was closed (by player, adblock, or error).

### On First Adv Closed

Triggers when first adv was closed (by player, adblock, or error).

### On Sign In Failed

Yandex doesn't send player data (popup closed, client or server error, etc.).

### On Sign In Success

Triggers when player data arrived successful.

### Is Signed In

Is Player Signed In Yandex.Passport.

### Is Purchases Available

True if application has successul moderated purchases. False if not or error.

### Has Any Purchase

Player has any purchase.

### On Buy Success

 **Param: Purchase ID**  *(Purchase ID.)* 

On buy success

### On Buy Failed

 **Param: Purchase ID**  *(Purchase ID.)* 

On buy failed

### On Any Buy Success

On any buy success

### On Any Buy Failed

On any buy failed

### On Purchases Load Success

On player purchases load success.

### On Purchases Load Failed

On player purchases load failed.

### On Catalog Load Success

On catalog of products load success.

### On Catalog Load Failed

On catalog of products load failed.

### Has Purchase

 **Param: Product ID**  *(Product ID.)* 

Has purchased product (by ID).

### Each Product

For each product in catalog.

### Each Purchase

For each bought player purchase.

### On Rewarded Video Open

Triggers when rewarded video open.

### On Rewarded Video Close

Triggers when rewarded video close.

### On Rewarded Video Error

Triggers when rewarded video throw error.

### On Rewarded Video Reward

Triggers when player watched rewarded video.

### On Increment Player State Failed

 **Param: State Key**  *(State Key.)* 

Trigger when increment player state key failed.

### On Set Player State Failed

 **Param: State Key**  *(State Key.)* 

Trigger when set player state key failed.

### On Set Player Data Failed

 **Param: State Key**  *(State Key.)* 

Trigger when set player data key failed.

### On Load Player Stats Success

Trigger when player stats loaded.

### On Load Player Stats Failed

Trigger when player stats load error.

### On Load Player Data Success

Trigger when player data loaded.

### On Load Player Data Failed

Trigger when player data load error.

### On Consume Success

 **Param: Purchase ID**  *(Purchase ID.)* 

On consume purchase success.

### On Consume Failed

 **Param: Purchase ID**  *(Purchase ID.)* 

On consume purchase failed.

### On Any Consume Success

On any consume purchase success.

### On Any Consume Failed

On any consume purchase failed.

## Expressions

### Player Name

Return player name.### Player ID

Return player id.### Player photo (small)

Return player small (56x56) photo.### Player photo (medium)

Return player medium (84x84) photo.### Player photo (large)

Return player large (200x200) photo.### Current Product ID

Current product ID in each product loop.### Current Product Title

Current product name in each product loop.### Current Product Image

Current product image in each product loop.### Current Product Description

Current product description in each product loop.### Current Product Price

Current product price in each product loop.### Current Purchase ID

Current product ID of purchase in each purchases loop.### Current Purchase Token

Current purchase token in each purchases loop.### Current Purchase Sign

Current purchase signature in each purchases loop.### Get Purchase Token

 **Param: Product ID**  *(Product ID of purchase.)* 

Get purchase token by Product ID### Last Purchase ID

Return last purchase ID.### Last Purchase Token

Return last purchase token.### Get Product Title

 **Param: Product ID**  *(Product ID of purchase.)* 

Get product title by Product ID### Get Product Description

 **Param: Product ID**  *(Product ID of purchase.)* 

Get product description by Product ID### Get Product Image

 **Param: Product ID**  *(Product ID of purchase.)* 

Get product image by Product ID### Get Product Price

 **Param: Product ID**  *(Product ID of purchase.)* 

Get product price by Product ID### Last Player State Key

Return last player state key.### Last Player Data Key

Return last player data key.### Get Player State

 **Param: Key**  *(Key of player state.)* 

Get player state by Key.### Get Player Data

 **Param: Key**  *(Key of player data.)* 

Get player data by Key.