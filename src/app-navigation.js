export default [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "店铺管理",
    icon: "folder",
    items: [
      {
        text: "商品列表",
        path: "/shop/product"
      },
      {
        text: "分类列表",
        path: "/shop/category"
      },
      {
        text: "标签列表",
        path: "/shop/labels"
      }
    ]
  },
  {
    text: "系统管理",
    icon: "folder",
    items: [
      {
        text: "Profile",
        path: "/profile"
      },
      {
        text: "账号列表",
        path: "/admin/system-account"
      },
      {
        text: "角色列表",
        path: "/admin/system-role"
      },
      {
        text: "组列表",
        path: "/admin/system-group"
      },
      {
        text: "菜单列表",
        path: "/admin/system-menu"
      },
      {
        text: "权限列表",
        path: "/admin/system-permission"
      }
    ]
  }
  ];
