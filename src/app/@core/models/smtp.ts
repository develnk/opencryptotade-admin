export interface Smtp {
  hostName: string;
  port: number;
  from: string;
  userName: string;
  password?: string;
  ssl: boolean;
  tls: boolean;
  debug: boolean;
}
