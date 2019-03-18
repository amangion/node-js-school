export interface Observer {
    update(temperature, humidity, pressure): void;
}