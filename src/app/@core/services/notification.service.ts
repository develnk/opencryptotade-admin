import { Injectable } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationModuleService: NotificationsService) {}

  public showNotification(type: NotificationType, title: string, content: string) {
    switch (type) {
      case NotificationType.Alert:
        this.notificationModuleService.alert(title, content);
        break;
      case NotificationType.Bare:
        this.notificationModuleService.bare(title, content);
        break;
      case NotificationType.Error:
        this.notificationModuleService.error(title, content);
        break;
      case NotificationType.Info:
        this.notificationModuleService.info(title, content);
        break;
      case NotificationType.Success:
        this.notificationModuleService.success(title, content);
        break;
      case NotificationType.Warn:
        this.notificationModuleService.warn(title, content);
        break;
      default:
        this.notificationModuleService.info(title, content);
        break;
    }
  }

}
