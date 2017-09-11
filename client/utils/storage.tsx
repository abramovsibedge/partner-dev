export class storageHelper {
	storeSupport: boolean;

	constructor() {
		this.storeSupport = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
	}

	public add = (key: string, item: string): void => this.storeSupport && localStorage.setItem(key, item);

	public get = (key: string): string => { return this.storeSupport ? localStorage.getItem(key) : null; };

	public remove = (key: string): void => this.storeSupport && localStorage.removeItem(key);
}

export const loadState = () => {
    const storage = new storageHelper;
	try {
		const serializedState = storage.get('state');
		if (serializedState === null) {
			return undefined;
		}
		else  return JSON.parse(serializedState);
	}
	catch (e) {
        return undefined;
	}
}

export const saveState = (state:any) => {
    const storage = new storageHelper;
	try {
        const serializedState = JSON.stringify(state);
        console.log('state', serializedState);
        storage.add('state', serializedState);
	}
    catch (e) {
		console.log('saveState error', e);
    }
}