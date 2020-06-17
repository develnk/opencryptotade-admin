import {ListType} from '../enum/list_type';
import {ListGroupModel} from './list_group.model';

export class ListObjectsModel {

  type: ListType = ListType.Template;
  data: ListGroupModel[] = [];

}
