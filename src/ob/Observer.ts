interface IObserver {
	update(cmd:number,data:any);
}
interface ISubject{
    addObserver(observer: IObserver);
    removeObserver(observer: IObserver);
    sendNotification(cmd:number,data?:any);
}