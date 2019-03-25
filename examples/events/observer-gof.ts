export interface Observer {
    update(eventName: String): void;
}

export interface Observable {
    registerObserver(o: Observer): void;

    removeObserver(o: Observer): void;

    notifyObservers(eventName: String): void;
}

export class ConcreteObserver implements Observer {
    public update(eventName: String): void {
     //   console.log(`Event [${eventName}] occurred!`);
    }
}

export class ConcreteObservable implements Observable {
    private observers: Set<Observer> = new Set();

    public notifyObservers(eventName: String): void {
        this.observers.forEach(observer => observer.update(eventName));
    }

    public registerObserver(observer: Observer): void {
        this.observers.add(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers.delete(observer);
    }
}

const observer = new ConcreteObserver();
const observable = new ConcreteObservable();

observable.registerObserver(observer);
observable.registerObserver(observer);
observable.registerObserver(observer);

observable.notifyObservers('Test event');

