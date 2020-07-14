import { Injectable } from '@angular/core';
import { BackendService } from '../../../../@core/services/backend.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListObjectsModel } from '../model/list_objects.model';
import { ListType } from '../enum/list_type';
import { ListItemModel } from '../model/list_item.model';
import { ListBaseBlockModel } from '../model/list_base_block.model';
import { HelpService } from '../../../../@core/utils/help.service';
import { FolderModel } from '../model/folder.model';
import { ListFolderModel } from '../model/list_folder.model';
import { TemplateModel } from '../model/template.model';
import { ListTemplateModel } from '../model/list_template.model';
import { BaseBlockLinkModel } from '../model/base_block_link.model';
import { ListObjectsService } from './list_objects.service';
import { FolderService } from './folder.service';
import { BlockBuilderService } from './block_builder.service';
import { TemplateService } from './template.service';

@Injectable()
export class TemplateBuilderService {

  initial: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private dataService: BackendService,
              private listObjectsService: ListObjectsService,
              private folderService: FolderService,
              private baseBlockService: BlockBuilderService,
              private templateService: TemplateService) {}

  changeInitial(value: boolean) {
    this.initial.next(value);
  }

  addBlockToTemplate(block: ListBaseBlockModel) {
    this.templateService.changeTemplateIsEmpty(false);
    this.templateService.changeIsNewTemplateBuilder(false);
    const template: TemplateModel = this.templateService.getCurrentTemplate();
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
    const template: TemplateModel = this.templateService.getCurrentTemplate();
    const lastWeight: number = template.baseBlockLinks.length + 1;
    const newTemplateBaseBlock: BaseBlockLinkModel = {
      weight: lastWeight,
      templateId: template.id,
      baseBlockId: block.id,
      editFlag: false,
      html: block.html
    };
    template.baseBlockLinks.push(newTemplateBaseBlock);
    this.templateService.changeTemplateIsEmpty(false);
    this.templateService.changeIsNewTemplateBuilder(true);
  }

  changeCurrentDefaultBlockBuilder() {
    this.changeInitial(false);
    this.templateService.changeTemplateIsEmpty(false);
    this.templateService.changeIsTemplateBuilder(false);
    this.folderService.changeIsFolderBuilder(false);
    this.baseBlockService.changeBlockBuilder(true);
    this.baseBlockService.setDefaultBlockBuilder();
  }

  createNewTemplate() {
    this.changeInitial(false);
    this.templateService.clearDefaultTemplate();
    this.templateService.changeCurrentDefaultTemplate();
    this.templateService.changeIsNewTemplateBuilder(true);
    this.templateService.changeIsTemplateBuilder(true);
    this.folderService.changeIsFolderBuilder(false);
    this.baseBlockService.changeBlockBuilder(false);
  }

  resetInitialTemplates() {
    this.changeInitial(false);
    this.templateService.clearDefaultTemplate();
    if (this.templateService.isNewTemplateBuilder.getValue()) {
      this.templateService.changeCurrentDefaultTemplate();
    }
    this.baseBlockService.changeBlockBuilder(false);
    this.folderService.changeIsFolderBuilder(false);
    this.templateService.changeIsTemplateBuilder(true);
  }

  resetInitialBlock() {
    this.changeInitial(false);
    this.templateService.clearDefaultTemplate();
    if (this.templateService.isNewTemplateBuilder.getValue()) {
      this.templateService.changeCurrentDefaultTemplate();
    }
    this.templateService.changeIsTemplateBuilder(true);
    this.folderService.changeIsFolderBuilder(false);
    this.baseBlockService.changeBlockBuilder(false);
  }

  resetInitialBlockBuilder() {
    this.changeInitial(false);
    this.baseBlockService.changeBlockBuilder(true);
    this.templateService.changeIsTemplateBuilder(false);
    this.folderService.changeIsFolderBuilder(false);
    this.changeCurrentDefaultBlockBuilder();
  }

  resetInitialFolder() {
    this.changeInitial(false);
    this.folderService.changeIsFolderBuilder(true);
    this.baseBlockService.changeBlockBuilder(false);
    this.templateService.changeIsTemplateBuilder(false);
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
      this.listObjectsService.changeCurrentListObject(temp);
    });
  }

  foldersTabSubscribe() {
    this.getAllFolders().subscribe((folders: FolderModel[]) => {
      this.folderService.changeListFolders(folders);
      const listItems: ListItemModel[] = [];
      folders.map((folder: FolderModel) => {
        listItems.push(new ListFolderModel(folder.id, folder.name));
      });

      const temp: ListObjectsModel = new ListObjectsModel();
      temp.type = ListType.Folder;
      temp.data.push({title: 'Folders', object: listItems, count_objects: listItems.length, expand: false});
      this.listObjectsService.changeCurrentListObject(temp);
    });
  }

  foldersSubscribe() {
    this.getAllFolders().subscribe((folders: FolderModel[]) => {
      this.folderService.changeListFolders(folders);
    });
  }

  templatesTabSubscribe(folderExpand?: string) {
    this.getAllTemplates().subscribe((templates: TemplateModel[]) => {
      this.getAllFolders().subscribe((folders: FolderModel[]) => {
        this.folderService.changeListFolders(folders);
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
        this.listObjectsService.changeCurrentListObject(temp);
      });
    });
  }

  findFolderName(id: string, folders: FolderModel[]): string {
    const foundIndex = folders.findIndex(f => f.id === id);
    return foundIndex !== -1 ? folders[foundIndex].name : '';

  }

}
