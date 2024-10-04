import { gameLayers } from "../game/layers"
import { scenes } from "../game/scenes"
import { customAudioPlay, playSound } from "../plugins/features/sound"
import { soundTray } from "../plugins/features/soundtray"
import { juice } from "../plugins/graphics/juiceComponent"

export function gamescene() { return scene("gamescene", () => {
	setBackground(RED.lighten(60))
	
	const bean = add([
		sprite("bean"),
		layer(gameLayers.background),
		pos(center()),
		anchor("center"),
		juice(),
		area(),
		scale(),
	])

	onKeyPress("backspace", () => {
		go(scenes.titlescene.key)
	})

	let paused = true

	let music = playSound("music")
	music.scratch(-1)

	onKeyPress("space", () => {
		if (paused) {
			paused = false
		}

		else {
			paused = true
		}
	})

})} // END OF SCENE
