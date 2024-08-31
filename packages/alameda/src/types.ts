export type DefineFunction =
  | ((dependencies: string[], factory: (...args: any[]) => any) => void)
  | ((
      name: string,
      dependencies: string[],
      factory: (...args: any[]) => any
    ) => void)
  | ((name: string, factory: any) => void);

export type RequireFunction = <T extends any[] = any[]>(
  dependencies: string | string[] | null | undefined,
  callback?: (...args: T) => void,
  errback?: (error: Error) => void
) => Promise<T>;

export type Handlers = {
  require: (name: string) => any;
  exports: (name: string) => any;
  module: (name: string, url: string) => any;
} & Record<string, any>;

export type Require = RequireFunction & {
  isBrowser: boolean;
  nameToUrl: (moduleName: string, ext?: string, skipExt?: boolean) => string;
  toUrl: (moduleNamePlusExt: string) => string;
  defined(id: string): boolean;
  specified(id: string): boolean;
  exec(text: string): any;
  onError(err: Error): void;

  contexts?: Record<string, Context>;

  // config: Config;
  config: (config: Partial<Config>) => Require;

  onResourceLoad?: (context: Context, map: any, deps: any) => any;
  execCb: (name: string, factory: any, values: any, defined: any) => any;
};

export type Context = {
  id: string;
  defined: Record<string, any>;
  waiting: Record<string, any[]>;
  config: Config;
  deferreds: Record<string, Defer>;
  req: Require;
  execCb: (name: string, factory: any, values: any, defined: any) => any;
};

export type Load = ((value: any) => void) & {
  error: (err: Error) => void;
  fromText: (text: string, textAlt?: string) => void;
};

export type DepMap = {
  id: string;
  n: string;
  url: string;
  pr?: string;
  prn?: boolean;
};

export type Defer = {
  resolve: (value: any) => void;
  reject: (error: Error) => void;

  finished?: boolean;
  rejected?: boolean;

  promise: Promise<any>;
  map: DepMap;
  depCount: number;
  depMax: number;

  values: any[];
  depDefined: any[];
  depFinished: (value: any, i: number) => any;

  deps?: DepMap[];

  factory?: (p: any, val: any) => any;
  factoryCalled?: boolean;

  depending?: boolean;

  usingExports?: boolean;

  cjsModule?: any;
};

export interface Config {
  context?: string;

  waitSeconds: number;
  baseUrl: string;
  paths: Record<string, string>;
  bundles: Record<string, string>;

  pkgs: Record<string, string>;
  packages?: any[];

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

export interface Plugin {
  load: (n: any, require: Require, load: Load, config: Config) => any;
}

export class AlamedaError extends Error {
  dynaId?: string;
  requireModules?: string[];
  requireType?: string;
}
