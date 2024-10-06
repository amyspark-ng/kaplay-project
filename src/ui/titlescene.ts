import { goScene, sceneNameType } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { playSound } from "../plugins/features/sound"
import { utils } from "../utils"

export function titlescene() { return scene("title" as sceneNameType, () => {
	setBackground(BLUE.lighten(30))
	
	onClick(() => {
		let music = playSound("opening")
		onKeyPress("enter", () => {
			utils.FNFScratch(music)
		})
	})

})} // END OF SCENE
