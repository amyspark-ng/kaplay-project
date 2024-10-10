import { onTransitionEnd } from "../game/events"
import { goScene } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { cam } from "../plugins/features/camera"
import { gameCursor } from "../plugins/features/gameCursor"
import { drawDumbOutline } from "../plugins/graphics/drawDumbOutline"
import { juice } from "../plugins/graphics/juiceComponent"

export function GameScene() { scene("game", () => {
	setBackground(RED.lighten(60))
	
	const bean = add([
		sprite("bean"),
		pos(center()),
		anchor("center"),
		juice(),
		layer("background"),
		area(),
		scale(),
		area(),
		drawDumbOutline(30, RED),
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