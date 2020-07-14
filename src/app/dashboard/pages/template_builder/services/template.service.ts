import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TemplateModel } from '../model/template.model';
import { BackendService } from '../../../../@core/services/backend.service';
import { ListTemplateModel } from '../model/list_template.model';

@Injectable()
export class TemplateService {

  public static readonly defaultTemplate: TemplateModel = {
    id: '',
    name: '',
    subject: '',
    folder: '',
    trigger: 0,
    baseBlockLinks: [],
  };

  private readonly _templatesSource: BehaviorSubject<TemplateModel>;
  private readonly _currentTemplateObject: Observable<TemplateModel>;
  private _isTemplateBuilder: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isNewTemplateBuilder: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _templateIsEmpty: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private dataService: BackendService) {
    this._templatesSource = new BehaviorSubject<TemplateModel>(TemplateService.defaultTemplate);
    this._currentTemplateObject = this._templatesSource.asObservable();
  }

  get templateIsEmpty(): BehaviorSubject<boolean> {
    return this._templateIsEmpty;
  }

  get isNewTemplateBuilder(): BehaviorSubject<boolean> {
    return this._isNewTemplateBuilder;
  }

  get isTemplateBuilder(): BehaviorSubject<boolean> {
    return this._isTemplateBuilder;
  }

  get currentTemplateObject(): Observable<TemplateModel> {
    return this._currentTemplateObject;
  }

  get templatesSource(): BehaviorSubject<TemplateModel> {
    return this._templatesSource;
  }

  changeTemplateIsEmpty(value: boolean) {
    this._templateIsEmpty.next(value);
  }

  changeIsNewTemplateBuilder(value: boolean) {
    this._isNewTemplateBuilder.next(value);
  }

  changeIsTemplateBuilder(value: boolean) {
    this._isTemplateBuilder.next(value);
  }

  clearDefaultTemplate() {
    TemplateService.defaultTemplate.id = '';
    TemplateService.defaultTemplate.name = '';
    TemplateService.defaultTemplate.subject = '';
    TemplateService.defaultTemplate.folder = '';
    TemplateService.defaultTemplate.trigger = 0;
    TemplateService.defaultTemplate.baseBlockLinks = [];
  }

  changeCurrentDefaultTemplate() {
    this._templatesSource.next(TemplateService.defaultTemplate);
  }

  changeCurrentTemplate(template: TemplateModel) {
    this._templatesSource.next(template);
  }

  getCurrentTemplate(): TemplateModel {
    return this._templatesSource.getValue();
  }

  deleteTemplate(template: ListTemplateModel): Observable<any> {
    return this.dataService.deleteTemplateBuilderTemplate(template.id);
  }


}
