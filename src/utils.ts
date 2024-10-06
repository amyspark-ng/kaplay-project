import { customAudioPlay } from "./plugins/features/sound"

export class utils {
	/**
	 * This function will run only when the game is running on desktop
	 * @param action The function
	 */
	static runInDesktop(action: () => void) {
		if ('__TAURI__' in window) {
			action()
		}
	}
	
	static randomPos() {
		return vec2(rand(0, width()), rand(0, height()))
	}

	/** Scratch a song, like FNF does it lol! */
	static FNFScratch(audioPlayer: customAudioPlay) {
		const ogDetune = audioPlayer.detune
		tween(audioPlayer.volume, 0, 0.8, (p) => audioPlayer.volume = p).onEnd(() => {

		})

		tween(audioPlayer.detune, ogDetune + 300, 0.1, (p) => audioPlayer.detune = p).onEnd(() => {
			tween(audioPlayer.detune, ogDetune - 150, 0.4, (p) => audioPlayer.detune = p)
		})
	}
}