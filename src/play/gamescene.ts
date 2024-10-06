import { GameSave } from "../game/gamesave"
import { gameLayers } from "../game/layers"
import { goScene, sceneNameType } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { slidingSquareTransition } from "../game/transitions/slidingSquare"
import { stickersTransition } from "../game/transitions/stickersSubstate"
import { customAudioPlay, playSound } from "../plugins/features/sound"
import { soundTray } from "../plugins/features/soundtray"
import { juice } from "../plugins/graphics/juiceComponent"

export function gamescene() { return scene("game" as sceneNameType, () => {
	setBackground(RED.lighten(60))
	
	const bean = add([
		sprite("burpman"),
		layer(gameLayers.background),
		pos(center()),
		anchor("center"),
		juice(),
		area(),
		scale(),
	])

	let paused = true

	let music = playSound("music")
	music.scratch(-1)

	onKeyPress("backspace", () => {
		goScene("title", stickersTransition)
	})

	onKeyPress("space", () => {
		if (paused) {
			paused = false
		}

		else {
			paused = true
		}
	})

})} // END OF SCENE
