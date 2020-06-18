import { ListItemModel } from './list_item.model';

export class ListBaseBlockModel extends ListItemModel {

  type: string;
  html: string;

  constructor(id: string, type: string, html: string) {
    super(id);
    this.type = type;
    this.html = html;
  }

}
