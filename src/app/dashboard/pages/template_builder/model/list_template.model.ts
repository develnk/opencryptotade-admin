import { ListItemModel } from './list_item.model';
import { BaseBlockLinkModel } from './base_block_link.model';

export class ListTemplateModel extends ListItemModel {

  name: string;
  subject: string;
  folder: string;
  trigger: number;
  baseBlockLinks: BaseBlockLinkModel[];

}
