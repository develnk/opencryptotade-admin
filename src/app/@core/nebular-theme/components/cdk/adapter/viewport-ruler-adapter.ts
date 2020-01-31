import {Inject, Injectable, NgZone} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';

import { NbPlatform } from '../platform/platform-service';
import { NbLayoutScrollService } from '../../../services/scroll.service';
import { Subject } from 'rxjs';
import { NB_DOCUMENT } from '../../../theme.options';


@Injectable()
export class NbViewportRulerAdapter extends ViewportRuler {
  constructor(platform: NbPlatform, ngZone: NgZone,
              @Inject(NB_DOCUMENT) protected document,
              protected scroll: NbLayoutScrollService) {
    super(platform, ngZone);
  }

  private destroy$ = new Subject<void>();

  getViewportSize(): Readonly<{ width: number; height: number; }> {
    let clientWidth = 0;
    let clientHeight = 0;
    const { documentElement, body } = this.document;
    clientWidth = documentElement.clientWidth || body.clientWidth;
    clientHeight = documentElement.clientHeight || body.clientHeight;

    return {
      width: clientWidth,
      height: clientHeight,
    };
  }

  getViewportScrollPosition(): { left: number; top: number } {
    return {
      left: 0,
      top: 0,
    };
  }
}
