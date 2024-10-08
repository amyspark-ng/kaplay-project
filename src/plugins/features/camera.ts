import { EaseFunc, TweenController, Vec2 } from "kaplay"

interface cameraInt {
	zoom: Vec2;
	pos: Vec2;
	rotation: number;

	moveTo(newPos: Vec2, time?: number, easing?: EaseFunc): TweenController;
	bop(startScale: Vec2, endScale: Vec2, time?: number, easing?: EaseFunc): TweenController;
}

/** The game's camera  */
export let cam:cameraInt = null
export function setupCamera() {
	cam = {
		zoom: vec2(1),
		pos: center(),
		rotation: 0,

		/** Moves the camera to a new position */
		moveTo(newPos, time?, easing?) {
			time = time ?? 1
			easing = easing ?? easings.easeOutExpo
			return tween(cam.pos, newPos, time, (p) => cam.pos = p, easing)
		},

		/** Bops the camera using the zoom */
		bop(startScale:Vec2, endScale: Vec2, time?:number, easing?:EaseFunc) {
			time = time ?? 0.5
			easing = easing ?? easings.easeOutQuad
			return tween(startScale, endScale, time, (p) => cam.zoom = p, easing)
		},
	}

	const camManager = add([
		stay(),
		{
			update() {
				camPos(cam.pos);
				camScale(cam.zoom);
				camRot(cam.rotation);
			}
		}
	])
}