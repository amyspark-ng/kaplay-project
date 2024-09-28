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
}