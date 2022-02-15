export namespace DB {
  /**
   * User data saved in database
   *
   * @export
   * @interface UserData
   */
  export interface UserData {
    id: number;
    full_name: string;
    username: string;
    pwd: string;
    email: string;
  }
}
