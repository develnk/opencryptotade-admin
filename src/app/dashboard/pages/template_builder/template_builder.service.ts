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
import { BaseBlockLinkModel } from './model/base_block_link.model';

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

  initial: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // All List objects(Templates or Blocks or Folders or Block Builder).
  private listObjectSource: BehaviorSubject<ListObjectsModel>;
  currentListObject: Observable<ListObjectsModel>;

  // Block Builder.
  private blockBuilderSource: BehaviorSubject<BaseBlockModel>;
  currentBlockBuilderObject: Observable<BaseBlockModel>;
  isBlockBuilder: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // Blocks.
  isBlocks: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // Folder.
  private foldersSource: BehaviorSubject<FolderModel[]>;
  folders: Observable<FolderModel[]>;
  isFolderBuilder: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // Templates.
  private templatesSource: BehaviorSubject<TemplateModel>;
  currentTemplateObject: Observable<TemplateModel>;
  isTemplateBuilder: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isNewTemplateBuilder: BehaviorSubject<boolean> = new BehaviorSubject(true);
  templateIsEmpty: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private dataService: BackendService) {
    this.listObjectSource = new BehaviorSubject(TemplateBuilderService.defaultListObjects);
    this.currentListObject = this.listObjectSource.asObservable();

    this.blockBuilderSource = new BehaviorSubject(TemplateBuilderService.defaultBaseBlock);
    this.currentBlockBuilderObject = this.blockBuilderSource.asObservable();

    this.foldersSource = new BehaviorSubject<FolderModel[]>([TemplateBuilderService.defaultFolder]);
    this.folders = this.foldersSource.asObservable();

    this.templatesSource = new BehaviorSubject<TemplateModel>(TemplateBuilderService.defaultTemplate);
    this.currentTemplateObject = this.templatesSource.asObservable();
  }

  changeInitial(value: boolean) {
    this.initial.next(value);
  }

  changeBlockBuilder(value: boolean) {
    this.isBlockBuilder.next(value);
  }

  changeTemplateIsEmpty(value: boolean) {
    this.templateIsEmpty.next(value);
  }

  changeIsNewTemplateBuilder(value: boolean) {
    this.isNewTemplateBuilder.next(value);
  }

  changeIsBlocks(value: boolean) {
    this.isBlocks.next(value);
  }

  changeIsTemplateBuilder(value: boolean) {
    this.isTemplateBuilder.next(value);
  }

  changeIsFolderBuilder(value: boolean) {
    this.isFolderBuilder.next(value);
  }

  addBlockToTemplate(block: ListBaseBlockModel) {
    this.changeTemplateIsEmpty(false);
    this.changeIsNewTemplateBuilder(false);
    const template: TemplateModel = this.getCurrentTemplate();
    const lastWeight: number = template.baseBlockLinks.length + 1;
    const newTemplateBaseBlock: BaseBlockLinkModel = {
      weight: lastWeight,
      baseBlockId: block.id,
      templateId: template.id,
      editFlag: false,
    };

    this.dataService.addTemplateBuilderBaseBlock(newTemplateBaseBlock).subscribe((newBlock: BaseBlockLinkModel) => {
     template.baseBlockLinks.push(newBlock);
    });
  }

  addBlockToNewTemplate(block: ListBaseBlockModel) {
    const template: TemplateModel = this.getCurrentTemplate();
    const lastWeight: number = template.baseBlockLinks.length + 1;
    const newTemplateBaseBlock: BaseBlockLinkModel = {
      weight: lastWeight,
      templateId: template.id,
      baseBlockId: block.id,
      editFlag: false,
      html: block.html
    };
    template.baseBlockLinks.push(newTemplateBaseBlock);
    this.changeTemplateIsEmpty(false);
    this.changeIsNewTemplateBuilder(true);
  }

  getCurrentBlockBuilderObject(): BaseBlockModel {
    return this.blockBuilderSource.getValue();
  }

  changeCurrentListObject(object: ListObjectsModel) {
    this.listObjectSource.next(object);
  }

  changeCurrentBlockBuilderObject(object: BaseBlockModel) {
    this.blockBuilderSource.next(object);
  }

  getAllListFolders(): FolderModel[] {
    return this.foldersSource.getValue();
  }

  changeCurrentDefaultBlockBuilder() {
    this.changeInitial(false);
    this.changeTemplateIsEmpty(false);
    this.changeIsTemplateBuilder(false);
    this.changeIsFolderBuilder(false);
    this.changeBlockBuilder(true);
    this.blockBuilderSource.next(TemplateBuilderService.defaultBaseBlock);
  }

  changeCurrentDefaultTemplate() {
    this.templatesSource.next(TemplateBuilderService.defaultTemplate);
  }

  clearDefaultTemplate() {
    TemplateBuilderService.defaultTemplate.id = '';
    TemplateBuilderService.defaultTemplate.name = '';
    TemplateBuilderService.defaultTemplate.subject = '';
    TemplateBuilderService.defaultTemplate.folder = '';
    TemplateBuilderService.defaultTemplate.trigger = 0;
    TemplateBuilderService.defaultTemplate.baseBlockLinks = [];
  }

  createNewTemplate() {
    this.changeInitial(false);
    this.clearDefaultTemplate();
    this.changeCurrentDefaultTemplate();
    this.changeIsNewTemplateBuilder(true);
    this.changeIsTemplateBuilder(true);
    this.changeIsFolderBuilder(false);
    this.changeBlockBuilder(false);
  }

  resetInitialTemplates() {
    this.changeInitial(false);
    this.clearDefaultTemplate();
    if (this.isNewTemplateBuilder.getValue()) {
      this.changeCurrentDefaultTemplate();
    }
    this.changeBlockBuilder(false);
    this.changeIsFolderBuilder(false);
    this.changeIsTemplateBuilder(true);
  }

  resetInitialBlock() {
    this.changeInitial(false);
    this.clearDefaultTemplate();
    if (this.isNewTemplateBuilder.getValue()) {
      this.changeCurrentDefaultTemplate();
    }
    this.changeIsTemplateBuilder(true);
    this.changeIsFolderBuilder(false);
    this.changeBlockBuilder(false);
  }

  resetInitialBlockBuilder() {
    this.changeInitial(false);
    this.changeBlockBuilder(true);
    this.changeIsTemplateBuilder(false);
    this.changeIsFolderBuilder(false);
    this.changeCurrentDefaultBlockBuilder();
  }

  resetInitialFolder() {
    this.changeInitial(false);
    this.changeIsFolderBuilder(true);
    this.changeBlockBuilder(false);
    this.changeIsTemplateBuilder(false);
  }

  changeListFolders(folders: FolderModel[]) {
    this.foldersSource.next(folders);
  }

  changeCurrentTemplate(template: TemplateModel) {
    this.templatesSource.next(template);
  }

  getCurrentTemplate(): TemplateModel {
    return this.templatesSource.getValue();
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
    return this.dataService.getTemplateBuilderBaseBlocks();
  }

  updateBaseBlock(data: ListItemModel): Observable<any> {
    return this.dataService.updateTemplateBuilderBaseBlock(data);
  }

  createBaseBlock(data: ListItemModel): Observable<any> {
    return this.dataService.createTemplateBuilderBaseBlock(data);
  }

  deleteBaseBlock(data: ListItemModel): Observable<any> {
    return this.dataService.deleteTemplateBuilderBaseBlock(data);
  }

  createTemplate(data: TemplateModel): Observable<any> {
    return this.dataService.createTemplateBuilderTemplate(data);
  }

  updateTemplate(data: TemplateModel): Observable<any> {
    return this.dataService.updateTemplateBuilderTemplate(data);
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
      this.getAllFolders().subscribe((folders: FolderModel[]) => {
        this.changeListFolders(folders);
        const temp: ListObjectsModel = new ListObjectsModel();
        const folders_tmp: ListFolderModel[] = [];
        folders.map(value => {
          temp.data.push({title: value.name, object: [], count_objects: 0, expand: false});
          folders_tmp.push(new ListFolderModel(value.id, value.name));
        });
        const groupedTemplates: [] = HelpService.groupBy(templates, 'folder');
        groupedTemplates.map((group: Array<TemplateModel>) => {
          const listItemModels: ListItemModel[] = [];
          const folderId = group[0].folder;
          const folderName = folders_tmp.find(f => f.id === folderId).name;
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

  findFolderName(id: string, folders: FolderModel[]): string {
    const foundIndex = folders.findIndex(f => f.id === id);
    return foundIndex !== -1 ? folders[foundIndex].name : '';

  }

}
