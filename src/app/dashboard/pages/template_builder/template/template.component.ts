import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs/internal/Subscription';
import { BlockType } from '../enum/block_type';
import { TemplateBuilderService } from '../services/template_builder.service';
import { BaseBlockModel } from '../model/base_block.model';
import { ListBaseBlockModel } from '../model/list_base_block.model';
import { ListItemModel } from '../model/list_item.model';
import { ListType } from '../enum/list_type';
import { TemplateModel } from '../model/template.model';
import { FolderModel } from '../model/folder.model';
import { TriggerModel } from '../model/trigger.model';
import { TemplateEditBlockModel } from '../model/template_edit_block.model';
import { BaseBlockLinkModel } from '../model/base_block_link.model';
import { TemplateBuilderComponent } from '../template_builder.component';
import { FolderService } from '../services/folder.service';
import { BlockBuilderService } from '../services/block_builder.service';
import { TemplateService } from '../services/template.service';
import { NotificationService } from '../../../../@core/services/notification.service';
import { NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {

  isInitial = true;
  isBlockBuilder = false;
  blockBuilderIsEmpty = true;
  newBlockBuilder = true;
  isTemplateBuilder = false;
  newTemplateBuilder = true;
  isFolderBuilder = false;
  templateIsEmpty = true;
  loading = false;
  baseBlockObject: BaseBlockModel;
  blockEditing: TemplateEditBlockModel[] = [];
  blockContent = '';
  selectedBlockType = BlockType.BODY.toString();
  template: TemplateModel;
  allFolders: FolderModel[] = [];
  allTriggers: TriggerModel[] = [];
  subscriptions: Subscription[] = [];

  constructor(private templateBuilderService: TemplateBuilderService,
              private folderService: FolderService,
              private baseBlockService: BlockBuilderService,
              private templateService: TemplateService,
              private mainTemplateBuilderComponent: TemplateBuilderComponent,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    const subscription1$: Subscription = this.templateBuilderService.initial.subscribe((value: boolean) => {
      this.isInitial = value;
    });
    this.subscriptions.push(subscription1$);

    const subscription2$: Subscription = this.templateService.isTemplateBuilder.subscribe((value: boolean) => {
      this.isTemplateBuilder = value;
    });
    this.subscriptions.push(subscription2$);

    const subscription3$: Subscription = this.baseBlockService.isBlockBuilder.subscribe((value: boolean) => {
      this.isBlockBuilder = value;
    });
    this.subscriptions.push(subscription3$);

    const subscription4$: Subscription = this.templateService.templateIsEmpty.subscribe((value: boolean) => {
      this.templateIsEmpty = value;
    });
    this.subscriptions.push(subscription4$);

    const subscription5$: Subscription = this.folderService.isFolderBuilder.subscribe((value: boolean) => {
      this.isFolderBuilder = value;
    });
    this.subscriptions.push(subscription5$);

    const subscription6$: Subscription = this.baseBlockService.currentBlockBuilderObject.subscribe(
      (currentBlockBuilder: BaseBlockModel) => {
        this.newBlockBuilder = currentBlockBuilder.id === '';
        this.blockBuilderIsEmpty = currentBlockBuilder.html === '';
        this.baseBlockObject = currentBlockBuilder;
        this.blockContent = currentBlockBuilder.html;
        this.selectedBlockType = currentBlockBuilder.type.toString();
      });
    this.subscriptions.push(subscription6$);

    const subscription7$: Subscription = this.templateService.currentTemplateObject.subscribe((template: TemplateModel) => {
      this.newTemplateBuilder = template.id === '';
      if (template.id !== '') {
        this.templateBuilderService.changeInitial(false);
        this.templateService.changeIsNewTemplateBuilder(false);
        this.folderService.changeIsFolderBuilder(false);
        this.baseBlockService.changeBlockBuilder(false);
        this.templateService.changeTemplateIsEmpty(false);
        this.templateService.changeIsTemplateBuilder(true);
      }

      this.template = template;
    });
    this.subscriptions.push(subscription7$);

    const subscription8$: Subscription = this.templateBuilderService.getAllTriggers().subscribe((triggers: TriggerModel[]) => {
      this.allTriggers = triggers;
    });
    this.subscriptions.push(subscription8$);

    const subscription9$: Subscription = this.folderService.folders.subscribe((folders: FolderModel[]) => {
      this.allFolders = folders;
    });
    this.subscriptions.push(subscription9$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  changeBlockType(value) {
    this.selectedBlockType = value;
  }

  newBlockHtmlChange($event) {
    this.blockBuilderIsEmpty = $event === '';
  }

  resetBaseBlock() {
    this.templateBuilderService.changeCurrentDefaultBlockBuilder();
  }

  updateBaseBlock() {
    if (this.baseBlockObject.id !== '') {
      this.loading = true;
      const data: ListItemModel = new ListBaseBlockModel(
        this.baseBlockObject.id,
        BlockType[this.selectedBlockType],
        this.blockContent
      );
      this.baseBlockService.updateBaseBlock(data).subscribe(
        (result: ListBaseBlockModel) => {
          this.templateBuilderService.blocksSubscribe(ListType.BlockBuilder, BlockType[this.selectedBlockType]);
          this.notificationService.showNotification(NotificationType.Success, 'Base block', 'Updated');
        },
        error => {
          this.loading = false;
          this.notificationService.showNotification(NotificationType.Error, 'Base block update', 'Error: ' + error);
        },
        () => {
          this.loading = false;
        });
    }
    // @TODO Show information about cannot update empty Base Block.
  }

  createBaseBlock() {
    this.loading = true;
    const data: ListItemModel = new ListBaseBlockModel(
      this.baseBlockObject.id,
      BlockType[this.selectedBlockType],
      this.blockContent
    );

    this.baseBlockService.createBaseBlock(data).subscribe(
      (result: ListBaseBlockModel) => {
        this.templateBuilderService.blocksSubscribe(ListType.BlockBuilder, BlockType[this.selectedBlockType]);
        this.notificationService.showNotification(NotificationType.Success, 'Base block', 'Created');
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification(NotificationType.Error, 'Base block create',  'Error: ' + error);
      },
      () => {
        this.loading = false;
      });

  }

  deleteBaseBlock() {
    this.loading = true;
    this.baseBlockService.deleteBaseBlock(this.baseBlockObject).subscribe(
      result => {
        this.templateBuilderService.changeCurrentDefaultBlockBuilder();
        this.templateBuilderService.blocksSubscribe(ListType.BlockBuilder, BlockType[this.selectedBlockType]);
        this.notificationService.showNotification(NotificationType.Success, 'Base block',  'Deleted');
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification(NotificationType.Error, 'Base block delete',  'Error: ' + error);
      },
      () => {
        this.loading = false;
      });
  }

  updateTrigger(value) {
    this.template.trigger = value;
  }

  updateFolder(value) {
    this.template.folder = value;
  }

  editTemplateBlock(block: BaseBlockLinkModel) {
    const foundBlockStatus =  this.findBlockEditingElement(block.id);
    if (foundBlockStatus === undefined) {
      this.blockEditing.push(new TemplateEditBlockModel(block.id, true));
    }
    else {
      foundBlockStatus.status = true;
    }
  }

  deleteTemplateBlock(block: BaseBlockLinkModel) {
    const foundBlockIndex: number = this.template.baseBlockLinks.findIndex(b => b.id === block.id);
    this.template.baseBlockLinks.splice(foundBlockIndex, 1);
  }

  applyTemplateBlock(block: BaseBlockLinkModel) {
    this.findBlockEditingElement(block.id).status = false;
    const foundBlock = this.template.baseBlockLinks.find( b => b.id === block.id);
    foundBlock.editFlag = !foundBlock.editFlag ? true : foundBlock.editFlag;
  }

  isTemplateBlockEdit(blockId: string) {
    const foundBlockStatus =  this.findBlockEditingElement(blockId);
    return foundBlockStatus === undefined ? false : foundBlockStatus.status;
  }

  private findBlockEditingElement(blockId: string) {
    return this.blockEditing.find(b => b.id === blockId);
  }

  drop(event: CdkDragDrop<BaseBlockLinkModel[]>) {
    moveItemInArray(this.template.baseBlockLinks, event.previousIndex, event.currentIndex);
    this.template.baseBlockLinks.forEach((value, index) => {
      value.weight = index;
    });
  }

  updateTemplate() {
    this.loading = true;
    this.templateBuilderService.updateTemplate(this.template).subscribe(
      (result: TemplateModel) => {
        this.notificationService.showNotification(NotificationType.Success, 'Template',  'Updated');
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification(NotificationType.Error, 'Template update',  'Error: ' + error);
      },
      () => {
        this.loading = false;
      });
  }

  createTemplate() {
    this.loading = true;
    this.templateBuilderService.createTemplate(this.template).subscribe(
      (result: TemplateModel) => {
        const folderName: string = this.templateBuilderService.findFolderName(result.folder, this.allFolders);
        this.templateBuilderService.templatesTabSubscribe(folderName);
        this.mainTemplateBuilderComponent.selectedItemMenu = this.mainTemplateBuilderComponent.menuList[0];
        this.notificationService.showNotification(NotificationType.Success, 'Template',  'Created');
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification(NotificationType.Error, 'Template create',  'Error: ' + error);
      },
      () => {
        this.loading = false;
      });
  }

  copyNewTemplate() {
    this.template.id = '';
    this.templateService.changeIsNewTemplateBuilder(false);
    this.templateService.changeCurrentTemplate(this.template);
  }

}
