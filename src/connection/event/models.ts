export interface Session {
  connections: Connection[];
  id: string;
  scenario: Scenario;
}

export interface Connection {
  id: string;
  name: string;
}

export interface Scenario {
  assets: any;
}

export interface Plop {
  asset: string;
  id: string;
  rotation: number;
  x: number;
  y: number;
}

export interface EventBody {
  action: string;
  payload?: ActionPayload;
}

export interface Actions {
  [action: string]: Action | undefined;
}

export type Action<TPayload extends ActionPayload = any> = (
  payload: TPayload,
  meta: ActionMeta
) => Promise<void>;

interface ActionPayload {
  [key: string]: any;
}

interface ActionMeta {
  connectionId: string;
}
