import { FolderModel } from '../model/folder.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FolderService {

  public static readonly defaultFolder: FolderModel = {
    id: '',
    name: 'Default'
  };

  private foldersSource: BehaviorSubject<FolderModel[]>;
  private _folders: Observable<FolderModel[]>;
  private _isFolderBuilder: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.foldersSource = new BehaviorSubject<FolderModel[]>([FolderService.defaultFolder]);
    this._folders = this.foldersSource.asObservable();
  }

  get isFolderBuilder(): BehaviorSubject<boolean> {
    return this._isFolderBuilder;
  }

  set isFolderBuilder(value: BehaviorSubject<boolean>) {
    this._isFolderBuilder = value;
  }

  get folders(): Observable<FolderModel[]> {
    return this._folders;
  }

  set folders(value: Observable<FolderModel[]>) {
    this._folders = value;
  }

  changeIsFolderBuilder(value: boolean) {
    this.isFolderBuilder.next(value);
  }

  getAllListFolders(): FolderModel[] {
    return this.foldersSource.getValue();
  }

  changeListFolders(folders: FolderModel[]) {
    this.foldersSource.next(folders);
  }

}
