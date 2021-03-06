export interface Session {
  connections: string[];
  id: string;
  scenario: Scenario;
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
) => void;

interface ActionPayload {
  [key: string]: any;
}

interface ActionMeta {
  connectionId: string;
}
