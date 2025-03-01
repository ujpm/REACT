declare module 'wolfram-alpha-api' {
  export default class WolframAlphaAPI {
    constructor(appId: string);
    getSimple(query: string): Promise<string>;
    getShort(query: string): Promise<string>;
    getFull(query: string): Promise<any>;
  }
}
