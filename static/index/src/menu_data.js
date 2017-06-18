define([{
  icon: 'fa fa-th-large',
  title: '广告业务管理',
  href: '#app/vertising_mgmt.html'
}, {
  icon: 'fa fa-globe',
  title: '图片链接管理',
  href: '#app/img_link_mgmt.html'
}, {
  icon: 'fa fa-picture-o',
  title: '图标广告管理',
  href: '#app/icon_mgmt.html'
}, {
  icon: 'fa fa-cogs',
  title: '插件广告管理',
  href: '#app/widget_mgmt.html'
}, {
  icon: 'fa fa-sitemap',
  title: '菜单分类广告',
  href: '#',
  childrens: [{
    title: '一级分类',
    href: '#app/level_class_one.html'
  }, {
    title: '二级分类',
    href: '#app/level_class_two.html'
  }, {
    title: '三级分类',
    href: '#app/level_class_three.html'
  }]
}, {
  icon: 'fa fa-book',
  title: '广告模板',
  href: '#',
  childrens: [{
    title: '广告模板管理',
    href: '#app/templates_mgmt.html'
  }, {
    title: '网吧列表管理',
    href: '#app/internet_bars_mgmt.html'
  }, {
    title: '发布历史',
    href: '#app/publish_history.html'
  }]
}, {
  icon: 'fa fa-tasks',
  title: '数据统计',
  href: '#',
  childrens: [{
    title: '按模板统计',
    href: '#app/statistics_template.html'
  }, {
    title: '按广告名称统计',
    href: '#app/statistics_ad_name.html'
  }, {
    title: '按广告位统计',
    href: '#app/statistics_ad_space.html'
  }, {
    title: '按网吧统计',
    href: '#app/statistics_internet_bar.html'
  }, {
    title: '按广告业务统计',
    href: '#app/statistics_business.html'
  }, {
    title: '按广告周期统计',
    href: '#app/statistics_cycle.html'
  }, {
    title: '插件统计',
    href: '#app/statistics_widget.html'
  }]
}, {
  icon: 'fa fa-sitemap',
  title: '高级管理',
  href: '#',
  childrens: [{
    title: '用户列表管理',
    href: '#app/user_mgmt.html'
  }, {
    title: '权限管理',
    href: '#app/permissions_mgmt.html'
  }]
}]);
