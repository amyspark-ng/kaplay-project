import { playSound } from "../plugins/sound.ts";
import { dragger } from "../plugins/drag.ts";
import { bounceable } from "../play/components/bounceable.ts";

export function gamescene() { return scene("gamescene", () => {
	add([
		sprite("bean"),
		pos(),
		area(),
		dragger(false, false, false),
		rotate(0),
		bounceable(),
		layer("background"),
	])
})} // END OF SCENE
