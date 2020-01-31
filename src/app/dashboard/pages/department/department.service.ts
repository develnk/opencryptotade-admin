import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { LocalDataSource } from '../../../@core/ng2-smart-table';

@Injectable()
export class DepartmentService {

    private _source: LocalDataSource;
    private userSource: BehaviorSubject<User>;
    currentUser: any;

    constructor() {
        const defaultUser: User = {
            id: 0,
            login: '',
            firstName: '',
            lastName: '',
            email: '',
            note: '',
            role: [''],
            created: ''
        };
        this._source = new LocalDataSource();
        this.userSource = new BehaviorSubject(defaultUser);
        this.currentUser = this.userSource.asObservable();
    }

    changeCurrentUser(user: User) {
        this.userSource.next(user);
    }

    get source(): LocalDataSource {
        return this._source;
    }

    set source(value: LocalDataSource) {
        this._source = value;
    }

}
