import { Component } from '@angular/core';

@Component({
  selector: 'ex-ant-design',
  templateUrl: './ant-design.component.html',
  styleUrls: ['./ant-design.component.scss']
})
export class ExAntDesignComponent {
  tabs = [
    {
      type: 'ado',
      name: 'Outlined',
      icons: [
        'account-book',
        'alert',
        'alibaba',
        'align-center',
        'align-left',
        'align-right',
        'alipay-circle',
        'alipay',
        'aliwangwang',
        'aliyun',
        'amazon',
        'android',
        'ant-cloud',
        'ant-design',
        'apartment',
        'api',
        'apple',
        'appstore',
        'area-chart',
        'arrow-down',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrows-alt',
        'audio',
        'audit',
        'backward',
        'bank',
        'bar-chart',
        'barcode',
        'bars',
        'behance-square',
        'behance',
        'bell',
        'bg-colors',
        'block',
        'bold',
        'book',
        'border-bottom',
        'border-horizontal',
        'border-inner',
        'border-left',
        'border-outer',
        'border-right',
        'border-top',
        'border-verticle',
        'border',
        'box-plot',
        'branches',
        'build',
        'bulb',
        'calculator',
        'calendar',
        'camera',
        'car',
        'caret-down',
        'caret-left',
        'caret-right',
        'caret-up',
        'carry-out',
        'check-circle',
        'check-square',
        'check',
        'chrome',
        'ci',
        'clock-circle',
        'close-circle',
        'close-square',
        'close',
        'cloud-download',
        'cloud-server',
        'cloud-sync',
        'cloud-upload',
        'cloud',
        'cluster',
        'code-sandbox',
        'code',
        'codepen-circle',
        'codepen',
        'coffee',
        'colum-height',
        'column-width',
        'compass',
        'contacts',
        'container',
        'control',
        'copy',
        'copyright',
        'credit-card',
        'crown',
        'customer-service',
        'dash',
        'dashboard',
        'database',
        'delete',
        'deployment-unit',
        'desktop',
        'diff',
        'dingding',
        'disconnect',
        'dislike',
        'dollar',
        'dot-chart',
        'double-left',
        'double-right',
        'down-circle',
        'down-square',
        'down',
        'download',
        'drag',
        'dribbble-square',
        'dribbble',
        'dropbox',
        'edit',
        'ellipsis',
        'enter',
        'environment',
        'euro',
        'exception',
        'exclamation-circle',
        'exclamation',
        'experiment',
        'export',
        'eye-invisible',
        'eye',
        'facebook',
        'fall',
        'fast-backward',
        'fast-forward',
        'file-add',
        'file-done',
        'file-excel',
        'file-exclamation',
        'file-image',
        'file-jpg',
        'file-markdown',
        'file-pdf',
        'file-ppt',
        'file-protect',
        'file-search',
        'file-sync',
        'file-text',
        'file-unknown',
        'file-word',
        'file-zip',
        'file',
        'filter',
        'fire',
        'flag',
        'folder-add',
        'folder-open',
        'folder',
        'font-colors',
        'font-size',
        'fork',
        'form',
        'forward',
        'frown',
        'fullscreen-exit',
        'fullscreen',
        'fund',
        'funnel-plot',
        'gateway',
        'gift',
        'github',
        'gitlab',
        'global',
        'gold',
        'google-plus',
        'google',
        'hdd',
        'heart',
        'heat-map',
        'highlight',
        'home',
        'hourglass',
        'html5',
        'idcard',
        'ie',
        'import',
        'inbox',
        'info-circle',
        'info',
        'instagram',
        'insurance',
        'interation',
        'issues-close',
        'italic',
        'key',
        'laptop',
        'layout',
        'left-circle',
        'left-square',
        'left',
        'like',
        'line-chart',
        'line-height',
        'line',
        'link',
        'linkedin',
        'loading-3-quarters',
        'loading',
        'lock',
        'login',
        'logout',
        'mail',
        'man',
        'medicine-box',
        'medium-workmark',
        'medium',
        'meh',
        'menu',
        'message',
        'minus-circle',
        'minus-square',
        'minus',
        'mobile',
        'money-collect',
        'monitor',
        'more',
        'notification',
        'number',
        'ordered-list',
        'paper-clip',
        'pause-circle',
        'pause',
        'pay-circle',
        'percentage',
        'phone',
        'pic-center',
        'pic-left',
        'pic-right',
        'picture',
        'pie-chart',
        'play-circle',
        'play-square',
        'plus-circle',
        'plus-square',
        'plus',
        'pound',
        'poweroff',
        'printer',
        'profile',
        'project',
        'property-safety',
        'pushpin',
        'qq',
        'qrcode',
        'question-circle',
        'question',
        'radar-chart',
        'radius-bottomleft',
        'radius-bottomright',
        'radius-setting',
        'radius-upleft',
        'radius-upright',
        'read',
        'reconciliation',
        'red-envelope',
        'reddit',
        'redo',
        'reload',
        'rest',
        'retweet',
        'right-circle',
        'right-square',
        'right',
        'rise',
        'robot',
        'rocket',
        'rollback',
        'safety-certificate',
        'safety',
        'save',
        'scan',
        'schedule',
        'scissor',
        'search',
        'security-scan',
        'select',
        'setting',
        'shake',
        'share-alt',
        'shop',
        'shopping-cart',
        'shopping',
        'shrink',
        'sketch',
        'skin',
        'skype',
        'slack-square',
        'slack',
        'sliders',
        'small-dash',
        'smile',
        'snippets',
        'solution',
        'sort-ascending',
        'sort-descending',
        'sound',
        'star',
        'step-backward',
        'step-forward',
        'stock',
        'stop',
        'strikethrough',
        'swap-left',
        'swap-right',
        'swap',
        'switcher',
        'sync',
        'table',
        'tablet',
        'tag',
        'tags',
        'taobao-circle',
        'taobao',
        'team',
        'thunderbolt',
        'to-top',
        'tool',
        'trademark',
        'transaction',
        'trophy',
        'twitter',
        'underline',
        'undo',
        'unlock',
        'unordered-list',
        'up-circle',
        'up-square',
        'up',
        'upload',
        'usb',
        'user-add',
        'user-delete',
        'user',
        'usergroup-add',
        'usergroup-delete',
        'vertical-align-bottom',
        'vertical-align-middle',
        'vertical-align-top',
        'vertical-left',
        'vertical-right',
        'video-camera',
        'wallet',
        'warning',
        'wechat',
        'weibo-circle',
        'weibo-square',
        'weibo',
        'wifi',
        'windows',
        'woman',
        'yahoo',
        'youtube',
        'yuque',
        'zhihu',
        'zoom-in',
        'zoom-out'
      ]
    },
    {
      type: 'adf',
      name: 'Filled',
      icons: [
        'account-book',
        'alert',
        'alipay-circle',
        'alipay-square',
        'aliwangwang',
        'amazon-circle',
        'amazon-square',
        'android',
        'api',
        'apple',
        'appstore',
        'audio',
        'backward',
        'bank',
        'behance-circle',
        'behance-square',
        'bell',
        'book',
        'box-plot',
        'build',
        'bulb',
        'calculator',
        'calendar',
        'camera',
        'car',
        'caret-down',
        'caret-left',
        'caret-right',
        'caret-up',
        'carry-out',
        'check-circle',
        'check-square',
        'chrome',
        'ci-circle',
        'clock-circle',
        'close-circle',
        'close-square',
        'cloud',
        'code-sandbox-circle',
        'code-sandbox-square',
        'code',
        'codepen-circle',
        'codepen-square',
        'compass',
        'contacts',
        'container',
        'control',
        'copy',
        'copyright-circle',
        'credit-card',
        'crown',
        'customer-service',
        'dashboard',
        'database',
        'delete',
        'diff',
        'dingtalk-circle',
        'dingtalk-square',
        'dislike',
        'dollar-circle',
        'down-circle',
        'down-square',
        'dribbble-circle',
        'dribbble-square',
        'dropbox-circle',
        'dropbox-square',
        'edit',
        'environment',
        'euro-circle',
        'exclamation-circle',
        'experiment',
        'eye-invisible',
        'eye',
        'facebook',
        'fast-backward',
        'fast-forward',
        'file-add',
        'file-excel',
        'file-exclamation',
        'file-image',
        'file-markdown',
        'file-pdf',
        'file-ppt',
        'file-text',
        'file-unknown',
        'file-word',
        'file-zip',
        'file',
        'filter',
        'fire',
        'flag',
        'folder-add',
        'folder-open',
        'folder',
        'forward',
        'frown',
        'fund',
        'funnel-plot',
        'gift',
        'github',
        'gitlab',
        'golden',
        'google-circle',
        'google-plus-circle',
        'google-plus-square',
        'google-square',
        'hdd',
        'heart',
        'highlight',
        'home',
        'hourglass',
        'html5',
        'idcard',
        'ie-circle',
        'ie-square',
        'info-circle',
        'instagram',
        'insurance',
        'interation',
        'layout',
        'left-circle',
        'left-square',
        'like',
        'linkedin',
        'lock',
        'mail',
        'medicine-box',
        'medium-circle',
        'medium-square',
        'meh',
        'message',
        'minus-circle',
        'minus-square',
        'mobile',
        'money-collect',
        'notification',
        'pause-circle',
        'pay-circle',
        'phone',
        'picture',
        'pie-chart',
        'play-circle',
        'play-square',
        'plus-circle',
        'plus-square',
        'pound-circle',
        'printer',
        'profile',
        'project',
        'property-safety',
        'pushpin',
        'qq-circle',
        'qq-square',
        'question-circle',
        'read',
        'reconciliation',
        'red-envelope',
        'reddit-circle',
        'reddit-square',
        'rest',
        'right-circle',
        'right-square',
        'rocket',
        'safety-certificate',
        'save',
        'schedule',
        'security-scan',
        'setting',
        'shop',
        'shopping',
        'sketch-circle',
        'sketch-square',
        'skin',
        'skype',
        'slack-circle',
        'slack-square',
        'sliders',
        'smile',
        'snippets',
        'sound',
        'star',
        'step-backward',
        'step-forward',
        'stop',
        'switcher',
        'tablet',
        'tag',
        'tags',
        'taobao-circle',
        'taobao-square',
        'thunderbolt',
        'tool',
        'trademark-circle',
        'trophy',
        'twitter-circle',
        'twitter-square',
        'unlock',
        'up-circle',
        'up-square',
        'usb',
        'video-camera',
        'wallet',
        'warning',
        'wechat',
        'weibo-circle',
        'weibo-square',
        'windows',
        'yahoo',
        'youtube',
        'yuque',
        'zhihu-circle',
        'zhihu-square'
      ]
    },
    {
      type: 'adt',
      name: 'TwoTone',
      icons: [
        'account-book',
        'alert',
        'api',
        'appstore',
        'audio',
        'bank',
        'bell',
        'book',
        'box-plot',
        'build',
        'bulb',
        'calculator',
        'camera',
        'canlendar',
        'car',
        'carry-out',
        'check-circle',
        'check-square',
        'ci',
        'clock-circle',
        'close-circle',
        'close-square',
        'cloud',
        'code',
        'compass',
        'contacts',
        'container',
        'control',
        'copy',
        'copyright',
        'credit-card',
        'crown',
        'customer-service',
        'dashboard',
        'database',
        'delete',
        'diff',
        'dislike',
        'dollar',
        'down-circle',
        'down-square',
        'edit',
        'environment',
        'euro',
        'exclamation-circle',
        'experiment',
        'eye-invisible',
        'eye',
        'file-add',
        'file-excel',
        'file-exclamation',
        'file-image',
        'file-markdown',
        'file-pdf',
        'file-ppt',
        'file-text',
        'file-unknown',
        'file-word',
        'file-zip',
        'file',
        'filter',
        'fire',
        'flag',
        'folder-add',
        'folder-open',
        'folder',
        'frown',
        'fund',
        'funnel-plot',
        'gift',
        'gold',
        'hdd',
        'heart',
        'highlight',
        'home',
        'hourglass',
        'html5',
        'idcard',
        'info-circle',
        'insurance',
        'interation',
        'layout',
        'left-circle',
        'left-square',
        'like',
        'lock',
        'mail',
        'medicine-box',
        'meh',
        'message',
        'minus-circle',
        'minus-square',
        'mobile',
        'money-collect',
        'notification',
        'pause-circle',
        'phone',
        'picture',
        'pie-chart',
        'play-circle',
        'play-square',
        'plus-circle',
        'plus-square',
        'pound-circle',
        'printer',
        'profile',
        'project',
        'property-safety',
        'pushpin',
        'question-circle',
        'reconciliation',
        'red-envelope',
        'rest',
        'right-circle',
        'right-square',
        'rocket',
        'safety-certificate',
        'save',
        'schedule',
        'security-scan',
        'setting',
        'shop',
        'shopping',
        'skin',
        'sliders',
        'smile',
        'snippets',
        'sound',
        'star',
        'stop',
        'switcher',
        'tablet',
        'tag',
        'tags',
        'thunderbolt',
        'tool',
        'trademark-circle',
        'trophy',
        'unlock',
        'up-circle',
        'up-square',
        'usb',
        'video-camera',
        'wallet',
        'warning'
      ]
    }
  ];
}
