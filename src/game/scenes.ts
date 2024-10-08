import { SceneDef } from "kaplay";
import { gamescene } from "../play/gamescene";
import { titlescene } from "../ui/titlescene";
import { focusscene } from "../ui/focusscene";

export class sceneType {
	key: string;
	sceneThing: () => void;

	constructor(key: string, sceneThing: () => void) {
		this.key = key
		this.sceneThing = sceneThing
	}
}

export let allScenes:sceneType[] = []

/**
 * 
 * @param sceneName 
 * @param extraParam 
 * @param transition 
 */
export function goScene(sceneName: sceneNameType, transition?: (newName: sceneNameType) => void | null, ...args:any) {
	if (transition != null) transition(sceneName)
	else go(sceneName, args)
}

export function setTheScenes(objectWithScenes: any) {
	for (const [key, value] of Object.entries(objectWithScenes)) {
		allScenes.push(new sceneType(key, value as () => void))
	}
}

const allGameScenes = {
	"focus": focusscene,
	"title": titlescene,
	"game": gamescene,
}

export type sceneNameType = keyof typeof allGameScenes

export function setupScenes() {
	// defines all the scenes
	setTheScenes(allGameScenes)

	allScenes.forEach(sceneType => {
		sceneType.sceneThing()
	});
}