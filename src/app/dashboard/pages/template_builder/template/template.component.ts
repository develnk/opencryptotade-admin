import { Component, OnInit } from '@angular/core';
import { BlockType } from '../enum/block_type';
import { TemplateBuilderService } from '../template_builder.service';
import { BackendService } from '../../../../@core/services/backend.service';
import { BaseBlockModel } from '../model/base_block.model';
import { ListBaseBlockModel } from '../model/list_base_block.model';
import { ListItemModel } from '../model/list_item.model';
import { ListType } from '../enum/list_type';

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
  blockTemplateContent = '';
  selectedBlockType = BlockType.BODY.toString();

  constructor(private templateBuilderService: TemplateBuilderService, private dataService: BackendService) {
    this.templateBuilderService.initialBlockBuilder.subscribe(value => {
      this.isInitial = value;
    })
  }

  ngOnInit(): void {
    this.templateBuilderService.currentBlockBuilderObject.subscribe(currentBlockBuilder => {
        if (currentBlockBuilder.id !== '') {
          this.isInitial = false;
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
  }

  changeBlockType(value) {
    this.selectedBlockType = value;
  }

  resetBaseBlock() {
    this.templateBuilderService.changeCurrentDefaultBlockBuilder();
  }

  updateBaseBlock() {
    const data: ListItemModel = new ListBaseBlockModel(
      this.baseBlockObject.id,
      BlockType[this.selectedBlockType],
      this.blockTemplateContent
    );
    this.templateBuilderService.updateBlock(data).subscribe((result: ListBaseBlockModel) => {
      this.templateBuilderService.blocksSubscribe(ListType.BlockBuilder, BlockType[this.selectedBlockType]);
    });
  }

  public resetInitial() {
    this.templateBuilderService.changeInitialBlockBuilder(true);
    this.isBlockBuilder = false;
    this.blockTemplateIsEmpty = true;
  }

}
