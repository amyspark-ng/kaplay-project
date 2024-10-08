import { gameLayers } from "../game/layers"
import { sceneNameType } from "../game/scenes"
import { cam } from "../plugins/features/camera"
import { playSound } from "../plugins/features/sound"
import { soundTray } from "../plugins/features/soundtray"
import { juice } from "../plugins/graphics/juiceComponent"
import { utils } from "../utils"

export function gamescene() { return scene("game" as sceneNameType, () => {
	setBackground(RED.lighten(60))
	
	const bean = add([
		sprite("bean"),
		layer(gameLayers.background),
		pos(center()),
		anchor("center"),
		juice(),
		area(),
		scale(),
		area(),
	])

	const music = playSound("opening")

	onClick(() => {
		music.windDown()
	})
})} // END OF SCENE
