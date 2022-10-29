import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export class Favorite {
  constructor(
    public favId: string,
    public name: string,
    public car_park_no: string
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  // getEmployees() {
  //   return this.httpClient.get<Employee[]>("http://localhost:8080/greeting");
  // }

  getFavorites() {
    return this.httpClient.get<String>("http://localhost:8080/greeting");
  }

  getGreeting(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/greeting" , { responseType: 'text' });
  }

  // public deleteEmployee(employee) {
  //   return this.httpClient.delete<Employee>(
  //     "http://localhost:8080/employees" + "/" + employee.empId
  //   );
  // }

  // public createEmployee(employee) {
  //   return this.httpClient.post<Employee>(
  //     "http://localhost:8080/employees",
  //     employee
  //   );
  // }
}
