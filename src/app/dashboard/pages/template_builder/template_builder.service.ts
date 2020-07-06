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
import { FolderModel } from './model/folder.model';
import { ListFolderModel } from './model/list_folder.model';
import { TemplateModel } from './model/template.model';
import { ListTemplateModel } from './model/list_template.model';

@Injectable()
export class TemplateBuilderService {

  public static readonly defaultListObjects: ListObjectsModel = {
    type: ListType.Template,
    data: [new ListGroupModel()],
  };

  public static readonly defaultBaseBlock: BaseBlockModel = {
    id: '',
    type: BlockType.BODY,
    html: ''
  };

  public static readonly defaultFolder: FolderModel = {
    id: '',
    name: 'Default'
  };

  public static readonly defaultTemplate: TemplateModel = {
    id: '',
    name: '',
    subject: '',
    folder: '',
    trigger: 0,
    baseBlockLinks: [],
  };

  // All List objects(Templates or Blocks or Folders).
  private listObjectSource: BehaviorSubject<ListObjectsModel>;
  currentListObject: Observable<ListObjectsModel>;

  // Block Builder.
  private blockBuilderSource: BehaviorSubject<BaseBlockModel>;
  currentBlockBuilderObject: Observable<BaseBlockModel>;
  private initialBlockBuilderSource: BehaviorSubject<boolean>;
  initialBlockBuilder: Observable<boolean>;

  // Folder.
  private foldersSource: BehaviorSubject<FolderModel[]>;
  folders: Observable<FolderModel[]>;

  // Templates.
  private templatesSource: BehaviorSubject<TemplateModel>;
  currentTemplateObject: Observable<TemplateModel>;

  constructor(private dataService: BackendService) {
    this.listObjectSource = new BehaviorSubject(TemplateBuilderService.defaultListObjects);
    this.currentListObject = this.listObjectSource.asObservable();
    this.blockBuilderSource = new BehaviorSubject(TemplateBuilderService.defaultBaseBlock);
    this.currentBlockBuilderObject = this.blockBuilderSource.asObservable();
    this.initialBlockBuilderSource = new BehaviorSubject<boolean>(true);
    this.initialBlockBuilder = this.initialBlockBuilderSource.asObservable();
    this.foldersSource = new BehaviorSubject<FolderModel[]>([TemplateBuilderService.defaultFolder]);
    this.folders = this.foldersSource.asObservable();
    this.templatesSource = new BehaviorSubject<TemplateModel>(TemplateBuilderService.defaultTemplate);
    this.currentTemplateObject = this.templatesSource.asObservable();
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

  changeListFolders(folders: FolderModel[]) {
    this.foldersSource.next(folders);
  }

  changeCurrentTemplate(template: TemplateModel) {
    this.templatesSource.next(template);
  }

  getAllFolders(): Observable<any> {
    return this.dataService.getAllFolders();
  }

  getAllTriggers(): Observable<any> {
    return this.dataService.getAllEmailTriggers();
  }

  getAllTemplates(): Observable<any> {
    return this.dataService.getAllTemplates();
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
        const listItemModels: ListItemModel[] = [];
        const type = group[0].type;
        const expand = typeExpand === type;
        group.map((itemObject: ListBaseBlockModel) => {
          listItemModels.push(itemObject);
        });
        temp.data.push({title: type, object: listItemModels, count_objects: listItemModels.length, expand: expand});
      });
      this.changeCurrentListObject(temp);
    });
  }

  foldersTabSubscribe() {
    this.getAllFolders().subscribe((folders: FolderModel[]) => {
      this.changeListFolders(folders);
      const listItems: ListItemModel[] = [];
      folders.map((folder: FolderModel) => {
        listItems.push(new ListFolderModel(folder.id, folder.name));
      });

      const temp: ListObjectsModel = new ListObjectsModel();
      temp.type = ListType.Folder;
      temp.data.push({title: 'Folders', object: listItems, count_objects: listItems.length, expand: false});
      this.changeCurrentListObject(temp);
    });
  }

  foldersSubscribe() {
    this.getAllFolders().subscribe((folders: FolderModel[]) => {
      this.changeListFolders(folders);
    });
  }

  templatesTabSubscribe(folderExpand?: string) {
    this.getAllTemplates().subscribe((templates: TemplateModel[]) => {
      this.getAllFolders().subscribe(folder => {
        const temp: ListObjectsModel = new ListObjectsModel();
        const folders: ListFolderModel[] = [];
        folder.map(value => {
          temp.data.push({title: value.name, object: [], count_objects: 0, expand: false});
          folders.push(new ListFolderModel(value.id, value.name));
        });
        const groupedTemplates: [] = HelpService.groupBy(templates, 'folder');
        groupedTemplates.map((group: Array<TemplateModel>) => {
          const listItemModels: ListItemModel[] = [];
          const folderId = group[0].folder;
          const folderName = folders.find(f => f.id === folderId).name;
          const expand = folderExpand === folderName;
          group.map((itemObject: ListTemplateModel) => {
            listItemModels.push(itemObject);
          });

          const foundIndex = temp.data.findIndex(o => o.title === folderName);
          temp.data[foundIndex] = {title: folderName, object: listItemModels, count_objects: listItemModels.length, expand: expand};
        });
        this.changeCurrentListObject(temp);
      });
    });
  }

}
