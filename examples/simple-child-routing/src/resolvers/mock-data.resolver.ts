import { Resolver, sleep } from '../reactRouterAdvance';

export class MockDataResolver implements Resolver {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
  async Resolve(): Promise<any> {
    await sleep(1000);
    return this.message;
  }
}
