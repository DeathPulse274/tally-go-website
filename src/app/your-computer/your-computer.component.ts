import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styleUrls: ['./your-computer.component.scss']
})
export class YourComputerComponent implements OnInit {

  userResponse: any;
  userEncoded: boolean;
  userStatuscode: number;
  userBody: any;
  uuid: string;
  office: string;
  singleOrMultiUser: string;
  computerStatus: string;



  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  manageUsersModal(content, users) {
    this.modalService.open(content, { size: 'xl' });
    this.office = users.office;
    alert(this.office);
    this.singleOrMultiUser = users.tallyGo_product;
    this.computerStatus = users.computer_status;
  }

  getUserDetails() {
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.getUsers, {
      "user_uuid": '0366da20'
    }, {
      headers: header1
    }).subscribe(data => {
      this.userResponse = data;
      this.userStatuscode = this.userResponse.statusCode;
      this.userEncoded = this.userResponse.isBase64Encoded;
      this.userBody = this.userResponse.body;
      this.userBody = JSON.parse(this.userBody);
      console.log("body " + this.userBody)
      console.log('status code ' + this.userStatuscode);
      console.log('encoded ' + this.userEncoded);
    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  loginMockup() {
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.getUsers, {
      "user_uuid": '0366da20'
    }, {
      headers: header1
    }).subscribe(data => {

    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  restartComputer(uuid: string) {
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.restartComputer, {
      "user_details": [{ "unique_id": uuid }]
    }, {
      headers: header1
    }).subscribe(data => {

    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  restartLaptop(uuid: string) {
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.restartLaptop, {
      "user_details": [{ "unique_id": uuid }]
    }, {
      headers: header1
    }).subscribe(data => {

    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }


}
