import { gamescene } from "../play/gamescene"
import { titlescene } from "../ui/titlescene";

export class sceneType {
	key: string;
	sceneThing: () => void;

	constructor(key: string, sceneThing: () => void) {
		this.key = key
		this.sceneThing = sceneThing
	}
}

type sceneName = "game" | "title"

export const scenes = {
	"gamescene": new sceneType("gamescene", gamescene),
	"titlescene": new sceneType("titlescene", titlescene),
}

/**
 * Custom function to changing the scene
 * @param sceneName Name of the scene
 * @param extraParam for scene
 */
export function goScene(sceneName: sceneName, extraParam:any) {
	go(sceneName + "_scene")
}
