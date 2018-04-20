class Subject implements ISubject{
	public constructor() {
	}
	protected _observers:Array<IObserver> = [];
	
	addObserver(observer: IObserver){
		if(this._observers.indexOf(observer) == -1){
			this._observers.push(observer);
		}
	}
	
    removeObserver(observer: IObserver){
		let index:number = this._observers.indexOf(observer);
		if(index > -1){
			this._observers.splice(index,1);
		}
	}

    sendNotification(cmd:number,data?:any){
		for(let ob of this._observers){
			ob.update(cmd,data);
		}
	}
}