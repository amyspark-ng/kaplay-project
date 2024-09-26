import { gamescene } from "./scenes/gamescene.ts"

export function loadEverything() {
	loadBean()
	loadSprite("osaka", "osaka.png")
	loadSound("volumeChange", "sounds/volumeChange.wav")
	
	loadSprite("cursor", "sprites/cursor-o.png")
	loadSprite("pointer", "sprites/pointer-o.png")

	loadSound("music", "sounds/music.ogg")
	loadSound("click", "sounds/saataandagi.ogg")

	loadScenes()
}

export function loadScenes() {
	gamescene()
}