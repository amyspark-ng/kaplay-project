import kaplay, { KAPLAYOpt } from "kaplay"
import "kaplay/global"
import { loadEverything } from "./loader"
import { addCursor } from "./plugins/customCursor"
import { utils } from "./utils"
import { getCurrent, WebviewWindow } from "@tauri-apps/api/window"
import { GameSave } from "./gamesave"

let DEBUG = false
const VERSION = "0.0.0"

export const libraryOpts = {
	width: 1024,
	height: 576,
	canvas: document.querySelector("#kanva"),
	logMax: 1,
	debugKey: "f1",
	debug: DEBUG,
	loadingScreen: true,
	crisp: false,
	backgroundAudio: true,
	stretch: false,
	letterbox: false,
	maxFPS: 120,
} as KAPLAYOpt

export let appWindow: WebviewWindow  = null
utils.runInDesktop(() => {
	appWindow = getCurrent()
	libraryOpts.stretch = true;
	libraryOpts.letterbox = true
})

console.log(`GAME VERSION: ${VERSION}`)

const k = kaplay(libraryOpts)

loadEverything()

setCursor("none")
onLoad(() => {
	addCursor()
	go("gamescene")
})

// the top ones go below
layers([
	"background",
	"cursor",
], "cursor")

const latestSave = GameSave.getLatestSave()
GameSave.write(latestSave)