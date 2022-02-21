import clientSchema from "../forms/client";
import clientNotesSchema from "../forms/clientNote";
import task from "../forms/task";
// import timesheet from "../forms/timesheet";

export default {
  menus: [
    {
      name: "Task Manager",
      icon: "list-task",
      routerLink: "/AllTasks",
      active: true,
    },
    {
      name: "Client Manager",
      icon: "person-lines-fill",
      routerLink: "/AllClients",
    },
    // {
    //   name: "Task Manager",
    //   icon: "list-task",
    //   subMenus: [
    //     {
    //       name: "Add Task",
    //       icon: "plus",
    //       routerLink: {
    //         name: "CreateEntity",
    //         params: { schema: task, routerPath: "createtask" },
    //       },
    //     },
    //     {
    //       name: "All Tasks",
    //       icon: "list-check",
    //       routerLink: "/AllTasks",
    //     },
    //   ],
    // },

    // {
    //   name: "Client Manager",
    //   icon: "diagram3-fill",
    //   subMenus: [
    //     {
    //       name: "Add Client",
    //       icon: "person-plus",
    //       routerLink: {
    //         name: "CreateEntity",
    //         params: { schema: clientSchema, routerPath: "createClient" },
    //       },
    //     },
    //     {
    //       name: "All Clients",
    //       icon: "person-lines-fill",
    //       routerLink: "/AllClients",
    //     },
    //     {
    //       name: "Add Client Notes",
    //       icon: "card-text",
    //       routerLink: {
    //         name: "CreateEntity",
    //         params: { schema: clientNotesSchema, routerPath: "CreateClientNotes" },
    //       },
    //     },
    //   ],
    // },

    {
      name: "Configuration",
      icon: "alarm-fill",
      subMenus: [
        {
          name: "Manage Dropdowns",
          icon: "gear",
          routerLink: { name: "Dropdowns" },
        },
        // {
        //   name: "Admin",
        //   icon: "gear",
        //   routerLink: { name: "Admin" },
        // },

        // {
        //   name: "Manage Users",
        //   icon: "gear",
        //   routerLink: {
        //     name: "ManageUsers",
        //     params: {
        //       name: "tbl_user",
        //       title: "Users",
        //       items: [],
        //       header: ["id", "user", "actions"],
        //       schema: userSchema,
        //     },
        //   },
        // },
      ],
    },
    // {
    //   name: "Timesheet Manager",
    //   icon: "alarm-fill",
    //   subMenus: [
    //     {
    //       name: "Create Timesheet",
    //       icon: "calendar",
    //       routerLink: {
    //         name: "CreateEntity",
    //         params: { schema: timesheet, routerPath: "createtimesheet" },
    //       },
    //     },
    //     {
    //       name: "All Timesheets",
    //       icon: "newspaper",
    //       routerLink: "/AllTimesheets",
    //     },
    //   ],
    // },
    // {
    //   name: "Update Client Info",
    //   icon: "person-plus-fill",
    //   routerLink: "/CreateClientInfo",
    // },
    // {
    //   name: "Users",
    //   subMenus: [
    //     {
    //       name: "Add Users",
    //       icon: "person-plus-fill",
    //       routerLink: "",
    //     },
    //     {
    //       name: "All Users",
    //       icon: "people-fill",
    //       routerLink: "/AllUsers",
    //     },
    //   ],
    // },
    // {
    //   name: "Settings",
    //   icon: "alarm-fill",
    //   subMenus: [
    //     {
    //       name: "Add Activity Type",
    //       icon: "person-plus-fill",
    //       routerLink: {
    //         name: "managedropdown",
    //         params: { schema: activityTypeSchema, routerPath: "activityType" },
    //       },
    //     },
    //     {
    //       name: "Add Task Type",
    //       icon: "person-plus-fill",
    //       routerLink: {
    //         name: "managedropdown",
    //         params: { schema: taskTypeSchema, routerPath: "taskType" },
    //       },
    //     },
    //     {
    //       name: "Add Client Type",
    //       icon: "person-plus-fill",
    //       routerLink: {
    //         name: "managedropdown",
    //         params: { schema: clientTypeSchema, routerPath: "clientType" },
    //       },
    //     },
    //     {
    //       name: "Add Client",
    //       icon: "person-plus-fill",
    //       routerLink: {
    //         name: "managedropdown",
    //         params: { schema: clientSchema, routerPath: "client" },
    //       },
    //     },
    //     {
    //       name: "Add Company Type",
    //       icon: "person-plus",
    //       routerLink: {
    //         name: "managedropdown",
    //         params: { schema: companyTypeSchema, routerPath: "companyType" },
    //       },
    //     },
    //     {
    //       name: "Add Periodicity",
    //       icon: "person-plus",
    //       routerLink: {
    //         name: "managedropdown",
    //         params: { schema: periodicitySchema, routerPath: "periodicity" },
    //       },
    //     },
    //   ],
    // },
  ],
};
