import { GameSave } from "../game/gamesave"
import { gameLayers } from "../game/layers"
import { goScene, sceneNameType } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { slidingSquareTransition } from "../game/transitions/slidingSquare"
import { customAudioPlay, playSound } from "../plugins/features/sound"
import { soundTray } from "../plugins/features/soundtray"
import { juice } from "../plugins/graphics/juiceComponent"

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
	])
})} // END OF SCENE
