import type { API } from "@chxru/types";

interface RequestForm {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  obj?: { [key: string]: any };
}

const ApiRequest = async <T,>({
  path,
  method,
  obj,
}: RequestForm): Promise<API.Response<T>> => {
  try {
    // setup headers
    const headers = new Headers({});
    headers.append("Content-Type", "application/json;charset=utf-8");

    // sending request
    const response = await fetch(`/api/${path}`, {
      method,
      headers,
      body: JSON.stringify(obj),
      credentials: "same-origin",
    });

    if (response.ok) {
      try {
        const { data }: API.Response<T> = await response.json();
        return { data };
      } catch (error) {
        // request is success, but data field is empty
        return { data: undefined };
      }
    }

    // Error handling
    // 400 status code dedicated to schema validation errors
    if (response.status === 400) {
      try {
        const { err }: API.Response = await response.json();

        // validation errors are coming as a comma separated string
        // TODO: improve UI/UX to show multiple errors instead one long string
        return { err };
      } catch (error) {
        // schema validation error but response do not have
        // valid json body
        if (error instanceof Error) {
          console.error("Error occurred: schema_val, " + error.message);
        } else {
          console.error("Error occurred: schema_val, " + error);
        }
        return { err: "Validation error, please check inputs again" };
      }
    }

    try {
      // check response has a valid json body
      const { err }: API.Response = await response.json();

      console.error("Error occurred: backend, " + err);

      return { err };
    } catch (error) {
      // no valid json body
      return { err: "Internal error occurred" };
    }
  } catch (error) {
    // error occurred in front end
    if (error instanceof Error) {
      console.error("Error occurred: unexpected, " + error.message);
    } else {
      console.error("Error occurred: unexpected, " + error);
    }

    return { err: "Unexpected error occurred, please try again" };
  }
};

export default ApiRequest;
