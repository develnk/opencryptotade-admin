import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { LocalDataSource } from '../../../@core/ng2-smart-table';

@Injectable()
export class DepartmentService {

    public static readonly defaultUser: User = {
        id: 0,
        login: '',
        email: '',
        role: [],
        password: ''
    };

    private _source: LocalDataSource;
    private userSource: BehaviorSubject<User>;
    private _createUser: boolean;
    currentUser: Observable<User>;

    constructor() {
        this._source = new LocalDataSource();
        this.userSource = new BehaviorSubject(DepartmentService.defaultUser);
        this.currentUser = this.userSource.asObservable();
        this.createUser = false;
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

    get createUser(): boolean {
        return this._createUser;
    }

    set createUser(value: boolean) {
        this._createUser = value;
    }

}
