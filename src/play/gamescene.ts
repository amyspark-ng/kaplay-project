import { GameObj, Vec2 } from "kaplay";
import { GameSave } from "../game/gamesave.ts";
import { gameCursor } from "../plugins/customCursor.ts";
import { drag, dragger } from "../plugins/drag.ts"
import { playSound } from "../plugins/sound.ts";
import { bounceable, playBounceSound } from "./components/bounceable.ts";
import { utils } from "../utils.ts";
import { juice } from "../plugins/juiceComponent.ts";

export function createBounceable(position:Vec2) {
	const bean = add([
		sprite("bean"),
		pos(position),
		area(),
		dragger(false, false, false),
		rotate(0),
		layer("background"),
		bounceable(),
		color(),
		anchor("center"),
		rotate(0),
		scale(),
		juice(),
		timer(),
		"bounceableBean",
	])
	
	bean.onHover(() => {
		gameCursor().point()
	})
	
	bean.onPick(() => {
		bean.bop(1, 0.8)
	})

	bean.onDrop(() => {
		bean.bop(1, 0.95)
	})

	bean.onHoverEnd(() => {
		// if (bean !== drag.getCurDragging()) {
			gameCursor().default()
		// }
	})

	bean.onUpdate(() => {
		const angle = bean.bounceMov.x == 0 ? 0 : bean.bounceMov.angle()
		bean.angle = lerp(bean.angle, bean.bounceMov.angle(), 0.7)
	})

	bean.onCollide("bounceableBean", (collidedBean: ReturnType<typeof createBounceable>) => {
		collidedBean.bounceMov = collidedBean.bounceMov.add(bean.bounceMov)
		
		let arr = [bean, collidedBean]
		let sortedByBounceMov = arr.sort(({bounceMov:a}, {bounceMov:b}) => (b.x + b.y)-(a.x + b.y));
		
		// second has lowest
		sortedByBounceMov[1].bounceMov = sortedByBounceMov[1].bounceMov.add(sortedByBounceMov[0].bounceMov.scale(0.8))
		sortedByBounceMov[0].bounceMov = sortedByBounceMov[1].bounceMov.scale(-1)
		playBounceSound()
		bean.bop(1, 1.25)
	})

	return bean;
}

export function gamescene() { return scene("gamescene", () => {
	for (let i = 0; i < 5; i++) {
		createBounceable(utils.randomPos())
	}

	onKeyPress("space", () => {
		get("bounceableBean").forEach(bean => tween(bean.pos, utils.randomPos(), 0.5, (p) => bean.pos = p))
	})
})} // END OF SCENE
