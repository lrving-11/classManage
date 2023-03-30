import Vue from "vue";
import Router from "vue-router";
import store from "@/store/modules/user2";
import { getUserInfo } from "@/utils/auth";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    // name: "login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/register",
    // name: "register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];
//普通用户
export const studentMap = [
  // 学生及相关信息
  {
    path: "/double-creation",
    component: Layout,
    meta: {
      title: "学生及相关信息",
      icon: "el-icon-s-unfold",
    },
    children: [
      {
        path: "graduate-data2",
        component: () => import("@/views/student_user/graduate_data/index"),
        meta: { title: "毕业生信息", icon: "el-icon-s-data" },
        children: [
          {
            hidden: true,
            path: "index/:page&:limit",
            component: () => import("@/views/student_user/graduate_data/table"),
            meta: {
              title: "内容列表",
              icon: "el-icon-s-data",
              activeMenu: "/student_user/graduate-data",
            },
          },
          {
            hidden: true,
            path: "add",
            component: () => import("@/views/student_user/graduate_data/add"),
            meta: {
              title: "信息录入",
              icon: "el-icon-s-data",
              activeMenu: "/student_user/graduate-data",
            },
          },
          {
            hidden: true,
            path: "edit/:form",
            component: () => import("@/views/student_user/graduate_data/edit"),
            meta: {
              title: "编辑",
              icon: "el-icon-s-data",
              activeMenu: "/student_user/graduate-data",
            },
          },
          // {
          //   hidden: true,
          //   path: "field",
          //   component: () =>
          //     import("@/views/student_user/graduate_data/fields"),
          //   meta: {
          //     title: "动态字段",
          //     icon: "el-icon-s-data",
          //     activeMenu: "/student_user/graduate-data",
          //   },
          // },
        ],
      },

      // {
      //   path: "/studentTable",
      //   component: () => import("@/views/student_user/studenttable"),
      //   meta: {
      //     title: "学生信息",
      //     icon: "el-icon-s-unfold",
      //   },
      // },
      {
        path: "student-data",
        component: () => import("@/views/student_user/student_data/index"),
        meta: { title: "学生信息", icon: "el-icon-s-data" },
        children: [
          {
            hidden: true,
            path: "index/:page&:limit",
            component: () => import("@/views/student_user/student_data/table"),
            meta: {
              title: "学生信息",
              icon: "el-icon-s-data",
              activeMenu: "/student_user/student-data",
            },
          },
          {
            hidden: true,
            path: "add",
            component: () => import("@/views/student_user/student_data/add"),
            meta: {
              title: "信息录入",
              icon: "el-icon-s-data",
              activeMenu: "/student_user/student-data",
            },
          },
          {
            hidden: true,
            path: "edit/:form",
            component: () => import("@/views/student_user/student_data/edit"),
            meta: {
              title: "编辑",
              icon: "el-icon-s-data",
              activeMenu: "/student_user/student-data",
            },
          },
          // {
          //   hidden: true,
          //   path: "field",
          //   component: () => import("@/views/student_user/student_data/fields"),
          //   meta: {
          //     title: "动态字段",
          //     icon: "el-icon-s-data",
          //     activeMenu: "/student_user/student-data",
          //   },
          // },
        ],
      },

      {
        path: "/classTable",
        component: () => import("@/views/student_user/classTable"),
        meta: {
          title: "班级信息",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: "/table1",
        component: () => import("@/views/student_user/table1"),
        meta: {
          title: "竞赛获奖信息",
          icon: "el-icon-s-unfold",
        },
      },
    ],
  },
  {
    path: "/employmentInfo",
    component: Layout,
    meta: {
      title: "就业相关信息",
      icon: "el-icon-s-unfold",
    },
    children: [
      {
        path: "employment",
        component: () =>
          import("@/views/student_user/employmentInfo/employment.vue"),
        meta: {
          title: "就业信息",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: "resume",
        component: () =>
          import("@/views/student_user/employmentInfo/resume.vue"),
        meta: {
          title: "个人简历发布",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: "jobWantedInfo",
        component: () =>
          import("@/views/student_user/employmentInfo/jobWantedInfo.vue"),
        meta: {
          title: "求职申请提交",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: "company",
        component: () =>
          import("@/views/student_user/employmentInfo/company.vue"),
        meta: {
          title: "公司简介",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: "position",
        component: () =>
          import("@/views/student_user/employmentInfo/position.vue"),
        meta: {
          title: "职位信息",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: "jobExamine",
        component: () =>
          import("@/views/student_user/employmentInfo/jobExamine.vue"),
        meta: {
          title: "求职审核",
          icon: "el-icon-s-unfold",
        },
      },
    ],
  },
];
// 动态路由-管理员
export const adminMap = [
  // 双创班
  // {
  //   path: "/double-creation",
  //   component: Layout,
  //   meta: {
  //     title: "双创班基础信息管理",
  //     icon: "el-icon-s-unfold",
  //   },
  //   children: [
  //     {
  //       path: "description",
  //       component: () => import("@/views/double_creation/Introduction/index"),
  //       meta: {
  //         title: "双创班简介",
  //         icon: "el-icon-s-data",
  //       },
  //       children: [
  //         {
  //           hidden: true,
  //           path: "index/:page&:limit",
  //           component: () =>
  //             import("@/views/double_creation/Introduction/table1"),
  //           meta: {
  //             title: "内容列表",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/description",
  //           },
  //         },
  //         // {
  //         //   hidden: true,
  //         //   path: "add",
  //         //   component: () => import("@/views/double_creation/Introduction/add"),
  //         //   meta: {
  //         //     title: "信息录入",
  //         //     icon: "el-icon-s-data",
  //         //     activeMenu: "/double-creation/description",
  //         //   },
  //         // },
  //         // {
  //         //   hidden: true,
  //         //   path: "edit",
  //         //   component: () =>
  //         //     import("@/views/double_creation/Introduction/edit"),
  //         //   meta: {
  //         //     title: "编辑",
  //         //     icon: "el-icon-s-data",
  //         //     activeMenu: "/double-creation/description",
  //         //   },
  //         // },
  //       ],
  //     },
  //     {
  //       path: "student-data2",
  //       component: () => import("@/views/double_creation/student_data/index"),
  //       meta: { title: "学生信息", icon: "el-icon-s-data" },
  //       children: [
  //         {
  //           hidden: true,
  //           path: "index/:page&:limit",
  //           component: () =>
  //             import("@/views/double_creation/student_data/table"),
  //           meta: {
  //             title: "学生信息",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/student-data",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "add",
  //           component: () => import("@/views/double_creation/student_data/add"),
  //           meta: {
  //             title: "信息录入",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/student-data",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "edit/:form",
  //           component: () =>
  //             import("@/views/double_creation/student_data/edit"),
  //           meta: {
  //             title: "编辑",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/student-data",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "field",
  //           component: () =>
  //             import("@/views/double_creation/student_data/fields"),
  //           meta: {
  //             title: "动态字段",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/student-data",
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       path: "graduate-data-2",
  //       component: () => import("@/views/double_creation/graduate_data/index"),
  //       meta: { title: "毕业生信息", icon: "el-icon-s-data" },
  //       children: [
  //         {
  //           hidden: true,
  //           path: "index/:page&:limit",
  //           component: () =>
  //             import("@/views/double_creation/graduate_data/table"),
  //           meta: {
  //             title: "内容列表",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/graduate-data",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "add",
  //           component: () =>
  //             import("@/views/double_creation/graduate_data/add"),
  //           meta: {
  //             title: "信息录入",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/graduate-data",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "edit/:form",
  //           component: () =>
  //             import("@/views/double_creation/graduate_data/edit"),
  //           meta: {
  //             title: "编辑",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/graduate-data",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "field",
  //           component: () =>
  //             import("@/views/double_creation/graduate_data/fields"),
  //           meta: {
  //             title: "动态字段",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/graduate-data",
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       // path: "results",
  //       // meta: { title: "双创成果", icon: "el-icon-s-data" },
  //       // component: () => import("@/views/double_creation/results/index"),
  //       // children: [
  //       //   {
  //       path: "contest-winners",
  //       component: () =>
  //         import("@/views/double_creation/results/contestWinners/index"),
  //       meta: {
  //         title: "获奖信息管理",
  //         icon: "el-icon-document-remove",
  //       },
  //       children: [
  //         {
  //           hidden: true,
  //           path: "index/:page&:limit",
  //           component: () =>
  //             import("@/views/double_creation/results/contestWinners/table1"),
  //           meta: {
  //             title: "内容列表",
  //             icon: "el-icon-s-data",
  //             activeMenu: "/double-creation/results/contest-winners",
  //           },
  //         },
  //       ],
  //       //   },
  //       // ],
  //     },
  //   ],
  // },

  //就业信息
  {
    path: "/employment",
    component: Layout,
    meta: { title: "就业信息管理", icon: "el-icon-s-unfold" },
    children: [
      {
        path: "infomation",
        component: () => import("@/views/employment_info/index"),
        meta: {
          title: "就业信息",
          icon: "el-icon-s-unfold",
        },
        children: [
          {
            hidden: true,
            path: "table",
            component: () => import("@/views/employment_info/table"),
            meta: {
              title: "就业信息表格展示",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "chart",
            component: () => import("@/views/employment_info/chart"),
            meta: {
              title: "就业信息图表展示",
              icon: "el-icon-s-unfold",
            },
          },
        ],
      },
    ],
  },
  // 就业质量分析
  {
    path: "/signingRate",
    component: Layout,
    meta: { title: "就业质量分析", icon: "el-icon-s-unfold" },
    children: [
      {
        path: "infomation",
        component: () => import("@/views/signingRate/index"),
        meta: {
          title: "签约情况统计",
          icon: "el-icon-s-unfold",
        },
        children: [
          {
            hidden: true,
            path: "table",
            component: () => import("@/views/signingRate/table"),
            meta: {
              title: "签约情况统计表",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "chart",
            component: () => import("@/views/signingRate/chart"),
            meta: {
              title: "签约情况统计图",
              icon: "el-icon-s-unfold",
            },
          },
        ],
      },
    ],
  },
  // 招聘管理
  {
    path: "/recruitment",
    component: Layout,
    meta: { title: "招聘管理", icon: "el-icon-s-unfold" },
    children: [
      {
        path: "jobWanted",
        component: () => import("@/views/recruitment/jobWanted/index"),
        meta: {
          title: "求职用户管理",
          icon: "el-icon-s-unfold",
        },
        children: [
          {
            hidden: true,
            path: "resume",
            component: () => import("@/views/recruitment/jobWanted/resume"),
            meta: {
              title: "个人简历",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "jobWantedInfo",
            component: () =>
              import("@/views/recruitment/jobWanted/jobWantedInfo"),
            meta: {
              title: "求职信息",
              icon: "el-icon-s-unfold",
            },
          },
        ],
      },

      {
        path: "starLevel",
        component: () => import("@/views/recruitment/starLevel/index"),
        meta: {
          title: "星级评定",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: "recruitmentAgency",
        component: () => import("@/views/recruitment/recruitment_agency/index"),
        meta: {
          title: "招聘公司管理",
          icon: "el-icon-s-unfold",
        },
        children: [
          {
            hidden: true,
            path: "enterprise",
            component: () =>
              import("@/views/recruitment/recruitment_agency/enterprise"),
            meta: {
              title: "公司简介发布",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "position",
            component: () =>
              import("@/views/recruitment/recruitment_agency/position"),
            meta: {
              title: "职位发布",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "jobExamine",
            component: () =>
              import("@/views/recruitment/recruitment_agency/jobExamine"),
            meta: {
              title: "求职审核",
              icon: "el-icon-s-unfold",
            },
          },
        ],
      },
    ],
  },
  // {
  //   path: "/allUser",
  //   component: Layout,
  //   meta: { title: "管理员", icon: "el-icon-s-claim" },
  //   children: [
  //     // {
  //     //   path: "permission",
  //     //   component: () => import("@/views/Permission/index"),
  //     //   meta: { title: "权限控制", icon: "el-icon-s-claim" },
  //     // },
  //     {
  //       path: "competition1",
  //       component: () => import("@/views/Permission/index1"),
  //       meta: { title: "竞赛审核", icon: "el-icon-s-claim" },
  //     },
  //   ],
  // },
];
// 超级管理员
export const SuperAdminMap = [
  // 双创班级
  {
    path: "/double-creation",
    component: Layout,
    meta: {
      title: "双创班基础信息管理",
      icon: "el-icon-s-unfold",
    },
    children: [
      {
        path: "description",
        component: () => import("@/views/double_creation/Introduction/index"),
        meta: {
          title: "双创班简介",
          icon: "el-icon-s-data",
        },
        children: [
          {
            hidden: true,
            path: "index/:page&:limit",
            component: () =>
              import("@/views/double_creation/Introduction/table1"),
            meta: {
              title: "内容列表",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/description",
            },
          },
        ],
      },
      {
        path: "student-data2",
        component: () => import("@/views/double_creation/student_data/index"),
        meta: { title: "学生信息", icon: "el-icon-s-data" },
        children: [
          {
            hidden: true,
            path: "index/:page&:limit",
            component: () =>
              import("@/views/double_creation/student_data/table"),
            meta: {
              title: "学生信息",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/student-data",
            },
          },
          {
            hidden: true,
            path: "add",
            component: () => import("@/views/double_creation/student_data/add"),
            meta: {
              title: "信息录入",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/student-data",
            },
          },
          {
            hidden: true,
            path: "edit/:form",
            component: () =>
              import("@/views/double_creation/student_data/edit"),
            meta: {
              title: "编辑",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/student-data",
            },
          },
          {
            hidden: true,
            path: "field",
            component: () =>
              import("@/views/double_creation/student_data/fields"),
            meta: {
              title: "动态字段",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/student-data",
            },
          },
        ],
      },
      {
        path: "graduate-data-2",
        component: () => import("@/views/double_creation/graduate_data/index"),
        meta: { title: "毕业生信息", icon: "el-icon-s-data" },
        children: [
          {
            hidden: true,
            path: "index/:page&:limit",
            component: () =>
              import("@/views/double_creation/graduate_data/table"),
            meta: {
              title: "内容列表",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/graduate-data",
            },
          },
          {
            hidden: true,
            path: "add",
            component: () =>
              import("@/views/double_creation/graduate_data/add"),
            meta: {
              title: "信息录入",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/graduate-data",
            },
          },
          {
            hidden: true,
            path: "edit/:form",
            component: () =>
              import("@/views/double_creation/graduate_data/edit"),
            meta: {
              title: "编辑",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/graduate-data",
            },
          },
          {
            hidden: true,
            path: "field",
            component: () =>
              import("@/views/double_creation/graduate_data/fields"),
            meta: {
              title: "动态字段",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/graduate-data",
            },
          },
        ],
      },

      {
        // path: "results",
        // meta: { title: "双创成果", icon: "el-icon-s-data" },
        // component: () => import("@/views/double_creation/results/index"),
        // children: [
        //   {
        path: "contest-winners",
        component: () =>
          import("@/views/double_creation/results/contestWinners/index"),
        meta: {
          title: "获奖信息管理",
          icon: "el-icon-s-data",
        },
        children: [
          {
            hidden: true,
            path: "index/:page&:limit",
            component: () =>
              import("@/views/double_creation/results/contestWinners/table1"),
            meta: {
              title: "内容列表",
              icon: "el-icon-s-data",
              activeMenu: "/double-creation/results/contest-winners",
            },
          },
        ],
        //   },
        // ],
      },
    ],
  },
  //就业信息
  {
    path: "/employment",
    component: Layout,
    meta: { title: "就业信息管理", icon: "el-icon-s-unfold" },
    children: [
      {
        path: "infomation",
        component: () => import("@/views/employment_info/index"),
        meta: {
          title: "就业信息",
          icon: "el-icon-s-unfold",
        },
        children: [
          {
            hidden: true,
            path: "table",
            component: () => import("@/views/employment_info/table"),
            meta: {
              title: "就业信息表格展示",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "chart",
            component: () => import("@/views/employment_info/chart"),
            meta: {
              title: "就业信息图表展示",
              icon: "el-icon-s-unfold",
            },
          },
        ],
      },
    ],
  },
  // 就业质量分析
  {
    path: "/signingRate",
    component: Layout,
    meta: { title: "就业质量分析", icon: "el-icon-s-unfold" },
    children: [
      {
        path: "infomation",
        component: () => import("@/views/signingRate/index"),
        meta: {
          title: "签约情况统计",
          icon: "el-icon-s-unfold",
        },
        children: [
          {
            hidden: true,
            path: "table",
            component: () => import("@/views/signingRate/table"),
            meta: {
              title: "签约情况统计表",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "chart",
            component: () => import("@/views/signingRate/chart"),
            meta: {
              title: "签约情况统计图",
              icon: "el-icon-s-unfold",
            },
          },
        ],
      },
    ],
  },
  // 招聘管理
  {
    path: "/recruitment",
    component: Layout,
    meta: { title: "招聘管理", icon: "el-icon-s-unfold" },
    children: [
      {
        path: "jobWanted",
        component: () => import("@/views/recruitment/jobWanted/index"),
        meta: {
          title: "求职用户管理",
          icon: "el-icon-s-unfold",
        },
        children: [
          {
            hidden: true,
            path: "resume",
            component: () => import("@/views/recruitment/jobWanted/resume"),
            meta: {
              title: "个人简历发布",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "jobWantedInfo",
            component: () =>
              import("@/views/recruitment/jobWanted/jobWantedInfo"),
            meta: {
              title: "求职申请提交",
              icon: "el-icon-s-unfold",
            },
          },
        ],
      },

      {
        path: "starLevel",
        component: () => import("@/views/recruitment/starLevel/index"),
        meta: {
          title: "星级评定",
          icon: "el-icon-s-unfold",
        },
      },
      {
        path: "recruitmentAgency",
        component: () => import("@/views/recruitment/recruitment_agency/index"),
        meta: {
          title: "招聘公司管理",
          icon: "el-icon-s-unfold",
        },
        children: [
          {
            hidden: true,
            path: "enterprise",
            component: () =>
              import("@/views/recruitment/recruitment_agency/enterprise"),
            meta: {
              title: "公司简介发布",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "position",
            component: () =>
              import("@/views/recruitment/recruitment_agency/position"),
            meta: {
              title: "职位发布",
              icon: "el-icon-s-unfold",
            },
          },
          {
            hidden: true,
            path: "jobExamine",
            component: () =>
              import("@/views/recruitment/recruitment_agency/jobExamine"),
            meta: {
              title: "求职审核",
              icon: "el-icon-s-unfold",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/double-creation-superAdmin",
    component: Layout,
    meta: {
      title: "超级管理员",
      icon: "el-icon-set-up",
    },
    children: [
      {
        path: "admin",
        component: () =>
          import("@/views/double_creation_superAdmin/admin/index"),
        meta: {
          title: "公司权限控制",
        },
      },
      // {
      //   path: "permission",
      //   component: () =>
      //     import("@/views/double_creation_superAdmin/Permissions/index"),
      //   meta: {
      //     title: "超级管理员权限",
      //   },
      // },
      {
        path: "competition2",
        component: () =>
          import("@/views/double_creation_superAdmin/competition/index"),
        meta: {
          title: "竞赛审核[待审核]",
        },
      },
    ],
  },
];
// 企业用户
export const companyMap = [
  // {
  //   path: "/recruitment",
  //   component: Layout,
  //   meta: { title: "招聘管理", icon: "el-icon-s-unfold" },
  //   children: [
  //     {
  //       path: "jobWanted",
  //       component: () => import("@/views/recruitment/jobWanted/index"),
  //       meta: {
  //         title: "求职用户管理",
  //         icon: "el-icon-s-unfold",
  //       },
  //       children: [
  //         {
  //           hidden: true,
  //           path: "resume",
  //           component: () => import("@/views/recruitment/jobWanted/resume"),
  //           meta: {
  //             title: "个人简历",
  //             icon: "el-icon-s-unfold",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "jobWantedInfo",
  //           component: () =>
  //             import("@/views/recruitment/jobWanted/jobWantedInfo"),
  //           meta: {
  //             title: "求职信息",
  //             icon: "el-icon-s-unfold",
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       path: "starLevel",
  //       component: () => import("@/views/recruitment/starLevel/index"),
  //       meta: {
  //         title: "星级评定",
  //         icon: "el-icon-s-unfold",
  //       },
  //     },
  //     {
  //       path: "recruitmentAgency",
  //       component: () => import("@/views/recruitment/recruitment_agency/index"),
  //       meta: {
  //         title: "招聘公司",
  //         icon: "el-icon-s-unfold",
  //       },
  //       children: [
  //         {
  //           hidden: true,
  //           path: "enterprise",
  //           component: () =>
  //             import("@/views/recruitment/recruitment_agency/enterprise"),
  //           meta: {
  //             title: "公司简介发布",
  //             icon: "el-icon-s-unfold",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "position",
  //           component: () =>
  //             import("@/views/recruitment/recruitment_agency/position"),
  //           meta: {
  //             title: "职位发布",
  //             icon: "el-icon-s-unfold",
  //           },
  //         },
  //         {
  //           hidden: true,
  //           path: "jobExamine",
  //           component: () =>
  //             import("@/views/recruitment/recruitment_agency/jobExamine"),
  //           meta: {
  //             title: "求职审核",
  //             icon: "el-icon-s-unfold",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
];

// console.log(store);

const createRouter = () =>
  new Router({
    mode: "hash", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// 测试--给与权限
// store.state.isSuperAdmin = true;
// store.state.isisSuperAdmin = true;
// store.state.isApprove = "company";

// 为路由器添加方法，实现动态路由，当用户权限变更时，运行
router.dynamicRouter = function dynamicRouter() {
  // 创建一个新路由，然后按权限往里面添加
  let routeMap = [];

  // 改需求之后
  // 超管
  console.log(
    getUserInfo().isisAdmin,
    getUserInfo().isisSuperAdmin,
    "路由管理权限1"
  );
  if (
    getUserInfo().isisAdmin === "true" &&
    getUserInfo().isisSuperAdmin === "true"
  ) {
    // 拼接路由数组
    routeMap.push(...constantRoutes);
    // routeMap.push(...adminMap);
    routeMap.push(...SuperAdminMap);

    // 没有下面这条语句，新加的路由就无法正常显示在导航栏中
    router.options.routes = routeMap;
    // 没有下面这条语句，新加的路由就无法正常跳转
    // router.addRoutes(routeMap);
    router.addRoutes(constantRoutes);
    // router.addRoutes(adminMap);
    router.addRoutes(SuperAdminMap);

    return;
  }
  // 普通管理
  if (
    getUserInfo().isisAdmin === "true" &&
    getUserInfo().isisSuperAdmin === "false"
  ) {
    // 拼接路由数组
    routeMap.push(...constantRoutes);
    routeMap.push(...adminMap);
    // 没有下面这条语句，新加的路由就无法正常显示在导航栏中
    router.options.routes = routeMap;
    // 没有下面这条语句，新加的路由就无法正常跳转
    router.addRoutes(constantRoutes);
    router.addRoutes(adminMap);
    return;
  }
  // 普通用户
  else {
    routeMap.push(...constantRoutes);
    routeMap.push(...studentMap);
    //test
    // routeMap.push(...adminMap);
    // routeMap.push(...SuperAdminMap);
    // routeMap.push(...companyMap);
    //test END

    router.options.routes = routeMap;
    router.addRoutes(constantRoutes);
    router.addRoutes(studentMap);

    //test
    // router.addRoutes(adminMap);
    // router.addRoutes(SuperAdminMap);
    // router.addRoutes(companyMap);
    //test END
  }
};
router.dynamicRouter();
// console.log("router.dynamicRouter() 语句被调用");

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
