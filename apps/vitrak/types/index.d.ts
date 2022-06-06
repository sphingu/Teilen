// declare global {
//   namespace Express {
//     interface User {
//       id: string
//       email: string
//     }
//   }
// }
interface User {
  id: string
  email: string
}

declare namespace Express {
  export interface Request {
    tenant?: string
    user?: User
  }
}
