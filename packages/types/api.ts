import type { DB } from "./db";

export namespace API {
  /**
   * Default response format of API
   *
   * @export
   * @interface Response
   * @template T
   */
  export interface Response<T = any> {
    err?: string;
    data?: T;
  }

  export namespace Auth {
    /**
     * New user registering request
     *
     * @export
     * @interface RegisterForm
     * @extends {Omit<DB.UserData, "id">}
     */
    export interface RegisterForm
      extends Omit<DB.UserData, "id" | "created_at"> {}

    /**
     * Users' public data
     *
     * @export
     * @interface PublicUserData
     * @extends {(Omit<DB.UserData, "pwd" | "created_at">)}
     */
    export interface PublicUserData
      extends Omit<DB.UserData, "pwd" | "created_at"> {}

    /**
     * API response after successful login or registration
     *
     * @export
     * @interface AuthResponse
     */
    export interface AuthResponse {
      access_token: string;
      user: PublicUserData;
    }
  }
}
