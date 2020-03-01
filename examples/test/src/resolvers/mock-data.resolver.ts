import { Resolver, sleep } from '../../../src/reactRouterAdvance';

export class MockDataResolver implements Resolver {
  message: any;
  constructor(message: any) {
    this.message = message;
  }
  async Resolve(): Promise<any> {
    await sleep(1000);
    return this.message;
  }
}
