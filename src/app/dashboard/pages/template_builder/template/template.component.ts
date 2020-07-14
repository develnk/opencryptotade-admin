import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

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

  constructor(private templateBuilderService: TemplateBuilderService,
              private folderService: FolderService,
              private baseBlockService: BlockBuilderService,
              private templateService: TemplateService,
              private mainTemplateBuilderComponent: TemplateBuilderComponent,
              private notificationsService: NotificationsService) {
    templateBuilderService.initial.subscribe((value: boolean) => {
      this.isInitial = value;
    });

    templateService.isTemplateBuilder.subscribe((value: boolean) => {
      this.isTemplateBuilder = value;
    });

    baseBlockService.isBlockBuilder.subscribe((value: boolean) => {
      this.isBlockBuilder = value;
    });

    templateService.templateIsEmpty.subscribe((value: boolean) => {
      this.templateIsEmpty = value;
    });

    folderService.isFolderBuilder.subscribe((value: boolean) => {
      this.isFolderBuilder = value;
    });
  }

  ngOnInit(): void {
    this.baseBlockService.currentBlockBuilderObject.subscribe((currentBlockBuilder: BaseBlockModel) => {
        this.newBlockBuilder = currentBlockBuilder.id === '';
        this.blockBuilderIsEmpty = currentBlockBuilder.html === '';
        this.baseBlockObject = currentBlockBuilder;
        this.blockContent = currentBlockBuilder.html;
        this.selectedBlockType = currentBlockBuilder.type.toString();
      });

    this.templateService.currentTemplateObject.subscribe((template: TemplateModel) => {
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

    this.templateBuilderService.getAllTriggers().subscribe((triggers: TriggerModel[]) => {
      this.allTriggers = triggers;
    });

    this.folderService.folders.subscribe((folders: FolderModel[]) => {
      this.allFolders = folders;
    });
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
          this.notificationsService.success(
            'Base block',
            'Updated'
          );
        },
        error => {
          this.loading = false;
          this.notificationsService.error(
            'Base block update',
            'Error: ' + error
          );
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
        this.notificationsService.success(
          'Base block',
          'Created'
        );
      },
      error => {
        this.loading = false;
        this.notificationsService.error(
          'Base block create',
          'Error: ' + error
        );
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
        this.notificationsService.success(
          'Base block',
          'Deleted'
        );
      },
      error => {
        this.loading = false;
        this.notificationsService.error(
          'Base block delete',
          'Error: ' + error
        );
      },
      () => {
        this.loading = false;
      });
  }

  updateTemplateTrigger(value) {
    this.template.trigger = value;
  }

  updateTemplateFolder(value) {
    this.template.folder = value;
  }

  editTemplateBlock(blockId: string) {
    const foundBlockStatus =  this.findBlockEditingElement(blockId);
    if (foundBlockStatus === undefined) {
      this.blockEditing.push(new TemplateEditBlockModel(blockId, true));
    }
    else {
      foundBlockStatus.status = true;
    }
  }

  applyTemplateBlock(blockId: string) {
    this.findBlockEditingElement(blockId).status = false;
    const block = this.template.baseBlockLinks.find( b => b.id === blockId);
    block.editFlag = !block.editFlag ? true : block.editFlag;
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
        this.notificationsService.success(
          'Template',
          'Updated'
        );
      },
      error => {
        this.loading = false;
        this.notificationsService.error(
          'Template update',
          'Error: ' + error
        );
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
        this.notificationsService.success(
          'Template',
          'Created'
        );
      },
      error => {
        this.loading = false;
        this.notificationsService.error(
          'Template create',
          'Error: ' + error
        );
      },
      () => {
        this.loading = false;
      });
  }

}
