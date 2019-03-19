import { Observer, ConcreteObservable }  from './observer-gof';

const getObserMock = () => {
    const Mock = jest.fn<Observer, any>(() => ({
        update: jest.fn(),
    }));

    return new Mock();
};

test('Can register and notify observers', () => {
    const observer = getObserMock();
    const message = 'some message';

    const observable = new ConcreteObservable();
    observable.registerObserver(observer);

    observable.notifyObservers(message);

    expect(observer.update).toBeCalledWith(message);
});

test('Should not notify observers after removing', () => {
    const observer = getObserMock();
    const message = 'some message';

    const observable = new ConcreteObservable();
    observable.registerObserver(observer);
    observable.removeObserver(observer);

    observable.notifyObservers(message);

    expect(observer.update).toBeCalledTimes(0);
});
