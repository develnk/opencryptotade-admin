import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListType } from '../enum/list_type';
import { ListFolderModel } from '../model/list_folder.model';
import { ListObjectsModel } from '../model/list_objects.model';
import { TemplateBuilderService } from '../services/template_builder.service';
import { BackendService } from '../../../../@core/services/backend.service';
import { FolderModel } from '../model/folder.model';
import { ListBaseBlockModel } from '../model/list_base_block.model';
import { BaseBlockModel } from '../model/base_block.model';
import { BlockType } from '../enum/block_type';
import { ListTemplateModel } from '../model/list_template.model';
import { ListObjectsService } from '../services/list_objects.service';
import { BlockBuilderService } from '../services/block_builder.service';
import { TemplateService } from '../services/template.service';
import { FolderService } from '../services/folder.service';
import { NotificationService } from '../../../../@core/services/notification.service';
import { NotificationType } from 'angular2-notifications';


@Component({
  selector: 'app-list-objects',
  templateUrl: './list_objects.component.html',
  styleUrls: ['./list_objects.component.scss']
})
export class ListObjectsComponent implements OnInit {

  listObjects: ListObjectsModel;
  isTemplate = false;
  isBlock = false;
  isBlockBuilder = false;
  isFolder = false;
  accordionExpanded = false;
  accordionDisabled = false;
  loading = false;
  folders: ListFolderModel[];
  allFolders: FolderModel[] = [];
  folderInput: FormControl;
  showAddFolder: boolean;
  showEditFolder: boolean;
  showCancelFolder: boolean;
  currentFolderEdit: ListFolderModel;

  constructor(private templateBuilderService: TemplateBuilderService,
              private dataService: BackendService,
              private listObjectsService: ListObjectsService,
              private blockBuilderService: BlockBuilderService,
              private folderService: FolderService,
              private templateService: TemplateService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.folderInput = new FormControl('');
    this.showAddFolder = true;
    this.showEditFolder = false;
    this.showCancelFolder = false;
    this.currentFolderEdit = null;
    this.listObjectsService.currentListObject.subscribe( currentListObject => {
      this.listObjects = currentListObject;
      this.listObjectsChanges();
    });

    this.folderService.folders.subscribe((folders: FolderModel[]) => {
      this.allFolders = folders;
    });
  }

  listObjectsChanges(): void {
    switch (this.listObjects.type) {
      case ListType.Block:
        this.printBlocks();
        break;

      case ListType.Template:
        this.printTemplates();
        break;

      case ListType.Folder:
        this.printFolders();
        break;

      case ListType.BlockBuilder:
        this.printBlockBuilder();
        break;
    }
  }

  printBlocks() {
    this.isTemplate = false;
    this.isBlock = true;
    this.isFolder = false;
    this.isBlockBuilder = false;
    this.accordionExpanded = false;
    this.accordionDisabled = false;
  }

  printBlockBuilder() {
    this.isTemplate = false;
    this.isBlock = false;
    this.isFolder = false;
    this.isBlockBuilder = true;
    this.accordionExpanded = false;
    this.accordionDisabled = false;
    this.templateBuilderService.changeCurrentDefaultBlockBuilder();
  }

  printTemplates() {
    this.isFolder = false;
    this.isBlockBuilder = false;
    this.isBlock = false;
    this.isTemplate = true;
  }

  printFolders() {
    this.isBlockBuilder = false;
    this.isTemplate = false;
    this.isBlock = false;
    this.isFolder = true;
    this.folders = [];
    this.listObjects.data[0].object.map((folder: ListFolderModel) => {
      this.folders.push(folder);
    });
  }

  removeFolder(folder: ListFolderModel) {
    this.loading = true;
    this.dataService.deleteFolder(folder.id).subscribe((response: string) => {
      if (response === 'true') {
        const index = this.folders.indexOf(folder);
        this.folders.splice(index, 1);
        this.notificationService.showNotification(NotificationType.Success, 'Folder', 'Deleted');
      }
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification(NotificationType.Error, 'Folder delete', 'Error: ' + error);
      },
      () => {
        this.loading = false;
      });
  }

  editSelectedFolder(folder: ListFolderModel) {
    this.folderInput.setValue(folder.name);
    this.currentFolderEdit = folder;
    this.showEditFolder = true;
    this.showCancelFolder = true;
    this.showAddFolder = false;
  }

  addFolder() {
    this.loading = true;
    const folderName = this.folderInput.value;
    this.folderService.createFolder(folderName).subscribe(
      (response: FolderModel) => {
        this.folderService.updateListFolders();
        this.currentFolderEdit = new ListFolderModel(response.id, response.name);
        this.folders.push(this.currentFolderEdit);
        this.folderInput.setValue('');
        this.notificationService.showNotification(NotificationType.Success, 'Folder', 'New folder created');
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification(NotificationType.Error, 'Folder create', 'Error: ' + error);
      },
      () => {
        this.loading = false;
      });
  }

  editFolder() {
    this.loading = true;
    const folderToUpdate = this.currentFolderEdit;
    folderToUpdate.name = this.folderInput.value;
    this.dataService.updateFolder(folderToUpdate).subscribe(
      (response: FolderModel) => {
        this.currentFolderEdit.name = response.name;
        this.notificationService.showNotification(NotificationType.Success, 'Folder', 'Folder updated');
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification(NotificationType.Error, 'Folder update', 'Error: ' + error);
      },
      () => {
        this.folderService.updateListFolders();
        this.loading = false;
      });
  }

  cancelFolder() {
    this.folderInput.setValue('');
    this.currentFolderEdit = null;
    this.showEditFolder = false;
    this.showCancelFolder = false;
    this.showAddFolder = true;
  }

  editBaseBlock(block: ListBaseBlockModel) {
    const blockModel: BaseBlockModel = this.blockBuilderService.getBlockModel(block);
    this.blockBuilderService.changeCurrentBlockBuilderObject(blockModel);
  }

  editTemplate(template: ListTemplateModel) {
    this.templateService.changeCurrentTemplate(template);
  }

  deleteTemplate(template: ListTemplateModel) {
    this.loading = true;
    this.templateService.deleteTemplate(template).subscribe(
      result => {
        const folderName: string = this.templateBuilderService.findFolderName(result.folder, this.allFolders);
        this.templateBuilderService.templatesTabSubscribe(folderName);
        this.templateService.clearDefaultTemplate();
        this.templateService.changeCurrentDefaultTemplate();
        this.notificationService.showNotification(NotificationType.Success, 'Template', 'Deleted');
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification(NotificationType.Error, 'Template delete', 'Error: ' + error);
      },
      () => {
        this.loading = false;
      });
  }

  copyBaseBlock(block: ListBaseBlockModel) {
    this.loading = true;
    const newTemplateBuilderFlag = this.templateService.isNewTemplateBuilder.getValue();
    if (this.listObjects.type === ListType.Block && !newTemplateBuilderFlag) {
      this.templateBuilderService.addBlockToTemplate(block);
    }
    else if (this.listObjects.type === ListType.Block && newTemplateBuilderFlag) {
      this.templateBuilderService.addBlockToNewTemplate(block);
    }
    else if (this.listObjects.type === ListType.BlockBuilder) {
      block.id = '';
      const blockModel: BaseBlockModel = this.blockBuilderService.getBlockModel(block);
      this.blockBuilderService.changeCurrentBlockBuilderObject(blockModel);
    }

    // Todo change this behaviour.
    setTimeout(() => this.loading = false, 500);
  }

}
