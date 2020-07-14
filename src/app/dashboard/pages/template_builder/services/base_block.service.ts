import { Injectable } from '@angular/core';
import { BaseBlockModel } from '../model/base_block.model';
import { BlockType } from '../enum/block_type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BaseBlockService {

  public static readonly defaultBaseBlock: BaseBlockModel = {
    id: '',
    type: BlockType.BODY,
    html: ''
  };

  private _blockBuilderSource: BehaviorSubject<BaseBlockModel>;
  private _currentBlockBuilderObject: Observable<BaseBlockModel>;
  private _isBlockBuilder: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this._blockBuilderSource = new BehaviorSubject(BaseBlockService.defaultBaseBlock);
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

  set currentBlockBuilderObject(value: Observable<BaseBlockModel>) {
    this._currentBlockBuilderObject = value;
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
    this.blockBuilderSource.next(BaseBlockService.defaultBaseBlock);
  }
}
