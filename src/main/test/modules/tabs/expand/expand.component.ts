import { Component } from '@angular/core';

@Component({
  selector: 'ex-expand',
  templateUrl: './expand.component.html'
})
export class ExExpandComponent {
  labels = [
    '用户管理',
    '配置管理',
    '角色管理',
    '菜单管理',
    '组织机构',
    '权限管理',
    '页面设计',
    '工作流',
    '表单设计',
    '日志查看',
    '消息管理',
    '属性设计',
    '流程设计'
  ];
}
