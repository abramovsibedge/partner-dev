export class storageHelper {
	storeSupport: boolean;

	constructor() {
		this.storeSupport = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
	}

	public add = (key: string, item: string): void => this.storeSupport && localStorage.setItem(key, item);

	public get = (key: string): string => { return this.storeSupport ? localStorage.getItem(key) : null; };

	public remove = (key: string): void => this.storeSupport && localStorage.removeItem(key);
}