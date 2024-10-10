import { onTransitionStart } from "../game/events"
import { goScene, sceneNameType } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { slidingSquareTransition } from "../game/transitions/slidingSquare"
import { playSound } from "../plugins/features/sound"
import { utils } from "../utils"

export function TitleScene() { scene("title", () => {
	setBackground(BLUE.lighten(30))

	onKeyPress("enter", () => {
		goScene("game", fadeOutTransition)
	})
})} // END OF SCENE
