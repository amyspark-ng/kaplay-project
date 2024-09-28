import { Comp, EaseFunc, TweenController, Vec2 } from "kaplay"

type shakePanicReturnType = {
	/**
	 * Cancels the shake and returns the object to its initial position
	 */
	cancel: () => void
}

interface juiceComp extends Comp {
	/**
	 * Stretches/squishes an object, BE CAREFUL WITH ANCHORS!!
	 * @param XOrY Wheter it's horizontally (x) or vertically (y)
	 * @param originalSize The size the object originally has, the one it will return to
	 * @param howMuch How much will it stretch/squish depending on if it's greater or lesser than the original size
	 * @param theTime How much time will it take to un-stretch 
	 * @param theEasing The easing function
	 * @returns The tween, maybe you can cancel it
	 */
	stretch(XOrY:"x" | "y", originalSize:number, howMuch:number, theTime?:number, theEasing?:EaseFunc): TweenController;

	/**
	 * Bops an object (basically a shorthand for stretch on both sides, thought it was nicer)
	 * 
	 * If howMuch is lesser than originalSize it will bop inwards
	 * @param originalSize The size the object originally had in vec2
	 * @param howMuch How much bop (scale multiplier)
	 * @param theTime How long i'll take for it to go back to normal
	 * @param theEasing The easing function
	 */
	bop(originalSize:Vec2 | number, howMuch?:Vec2 | number, theTime?:number, theEasing?:EaseFunc): TweenController

	/**
	 * Shakes an object
	 * @param initialPos The position it initially was at 
	 * @param time How long will it shake for
	 * @param strength The strength of the shake (how much it will move in pixels)
	 * @param interval How long between each shake
	 */
	shakePanic(initialPos: Vec2, time?: number, strength?: number, interval?: number) : shakePanicReturnType;

	/**
	 * Will move the object from a random direction to the original one, tweaking!!
	 * @param initialPos The position it initially was at
	 * @param includeDiagonals Wheter to include diagonals or only cardinals
	 * @param strength How far will it go (it's a multiplier so something like 2 or 3 should work)
	 * @param theTime how long will it take to come back
	 * @param easeFunc The easing function
	 */
	tweak(initialPos:Vec2, includeDiagonals?:boolean, strength?:number, theTime?:number, easeFunc?:EaseFunc) : TweenController
}

/**
 * Component that gives some juice functions
 * @requires Scale, Pos, Timer
 */
export function juice() : juiceComp {
	return {
		id: "juice",
		require: [ "scale", "pos", "timer" ],

		stretch(XOrY:"x" | "y", originalSize:number, howMuch:number, theTime?:number, theEasing?:EaseFunc) {
			XOrY = XOrY ?? "y"
			theTime = theTime ?? 0.5
			theEasing = theEasing ?? easings.easeOutQuad
			
			return tween(howMuch, originalSize, theTime, (p) => this.scale[XOrY] = p, theEasing)
		},

		bop(originalSize:Vec2 | number, howMuch?:Vec2 | number, theTime?:number, theEasing?:EaseFunc) {
			
			if (typeof originalSize == "number") originalSize = vec2(originalSize)
			if (typeof howMuch == "number") howMuch = vec2(howMuch)

			theTime = theTime ?? 0.5
			theEasing = theEasing ?? easings.easeOutQuad

			return tween(howMuch, originalSize, theTime, (p) => this.scale = p, theEasing)
		},

		tweak(initialPos, includeDiagonals?, strength?, theTime?, easeFunc?) {
			includeDiagonals = includeDiagonals ?? true
			strength = strength ?? 2
			theTime = theTime ?? 0.5
			easeFunc = easeFunc ?? easings.easeOutQuint

			const directions = {
				"left": LEFT,
				"right": RIGHT,
				"top": UP,
				"bot": DOWN,
			}
		
			if (includeDiagonals == false) {
				directions["botleft"] = vec2(-1, 1)
				directions["topleft"] = vec2(-1, -1)
		
				directions["botright"] = vec2(1, 1)
				directions["botleft"] = vec2(1, -1)
			}
		
			let direction = choose(Object.values(directions))
			direction = direction.scale(strength)
			
			let newPos = vec2()
			newPos.x = initialPos.x + direction.x * strength
			newPos.y = initialPos.y + direction.y * strength
			
			return tween(newPos, initialPos, theTime, (p) => this.pos = p, easeFunc)
		},

		shakePanic(initialPos: Vec2, time?: number, strength?: number, interval?: number) : shakePanicReturnType {
			time = time ?? 1
			strength = strength ?? 10
			interval = interval ?? 0.05
			
			let shakeLoop = this.loop(interval, () => {
				const newPos = initialPos.add(rand(-strength, strength), rand(-strength, strength)) 
				this.pos = newPos
			})

			function cancelFunction() {
				shakeLoop.cancel()
				this.pos = initialPos
			}

			this.wait(time, cancelFunction)
			
			return {
				cancel: cancelFunction
			}
		}
	}
}