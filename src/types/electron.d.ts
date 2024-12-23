export interface IElectronAPI {
  send: (channel: string, data: any) => void;
  receive: (channel: string, func: Function) => void;
  removeListener: (channel: string) => void;
  auth: {
    login: (credentials: { username: string; password: string }) => Promise<any>;
    logout: () => Promise<any>;
    checkAuth: () => Promise<any>;
  };
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
