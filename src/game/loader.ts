import { gamescene } from "../play/gamescene";
import { titlescene } from "../ui/titlescene";

export function loadingScreen(progress: number) {
	// Black background
	drawRect({
		width: width(),
		height: height(),
		color: rgb(0, 0, 0),
	});

	// A pie representing current load progress
	drawCircle({
		pos: center(),
		radius: 32,
		end: map(progress, 0, 1, 0, 360),
	});

	drawText({
		text: "loading" + ".".repeat(wave(1, 4, time() * 12)),
		font: "monospace",
		size: 24,
		anchor: "center",
		pos: center().add(0, 70),
	});
}

export function loadEverything() {
	loadBean()
	loadSprite("osaka", "osaka.png")
	loadSound("volumeChange", "sounds/volumeChange.wav")
	
	loadSprite("cursor", "sprites/cursor-o.png")
	loadSprite("pointer", "sprites/pointer-o.png")

	loadSound("music", "sounds/music.ogg")
	loadSound("saataandagi", "sounds/saataandagi.ogg")
	
	loadSound("plap", "sounds/plap.mp3")
	loadSound("plop", "sounds/plop.mp3")

	loadSound("bounce", "sounds/ClickUp.ogg")

	// Object.values().forEach(sceneType => {
	// 	sceneType.sceneThing()
	// });

	gamescene()
	titlescene()
}