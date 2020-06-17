import { ListType } from '../enum/list_type';

export class MenuModel {
  title: string;
  type: ListType;

  constructor(title: string, type: ListType) {
    this.title = title;
    this.type = type;
  }

}
