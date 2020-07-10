import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BlockType } from '../enum/block_type';
import { TemplateBuilderService } from '../template_builder.service';
import { BackendService } from '../../../../@core/services/backend.service';
import { BaseBlockModel } from '../model/base_block.model';
import { ListBaseBlockModel } from '../model/list_base_block.model';
import { ListItemModel } from '../model/list_item.model';
import { ListType } from '../enum/list_type';
import { TemplateModel } from '../model/template.model';
import { FolderModel } from '../model/folder.model';
import { TriggerModel } from '../model/trigger.model';
import { TemplateEditBlockModel } from '../model/template_edit_block.model';
import { BaseBlockLinkModel } from '../model/base_block_link.model';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  isInitial = true;
  isBlockBuilder = false;
  isTemplateBuilder = false;
  blockTemplateIsEmpty = true;
  baseBlockObject: BaseBlockModel;
  blockEditing: TemplateEditBlockModel[] = [];
  blockTemplateContent = '';
  selectedBlockType = BlockType.BODY.toString();
  template: TemplateModel;
  allFolders: FolderModel[] = [];
  allTriggers: TriggerModel[] = [];

  constructor(private templateBuilderService: TemplateBuilderService, private dataService: BackendService) {
    this.templateBuilderService.initialBlockBuilder.subscribe(value => {
      this.isInitial = value;
    });
  }

  ngOnInit(): void {
    this.templateBuilderService.currentBlockBuilderObject.subscribe((currentBlockBuilder: BaseBlockModel) => {
        if (currentBlockBuilder.id !== '') {
          this.isInitial = false;
          this.isTemplateBuilder = false;
          this.isBlockBuilder = true;
          this.blockTemplateIsEmpty = false;
        }
        else {
          this.blockTemplateIsEmpty = true;
        }

        this.baseBlockObject = currentBlockBuilder;
        this.blockTemplateContent = currentBlockBuilder.html;
        this.selectedBlockType = currentBlockBuilder.type.toString();
      });

    this.templateBuilderService.currentTemplateObject.subscribe((template: TemplateModel) => {
      if (template.id !== '') {
        this.isInitial = false;
        this.isBlockBuilder = false;
        this.blockTemplateIsEmpty = false;
        this.isTemplateBuilder = true;
      }

      this.template = template;
    });

    this.templateBuilderService.getAllTriggers().subscribe((triggers: TriggerModel[]) => {
      this.allTriggers = triggers;
    });

    this.templateBuilderService.getAllFolders().subscribe((folders: FolderModel[]) => {
      this.allFolders = folders;
    });
  }

  changeBlockType(value) {
    this.selectedBlockType = value;
  }

  resetBaseBlock() {
    this.templateBuilderService.changeCurrentDefaultBlockBuilder();
  }

  updateBaseBlock() {
    if (this.baseBlockObject.id !== '') {
      const data: ListItemModel = new ListBaseBlockModel(
        this.baseBlockObject.id,
        BlockType[this.selectedBlockType],
        this.blockTemplateContent
      );
      this.templateBuilderService.updateBlock(data).subscribe((result: ListBaseBlockModel) => {
        this.templateBuilderService.blocksSubscribe(ListType.BlockBuilder, BlockType[this.selectedBlockType]);
      });
    }
    // @TODO Show information about cannot update empty Base Block.
  }

  public resetInitial() {
    this.templateBuilderService.changeInitialBlockBuilder(true);
    this.isBlockBuilder = false;
    this.blockTemplateIsEmpty = true;
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
}
