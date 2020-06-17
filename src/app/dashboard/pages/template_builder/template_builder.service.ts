import { Injectable } from '@angular/core';
import { BackendService } from '../../../@core/services/backend.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListObjectsModel } from './model/list_objects.model';
import { ListType } from './enum/list_type';
import { ListGroupModel } from './model/list_group.model';

@Injectable()
export class TemplateBuilderService {

  public static readonly defaultListObjects: ListObjectsModel = {
    type: ListType.Template,
    data: [new ListGroupModel()],
  }

  listObjectSource: BehaviorSubject<ListObjectsModel>;
  currentListObject: Observable<ListObjectsModel>;

  constructor(private dataService: BackendService) {
    this.listObjectSource = new BehaviorSubject(TemplateBuilderService.defaultListObjects);
    this.currentListObject = this.listObjectSource.asObservable();
  }

  changeCurrentListObject(object: ListObjectsModel) {
    this.listObjectSource.next(object);
  }

  getFolders(): Observable<any> {
    return this.dataService.getAllFolders()
  }

}
