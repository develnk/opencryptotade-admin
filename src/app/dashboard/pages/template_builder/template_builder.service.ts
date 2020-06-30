import { Injectable } from '@angular/core';
import { BackendService } from '../../../@core/services/backend.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListObjectsModel } from './model/list_objects.model';
import { ListType } from './enum/list_type';
import { ListGroupModel } from './model/list_group.model';
import { BaseBlockModel } from './model/base_block.model';
import { BlockType } from './enum/block_type';
import { ListItemModel } from './model/list_item.model';
import { ListBaseBlockModel } from './model/list_base_block.model';
import { HelpService } from '../../../@core/utils/help.service';

@Injectable()
export class TemplateBuilderService {

  public static readonly defaultListObjects: ListObjectsModel = {
    type: ListType.Template,
    data: [new ListGroupModel()],
  }

  public static readonly defaultBaseBlock: BaseBlockModel = {
    id: '',
    type: BlockType.BODY,
    html: ''
  }

  listObjectSource: BehaviorSubject<ListObjectsModel>;
  currentListObject: Observable<ListObjectsModel>;
  blockBuilderSource: BehaviorSubject<BaseBlockModel>;
  currentBlockBuilderObject: Observable<BaseBlockModel>;
  initialBlockBuilderSource: BehaviorSubject<boolean>;
  initialBlockBuilder: Observable<boolean>;

  constructor(private dataService: BackendService) {
    this.listObjectSource = new BehaviorSubject(TemplateBuilderService.defaultListObjects);
    this.currentListObject = this.listObjectSource.asObservable();
    this.blockBuilderSource = new BehaviorSubject(TemplateBuilderService.defaultBaseBlock);
    this.currentBlockBuilderObject = this.blockBuilderSource.asObservable();
    this.initialBlockBuilderSource = new BehaviorSubject<boolean>(true);
    this.initialBlockBuilder = this.initialBlockBuilderSource.asObservable();
  }

  changeCurrentListObject(object: ListObjectsModel) {
    this.listObjectSource.next(object);
  }

  changeCurrentBlockBuilderObject(object: BaseBlockModel) {
    this.blockBuilderSource.next(object);
  }

  changeCurrentDefaultBlockBuilder() {
    this.blockBuilderSource.next(TemplateBuilderService.defaultBaseBlock);
  }

  changeInitialBlockBuilder(value: boolean) {
    this.initialBlockBuilderSource.next(value);
  }

  getFolders(): Observable<any> {
    return this.dataService.getAllFolders()
  }

  getBlocks(): Observable<any> {
    return this.dataService.getTemplateBuilderBlocks();
  }

  updateBlock(data: ListItemModel): Observable<any> {
    return this.dataService.updateTemplateBuilderBlock(data);
  }

  blocksSubscribe(listType: number, typeExpand?: string) {
    this.getBlocks().subscribe((value: ListBaseBlockModel[]) => {
      const temp: ListObjectsModel = new ListObjectsModel();
      temp.type = listType;
      const groupedBaseBlocks: [] = HelpService.groupBy(value, 'type');
      groupedBaseBlocks.map((group: Array<ListBaseBlockModel>) => {
        const listItemModels:ListItemModel[] = [];
        const type = group[0].type;
        const expand = typeExpand === type;
        group.map((itemObject: ListBaseBlockModel) => {
          listItemModels.push(itemObject);
        });
        temp.data.push({title: type, object: listItemModels, expand: expand});
      })
      this.changeCurrentListObject(temp);
    });
  }

}
