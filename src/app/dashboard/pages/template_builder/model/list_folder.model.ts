import { ListItemModel } from './list_item.model';

export class ListFolderModel extends ListItemModel {

  name: string;

  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }

}
