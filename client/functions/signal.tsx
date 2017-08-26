class Signal {
	static signals: any = {};

	index: number;
	subscribers: any;

	constructor(name: string) {
		this.index       = 0;
		this.subscribers = {};

		Signal.signals[name] = this;

		return this;
	}

	static attach(name: string, callback: any) {
		Signal.signals[name].index ++;
		Signal.signals[name].subscribers[Signal.signals[name].index] = callback;
		return Signal.signals[name].index;
	}

	static detach(name: string, id: number) {
		if(Signal.signals[name].subscribers[id]) {
			delete Signal.signals[name].subscribers[id];
		}
	}

	static dispatch(name: string, params: any) {
		for(let k in Signal.signals[name].subscribers) {
			Signal.signals[name].subscribers[k](params);
		}
	}
}

export default Signal;