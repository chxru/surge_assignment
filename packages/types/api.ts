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
     * User login form data
     *
     * @export
     * @interface LoginForm
     */
    export interface LoginForm {
      username: string;
      pwd: string;
    }
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
      user: PublicUserData;
    }
  }

  export namespace User {
    /**
     * Form data used for change password request
     *
     * @export
     * @interface ChangePasswordForm
     */
    export interface ChangePasswordForm {
      old_pwd: string;
      new_pwd: string;
    }

    /**
     * For data used for changing user data
     *
     * @export
     * @interface EditInfoForm
     */
    export interface EditInfoForm {
      username: string;
      email: string;
      full_name: string;
    }
  }
}
