import {Component, OnInit} from '@angular/core';
import { BlockType } from '../enum/block_type';
import { TemplateBuilderService } from '../template_builder.service';
import { BackendService } from '../../../../@core/services/backend.service';
import { BaseBlockModel } from '../model/base_block.model';
import {BehaviorSubject, Subject} from 'rxjs';

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
  selectedBlockType = BlockType.Content.toString();

  constructor(private templateBuilderService: TemplateBuilderService, private dataService: BackendService) {
    this.templateBuilderService.initialBlockBuilder.subscribe(value => {
      this.isInitial = value;
    })
  }

  ngOnInit(): void {
    this.templateBuilderService.currentBlockBuilderObject.subscribe(currentBlockBuilder => {
        if (currentBlockBuilder.id !== '') {
          this.isInitial = false;
          // this.initial$.next(false);
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

  public resetInitial() {
    this.templateBuilderService.changeInitialBlockBuilder(true);
    this.isBlockBuilder = false;
    this.blockTemplateIsEmpty = true;
  }

}
