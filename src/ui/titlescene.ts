import { goScene, sceneNameType } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { stickersTransition } from "../game/transitions/stickersSubstate"
import { playSound } from "../plugins/features/sound"
import { utils } from "../utils"

export function titlescene() { return scene("title" as sceneNameType, () => {
	setBackground(BLUE.lighten(30))

	const music = playSound("opening")
	tween(0, 1, 0.5, (p) => music.volume = p)

	onKeyPress("enter", () => {
		utils.FNFScratch(music, 1.2)
		goScene("game", stickersTransition)
	})
})} // END OF SCENE
