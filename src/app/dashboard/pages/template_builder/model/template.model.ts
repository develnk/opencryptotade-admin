import { BaseBlockLinkModel } from './base_block_link.model';

export class TemplateModel {

  id: string;
  name: string;
  subject: string;
  folder: string;
  trigger: number;
  baseBlockLinks: BaseBlockLinkModel[];

}
