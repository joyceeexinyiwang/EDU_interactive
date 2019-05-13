# interactive part of the EDU project

in progress by joyce wang and NaTasha Thompson  

## How to use it
- (If there is an update) download this github package
- Save to the desired folder (e.g. Desktop) and extract folder
- In command prompt, navigate to the folder that was just downloaded (something like `Desktop/EDU_interactive-master/EDU_interactive-master/`)
- In command prompt, enter `browser-sync start --server --directory --files "*"`
- A browser (Chrome) will be automatically opened. Navigate to open the html file `./p5/runshow/index.html`
- Allow browser to access camera and turn audio on
- Play! (use your nose to activate audio files)

## Notes
- Works better when there is only one person in front the camera
- Only use **Chrome**!! (NEVER Microsoft Edge or IE)
- Tips on using [Windows command prompt](https://www.lifewire.com/list-of-command-prompt-commands-4092302)

## Dependencies
- Python 3.7
- Node.js
- browser-sync (`npm install -g browser-sync`)

## Sources
- [p5js](https://p5js.org/)
- [posenet](https://ml5js.org/docs/posenet-webcam)