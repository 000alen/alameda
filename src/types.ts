export interface Config {
  waitSeconds: number;
  baseUrl: string;
  paths: Record<string, string>;
  bundles: Record<string, string>;
  pkgs: Record<string, string>;
  shim: Record<string, any>;
  config: Record<string, any>;

  map?: Record<string, any>;

  nodeIdCompat?: boolean;

  urlArgs?: (moduleName: string, url: string) => string;

  scriptType?: string;

  onNodeCreated?: (
    script: HTMLScriptElement,
    config: Config,
    id: string,
    url: string
  ) => void;

  defaultErrback?: (err: Error) => void;

  skipDataMain?: boolean;
}

export type Handlers = {
  require: (name: string) => any;
  exports: (name: string) => any;
  module: (name: string, url: string) => any;
} & Record<string, any>;

export type Req = CallableFunction & {
  isBrowser: boolean;
  nameToUrl: (moduleName: string, ext: string, skipExt: boolean) => string;
  toUrl: (moduleNamePlusExt: string) => string;
  defined(id: string): boolean;
  specified(id: string): boolean;
  exec(text: string): any;
  onError(err: Error): void;
  config: Config;
};

export type TopReq = Req & {
  contexts: Record<string, Req>;
  config: (config: Partial<Config>) => void;
};
