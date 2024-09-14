import {env} from "./environment";

// DEV
export const url = (path: string) =>
  `${env.server.protocol}://${env.server.host}:${env.server.port}/${env.server.contextPath}/${path}`
