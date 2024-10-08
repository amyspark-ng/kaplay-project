import { goScene, sceneNameType } from "../game/scenes"
import { slidingSquareTransition } from "../game/transitions/slidingSquare"
import { playSound } from "../plugins/features/sound"
import { utils } from "../utils"

export function titlescene() { return scene("title" as sceneNameType, () => {
	setBackground(BLUE.lighten(30))

	onKeyPress("enter", () => {
		goScene("game", null)
	})

})} // END OF SCENE
