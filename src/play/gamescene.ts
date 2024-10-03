import { gameLayers } from "../game/layers"
import { scenes } from "../game/scenes"
import { soundTray } from "../plugins/features/soundtray"

export function gamescene() { return scene("gamescene", () => {
	setBackground(RED.lighten(30))
	
	add([
		sprite("bean"),
		layer(gameLayers.background),
	])

	onKeyPress("backspace", () => {
		go(scenes.titlescene.key)
	})
})} // END OF SCENE
