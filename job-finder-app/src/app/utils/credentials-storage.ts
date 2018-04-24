import {Injectable} from '@angular/core';

@Injectable()
export class CredentialsStorage {
    private userInfoKey = 'userInfo';

    getUserInfo() {
        return JSON.parse(localStorage.getItem(this.userInfoKey));
    }

    setUserInfo(userInfo: any) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));       
    }

    removeUserInfo() {
        localStorage.removeItem(this.userInfoKey);
    }
}