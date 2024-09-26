class volumeProp {
	muted: boolean = false;
	volume: number = 0;
}

/**
 * Holds all the info to game save
 */
export class GameSaveClass {
	/**
	 * Player highscore
	 */
	highscore: number = 0

	sound = {
		sfx: new volumeProp(),
		music: new volumeProp(),
		volume: 0,
	}

	/**
	 * Save all the info
	 */
	write(theNewSave:GameSaveClass) {
		for (const [key, value] of Object.entries(theNewSave)) {
			this[key] = value
		}

		setData("gameSave", JSON.stringify(this))
	}

	/**
	 * Sets this class to a new instance of itself
	 */
	delete() {
		const theNewSave = new GameSaveClass()
		this.write(theNewSave)
	}

	/**
	 * Gets the latest stored save 
	 */
	getLatestSave() : GameSaveClass {
		const data = getData("gameSave") as string
		const newGameSave = new GameSaveClass()

		// figure out a way to see if data doesn't have a key that new GameSaveClass does
		Object.keys(newGameSave).forEach(function(k) {
			if (!data.hasOwnProperty(k)) data[k] = newGameSave[k];
		});

		if (data) return JSON.parse(data) as GameSaveClass
		return null
	}
}

export let GameSave = new GameSaveClass()