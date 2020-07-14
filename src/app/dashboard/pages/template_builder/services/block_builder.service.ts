import { Injectable } from '@angular/core';
import { BaseBlockModel } from '../model/base_block.model';
import { BlockType } from '../enum/block_type';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListItemModel } from '../model/list_item.model';
import { BackendService } from '../../../../@core/services/backend.service';

@Injectable()
export class BlockBuilderService {

  public static readonly defaultBaseBlock: BaseBlockModel = {
    id: '',
    type: BlockType.BODY,
    html: ''
  };

  private readonly _blockBuilderSource: BehaviorSubject<BaseBlockModel>;
  private readonly _currentBlockBuilderObject: Observable<BaseBlockModel>;
  private _isBlockBuilder: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private dataService: BackendService) {
    this._blockBuilderSource = new BehaviorSubject(BlockBuilderService.defaultBaseBlock);
    this._currentBlockBuilderObject = this._blockBuilderSource.asObservable();
  }

  get blockBuilderSource(): BehaviorSubject<BaseBlockModel> {
    return this._blockBuilderSource;
  }

  changeBlockBuilder(value: boolean) {
    this._isBlockBuilder.next(value);
  }

  get currentBlockBuilderObject(): Observable<BaseBlockModel> {
    return this._currentBlockBuilderObject;
  }

  get isBlockBuilder(): BehaviorSubject<boolean> {
    return this._isBlockBuilder;
  }

  set isBlockBuilder(value: BehaviorSubject<boolean>) {
    this._isBlockBuilder = value;
  }

  getCurrentBlockBuilderObject(): BaseBlockModel {
    return this._blockBuilderSource.getValue();
  }

  changeCurrentBlockBuilderObject(object: BaseBlockModel) {
    this._blockBuilderSource.next(object);
  }

  setDefaultBlockBuilder() {
    this.blockBuilderSource.next(BlockBuilderService.defaultBaseBlock);
  }

  updateBaseBlock(data: ListItemModel): Observable<any> {
    return this.dataService.updateTemplateBuilderBaseBlock(data);
  }

  createBaseBlock(data: ListItemModel): Observable<any> {
    return this.dataService.createTemplateBuilderBaseBlock(data);
  }

  deleteBaseBlock(data: ListItemModel): Observable<any> {
    return this.dataService.deleteTemplateBuilderBaseBlock(data);
  }

}
