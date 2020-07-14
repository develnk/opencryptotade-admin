import { Injectable } from '@angular/core';
import { ListObjectsModel } from '../model/list_objects.model';
import { ListType } from '../enum/list_type';
import { ListGroupModel } from '../model/list_group.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ListObjectsService {

  public static readonly defaultListObjects: ListObjectsModel = {
    type: ListType.Template,
    data: [new ListGroupModel()],
  };

  // All List objects(Templates or Blocks or Folders or Block Builder).
  private listObjectSource: BehaviorSubject<ListObjectsModel>;
  private _currentListObject: Observable<ListObjectsModel>;

  constructor() {
    this.listObjectSource = new BehaviorSubject(ListObjectsService.defaultListObjects);
    this._currentListObject = this.listObjectSource.asObservable();
  }

  get currentListObject(): Observable<ListObjectsModel> {
    return this._currentListObject;
  }

  set currentListObject(value: Observable<ListObjectsModel>) {
    this._currentListObject = value;
  }

  changeCurrentListObject(object: ListObjectsModel) {
    this.listObjectSource.next(object);
  }

}
