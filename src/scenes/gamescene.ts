import { AreaComp, KEventController, PosComp, RotateComp, Vec2 } from "kaplay"
import { dragComp, dragger } from "../plugins/drag.ts"
import { positionSetter } from "../plugins/positionsetter.ts"

type thisBounceableObjectType = AreaComp & dragComp & PosComp & RotateComp

export function bounceableObject() {
	let mouseReleaseEvent:KEventController = null;
	
	return {
		id: "bounceableObject",
		// require: "dragger",
		
		movement: vec2(0),

		add(this:thisBounceableObjectType & { movement:Vec2 }) {
			this.onClick(() => {
				this.pick()
			})

			mouseReleaseEvent = onMouseRelease(() => {
				if (this.dragging == true) {
					this.movement = mouseDeltaPos()
					this.drop()
				}
			})
		},

		update(this:thisBounceableObjectType & { movement:Vec2 }) {
			this.pos = this.pos.add(this.movement)

			// make it so it slows down over time
			this.movement = this.movement.add(-this.movement.x * 0.1, -this.movement.y * 0.1)

			if (this.pos.x > width() || this.pos.x < 0) {
				this.movement.x *= -1
			}
			
			if (this.pos.y > height() || this.pos.y < 0) {
				this.movement.y *= -1
			}
		
			this.angle = this.movement.angle()
		},

		destroy() {
			mouseReleaseEvent.cancel()
		}
	}
}

export const gamescene = () => scene("gamescene", () => {
	add([
		sprite("bean"),
		pos(),
		area(),
		dragger(false, false, false),
		rotate(0),
		bounceableObject(),
		layer("background"),
	])
}) 
