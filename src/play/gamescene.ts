import { GameSave } from "../game/gamesave"
import { gameLayers } from "../game/layers"
import { goScene, sceneNameType } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { slidingSquareTransition } from "../game/transitions/slidingSquare"
import { stickersTransition } from "../game/transitions/stickersSubstate"
import { customAudioPlay, playSound } from "../plugins/features/sound"
import { soundTray } from "../plugins/features/soundtray"
import { juice } from "../plugins/graphics/juiceComponent"
import { utils } from "../utils"

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

	const music = playSound("ending")
	tween(0, 1, 0.5, (p) => music.volume = p)
	
	onKeyPress("escape", () => {
		utils.FNFScratch(music)
		goScene("title", stickersTransition)
	})
})} // END OF SCENE
