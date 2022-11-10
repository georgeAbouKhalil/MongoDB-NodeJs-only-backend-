import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private notification = new Notyf({ duration: 4000, position: { x: "left", y: "top" } });

  public success(message: string): void {
      this.notification.success(message);
  }

  public error(err: any): void {
      const message = this.getErrorMessage(err);
      this.notification.error(message);
  }

  private getErrorMessage(err: any) : string{

    console.log(err)
      // Frontend exception throwing a string, e.g: throw "...":
      if (typeof err === "string") {
          return err;
      }

      // http receives a string error, e.g: 401, 403, 404, 500:
      if (typeof err.error === "string") {
          return err.error; // httpClient string error
      }

      // http receives an array of errors, e.g: 400:
      if (Array.isArray(err.error)) {
          return err.error[0]; //httpClient array errors
      }

      // Frontend exception throwing one of the Error types, e.g: throw new Error("..."), throw new RangeError("...") etc.
      // Note: must be last cause previous one also can also contain a message:
      if (typeof err.message === "string") {
          return err.message;
      }

      // Any other error format: 
      return "Some error occurred, please try again.";
  }
}
