# Spooky Fish
A virtual aquarium using WebSockets and PIXI.js. Users can join the aquarium by visiting entering a specific hash in
their browser: `http://host/#0`, `http://host/#1`, and so on. You can click on your screen to feed the fish.

## How does it work?
Every client has a local copy of the school of fish that's it's iterating over time. However, whenever a fish reaches
the edge of a viewport `v`, the client will broadcast the current position via WebSockets to all other clients. Since
this fish is near the edge of viewport `v`, it should not be visible in any other viewport. So, when a viewport receives
an update, it can simply "teleport" the fish to the new location safely. Each viewport is assigned "ownership" of a
group of fish, so that that particular viewport is always a source of truth for the fish.

## Building and Running
Make sure to run `npm install` to get dependencies, and then `npm run bundle` will rebuild the front-end bundled code.
`npm start` will crank up a local server for you test with.
