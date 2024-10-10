import { onTransitionEnd } from "../game/events"
import { goScene } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { cam } from "../plugins/features/camera"
import { gameCursor } from "../plugins/features/gameCursor"
import { dumbOutline } from "../plugins/graphics/drawDumbOutline"
import { juice } from "../plugins/graphics/juiceComponent"
import { utils } from "../utils"

export function GameScene() { scene("game", () => {
	setBackground(RED.lighten(60))
	
	const bean = add([
		sprite("sprite"),
		pos(center()),
		anchor("center"),
		juice(),
		layer("background"),
		area(),
		scale(),
		area(),
	])

	bean.onHover(() => {
		gameCursor.point()
	})

	bean.onHoverEnd(() => {
		gameCursor.default()
	})

	onKeyPress("escape", () => {
		goScene("title", fadeOutTransition)
	})
})}