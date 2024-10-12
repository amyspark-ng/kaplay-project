import { Key } from "kaplay"
import { goScene } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { dragger } from "../plugins/features/drag"
import { gameCursor } from "../plugins/features/gameCursor"
import { juice } from "../plugins/graphics/juiceComponent"
import { utils } from "../utils"
import { unwatchVar, watchVar } from "../plugins/features/watcher"

export function GameScene() { scene("game", () => {
	setBackground(RED.lighten(60))
	
	const bean = add([
		sprite("bean"),
		pos(center()),
		anchor("center"),
		juice(),
		layer("background"),
		scale(),
		area(),
		dragger(),
	])

	bean.onClick(() => bean.pick())
	bean.onMouseRelease(() => bean.drop())

	bean.onHover(() => {
		gameCursor.point()
	})

	bean.onHoverEnd(() => {
		gameCursor.default()
	})

	onKeyPress("f1", () => debug.inspect = !debug.inspect)

	const keys = {
		"up": UP,
		"down": DOWN,
		"left": LEFT,
		"right": RIGHT,
	}

	onUpdate(() => {
		watchVar("bean.pos", bean.pos)
		watchVar("fakeVariable", "fakeValue")

		Object.keys(keys).forEach(keyInKeys => {
			watchVar(keyInKeys + "_key", isKeyDown(keyInKeys as Key))
			
			if (isKeyDown(keyInKeys as Key)) {
				bean.pos = bean.pos.add(keys[keyInKeys].scale(2))
			}
		});

		if (isKeyPressed("u")) {
			const newColor = utils.randomColor()
			watchVar("aColor", newColor)
		}
	})

	onKeyPress("m", () => {
		unwatchVar("bean.pos")
	})

	onKeyPress("escape", () => {
		goScene("title", fadeOutTransition)
	})
})}