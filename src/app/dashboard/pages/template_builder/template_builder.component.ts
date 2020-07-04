import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TemplateBuilderService } from './template_builder.service';
import { MenuModel } from './model/menu.model';
import { ListType } from './enum/list_type';
import { ListObjectsModel } from './model/list_objects.model';
import { TemplateComponent } from './template/template.component';

@Component({
  providers: [TemplateComponent],
  selector: 'app-template-builder',
  templateUrl: './template_builder.component.html',
  styleUrls: ['./template_builder.component.scss']
})
export class TemplateBuilderComponent implements OnInit, AfterContentInit {

  listType: ListType;
  listObjects: ListObjectsModel;
  selectedItemMenu: MenuModel;
  menuList: MenuModel[];

  constructor(private templateBuilderService: TemplateBuilderService, private templateComponent: TemplateComponent) {
  }

  ngOnInit(): void {
    this.menuList = [
      new MenuModel('Templates', ListType.Template),
      new MenuModel('Blocks', ListType.Block),
      new MenuModel('Template folders', ListType.Folder),
      new MenuModel('Block builder', ListType.BlockBuilder),
    ];
    this.selectedItemMenu = this.menuList[0];
    this.listType = ListType.Template;
  }

  ngAfterContentInit(): void {
    this.templateComponent.resetInitial();
    this.templateBuilderService.templatesTabSubscribe();
  }

  clickMenu(item: MenuModel) {
    this.selectedItemMenu = item;

    switch (item.type) {
      case ListType.Template:
        this.listType = ListType.Template;
        this.templateComponent.resetInitial();
        this.templateBuilderService.templatesTabSubscribe();

        break;
      case ListType.Block:
        this.listType = ListType.Block;
        this.templateComponent.resetInitial();
        this.templateBuilderService.blocksSubscribe(ListType.Block);
        break;

      case ListType.Folder:
        this.templateComponent.resetInitial();
        this.templateBuilderService.foldersTabSubscribe();
        break;

      case ListType.BlockBuilder:
        this.listType = ListType.BlockBuilder;
        this.templateBuilderService.blocksSubscribe(ListType.BlockBuilder);
        break;
    }
  }

  isActive(item: MenuModel) {
    return this.selectedItemMenu === item;
  }

}
