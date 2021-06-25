import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from "jwt-decode";
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
  userName: string;
  decodeJwtTokwn: any;
  assigned_servers: any;
  listOfUuid = [];
  statusResponse: any;
  serverStatusList: any;
  mergedList: any;
  userUuid: any;
  managedUsersList: any;
  managedUserUuid: any;
  managedUserId: any;
  activateUserResponse: any;
  deactivateUserResponse: any;
  accountName: any;
  stopMachineResponse: any;
  stopMachineUUid: any;
  restartMachineUUid: any;
  manageListUUid: any;
  listUserList: any;
  ListUserEmailId: any;
  addUserIsAdmin: any;
  textUserEmailId: any;
  createUserResponse: any;
  editedUserEmailId: any;
  editedUserIsAdmin: any;



  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.addUserIsAdmin = false;
    this.decodeJwtTokwn = sessionStorage.getItem('jwt-token');
    this.decodeJwtTokwn = jwt_decode(this.decodeJwtTokwn);
    // console.log(this.decodeJwtTokwn);
    this.assigned_servers = this.decodeJwtTokwn.assigned_servers;

    console.log("assigned servers");
    console.log(this.assigned_servers);
    this.getUuid();

    this.userName = sessionStorage.getItem('username');
    //this.getUserDetails();



  }

  manageUsersModal(content, users) {

    this.manageUsers(users.uuid);
    this.modalService.open(content, { size: 'xl' });
    this.office = users.office_name;
    this.singleOrMultiUser = users.tallyGo_product;
    this.computerStatus = users.container_status;
    this.accountName = users.account_name;
    this.manageListUUid = users.uuid

  }

  listUSers() {

    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.listUsers, {
      "admin_useruuid": this.manageListUUid
    }, {
      headers: header1
    }).subscribe(data => {
      this.listUserList = data;
      this.listUserList = this.listUserList.body.existing_users;
      console.log('List Users');
      console.log(this.listUserList)
    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )

  }

  addUsersAPI() {
    alert(this.ListUserEmailId)
  }

  manageUsers(uuid) {
    // console.log(' manage uuid' + uuid);
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.manageUser, {
      "owneruuid": uuid
    }, {
      headers: header1
    }).subscribe(data => {
      this.managedUsersList = data;
      this.managedUsersList = this.managedUsersList.body.existing_users;
      console.log('manage users');
      console.log(this.managedUsersList)
    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )

  }
  getUuid() {
    for (let uuid of this.assigned_servers) {
      this.listOfUuid.push(uuid.uuid);
    }
    this.statusAPI();
  }

  statusAPI() {
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.computerStatus, {
      "uuid": this.listOfUuid
    }, {
      headers: header1
    }).subscribe(data => {
      this.statusResponse = data;
      this.serverStatusList = this.statusResponse.body.existing_users;
      // console.log(this.serverStatusList)
      // console.log("status");
      // console.log(this.serverStatusList);
      this.combineLists()
    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  combineLists() {
    this.mergedList = this.assigned_servers.map(listItem1 => ({
      ...listItem1,
      ...this.serverStatusList.find(listItem2 => listItem2.uuid === listItem1.uuid)
    }));
    // console.log('list');
    // console.log(this.mergedList)
  }

  // getUserDetails() {
  //   let header1 = new HttpHeaders();
  //   header1 = header1.append('Content-Type', 'application/json');

  //   this.http.post(environment.getUsers, {
  //     "user_uuid": '0366da20'
  //   }, {
  //     headers: header1
  //   }).subscribe(data => {
  //     this.userResponse = data;
  //     this.userStatuscode = this.userResponse.statusCode;
  //     this.userEncoded = this.userResponse.isBase64Encoded;
  //     this.userBody = this.userResponse.body;
  //     this.userBody = JSON.parse(this.userBody);
  //     console.log("body " + this.userBody)
  //     console.log('status code ' + this.userStatuscode);
  //     console.log('encoded ' + this.userEncoded);
  //   },
  //     (err: HttpErrorResponse) => {
  //       alert(err.message)
  //     }
  //   )
  // }



  restartComputer() {
    this.modalService.dismissAll();
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.restartComputer, {
      "user_details": [{ "unique_id": this.userUuid }]
    }, {
      headers: header1
    }).subscribe(data => {

    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  // restartLaptop(uuid: string) {

  // }

  restartMachineModal(restart_machine, uuid) {
    this.userUuid = uuid;
    this.modalService.open(restart_machine, { size: 'md' });


  }

  activateUsersModal(activateUser, managedUser) {
    this.modalService.open(activateUser, { size: 'xl' });
    this.managedUserUuid = managedUser.user_uuid;
    this.managedUserId = managedUser.email_id;
  }

  deactivateUsersModal(deactivateUser, managedUserDetails) {
    this.modalService.open(deactivateUser, { size: 'xl' });
    this.managedUserUuid = managedUserDetails.user_uuid;
    this.managedUserId = managedUserDetails.email_id;
  }

  stopMachineModal(stop_all_machine, userUUid) {
    this.modalService.open(stop_all_machine, { size: 'md' });
    this.stopMachineUUid = userUUid;
  }
  restartLaptopModal(restart_your_computer, restartUserId) {
    this.modalService.open(restart_your_computer, { size: 'md' });
    this.restartMachineUUid = restartUserId;
  }

  addUsers(add_users) {
    this.modalService.open(add_users, { size: 'md' });
    this.listUSers();
  }

  restartYourComputer() {
    this.modalService.dismissAll();
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.restartLaptop, {
      "user_details": [{ "unique_id": this.restartMachineUUid }]
    }, {
      headers: header1
    }).subscribe(data => {

    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  stopAllMachine() {
    this.modalService.dismissAll();
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.stopMachhine, {
      "user_details": [
        {
          "unique_id": this.stopMachineUUid
        }
      ]
    }, {
      headers: header1
    }).subscribe(data => {
      this.stopMachineResponse = data;


    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  activateUsers() {
    this.modalService.dismissAll();
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.activateUser, {
      "user_details": [
        {
          "unique_id": this.managedUserUuid
        }
      ]
    }, {
      headers: header1
    }).subscribe(data => {
      this.activateUserResponse = data;


    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  deactivateUsers() {
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.deactivateUser, {
      "unique_id": this.managedUserUuid
    }, {
      headers: header1
    }).subscribe(data => {
      this.deactivateUserResponse = data;


    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  stopMachine(uuid) {
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.stopMachhine, {
      "user_details": [
        {
          "unique_id": uuid
        }
      ]
    }, {
      headers: header1
    }).subscribe(data => {
      this.stopMachineResponse = data;


    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  createUsers() {
    this.modalService.dismissAll();
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');

    this.http.post(environment.addUsers, {
      "users": {
        "multi_users": {
          "multi_user_list": [
            {
              "email_id": this.textUserEmailId,
              "owner_uuid": this.manageListUUid,
              "action_type": "create",
              "is_admin": this.addUserIsAdmin
            }
          ]
        }
      }
    }, {
      headers: header1
    }).subscribe(data => {
      this.createUserResponse = data;


    },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  editUsersModal(edit_users, editedUser) {
    this.modalService.open(edit_users, { size: 'md' });
    console.log(editedUser);
    this.editedUserEmailId = edit_users.email_id;
    this.editedUserIsAdmin = edit_users.is_admin;
  }


}
