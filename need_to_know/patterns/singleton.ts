export class Singleton {
  value: string;
  private static onlyOneInstance: Singleton;
  private constructor(param: string) {
    this.value = param;
  }

  public static getInstance(param: string): Singleton {
    if(!this.onlyOneInstance) {
      this.onlyOneInstance = new Singleton(param);
    }
    return this.onlyOneInstance;
  }

}
