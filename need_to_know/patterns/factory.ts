// Factoty
interface Transport {
  deliver(): string;
}

abstract class Logistics {
  public abstract factoryMethod(): Transport;
  public createTransport(): string {
    const transport = this.factoryMethod();
    return transport.deliver();
  }
}

export class RoadLogistics extends Logistics {
  public factoryMethod(): Transport {
    return new RoadLogisticsProduct();
  };
}

export class RoadLogisticsProduct implements Transport{
  public deliver(): string {
    return;
  };
}

export class SeaLogistics extends Logistics {
  public factoryMethod(): Transport {
    return new SeaLogisticsProduct();
  };
}

export class SeaLogisticsProduct implements Transport {
  public deliver(): string {
    return;
  }
}


