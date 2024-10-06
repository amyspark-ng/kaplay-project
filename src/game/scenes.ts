import { gamescene } from "../play/gamescene";
import { titlescene } from "../ui/titlescene";

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
export function goScene(sceneName: sceneNameType, transition?: (newName: sceneNameType) => void, ...args:any) {
	if (transition) {
		transition(sceneName)
	}

	else {
		go(sceneName, args)
	}
}

export function defineScenes(objectWithScenes: any) {
	for (const [key, value] of Object.entries(objectWithScenes)) {
		allScenes.push(new sceneType(key, value as () => void))
	}
}

const allGameScenes = {
	"game": gamescene,
	"title": titlescene,
}

export type sceneNameType = keyof typeof allGameScenes

export function setupScenes() {
	// defines all the scenes
	defineScenes(allGameScenes)

	allScenes.forEach(sceneType => {
		sceneType.sceneThing()
	});
}