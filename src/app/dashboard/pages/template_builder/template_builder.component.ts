import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TemplateBuilderService } from './template_builder.service';
import { MenuModel } from './model/menu.model';
import { ListType } from './enum/list_type';

@Component({
  selector: 'app-template-builder',
  templateUrl: './template_builder.component.html',
  styleUrls: ['./template_builder.component.scss']
})
export class TemplateBuilderComponent implements OnInit, AfterContentInit {

  selectedItemMenu: MenuModel;
  menuList: MenuModel[];

  constructor(private templateBuilderService: TemplateBuilderService) {}

  ngOnInit(): void {
    this.menuList = [
      new MenuModel('Templates', ListType.Template),
      new MenuModel('Blocks', ListType.Block),
      new MenuModel('Template folders', ListType.Folder),
      new MenuModel('Block builder', ListType.BlockBuilder),
    ];
    this.selectedItemMenu = this.menuList[0];
  }

  ngAfterContentInit(): void {
    this.templateBuilderService.resetInitialTemplates();
    this.templateBuilderService.templatesTabSubscribe();
  }

  clickMenu(item: MenuModel) {
    this.selectedItemMenu = item;

    switch (item.type) {
      case ListType.Template:
        this.templateBuilderService.resetInitialTemplates();
        this.templateBuilderService.templatesTabSubscribe();

        break;
      case ListType.Block:
        this.templateBuilderService.resetInitialBlock();
        this.templateBuilderService.blocksSubscribe(ListType.Block);
        break;

      case ListType.Folder:
        this.templateBuilderService.resetInitialFolder();
        this.templateBuilderService.foldersTabSubscribe();
        break;

      case ListType.BlockBuilder:
        this.templateBuilderService.resetInitialBlockBuilder();
        this.templateBuilderService.blocksSubscribe(ListType.BlockBuilder);
        break;
    }
  }

  createTemplateAction() {
    this.selectedItemMenu = this.menuList[1];
    this.templateBuilderService.resetInitialBlock();
    this.templateBuilderService.blocksSubscribe(ListType.Block);
    this.templateBuilderService.createNewTemplate();
  }

  isActive(item: MenuModel) {
    return this.selectedItemMenu === item;
  }

}
