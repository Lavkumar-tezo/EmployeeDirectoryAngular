import { Routes } from '@angular/router';
import { AuthorizedLayoutComponent } from './layouts/authorized-layout/authorized-layout.component';
import { setLayout } from './core/resolvers/layout-resolver';
import { PageLayout } from './core/enums/Page-layout';
import { authGuard } from './core/guards/auth.guard';
import { UnauthorizedLayoutComponent } from './layouts/unauthorized-layout/unauthorized-layout.component';
import { EmployeeMainComponent } from './features/employee-main/employee-main.component';
import { EmployeeComponent } from './features/employee-main/employee/employee.component';
import { EmployeeTableComponent } from './features/employee-main/employee-table/employee-table.component';
import { EmployeeFormComponent } from './shared/components/employee-form/employee-form.component';
import { RoleMainComponent } from './features/role-main/role-main.component';
import { RoleComponent } from './features/role-main/role/role.component';
import { RoleFormComponent } from './features/role-main/role-form/role-form.component';
import { RoleDetailComponent } from './features/role-main/role-detail/role-detail.component';
import { ErrorLayoutComponent } from './layouts/error-layout/error-layout.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path:"login",
        resolve:{
            layout:setLayout(PageLayout.UnAuthorized)
        },
        component:UnauthorizedLayoutComponent
    },
    {
        path:"",
        canActivate:[authGuard],
        resolve:{
            layout:setLayout(PageLayout.Authorized)
        },
        children:[
            {
                path:"",
                redirectTo:"employees",
                pathMatch:"full"
            },
            {
                path:"employees",
                component:EmployeeMainComponent,
                children:[
                    {
                        path:"",
                        component:EmployeeComponent
                    },
                    {
                        path: "employeeform",
                        component: EmployeeFormComponent
                    },
                    {
                        path: "employeeform/:id",
                        component: EmployeeFormComponent
                    }
                ]
            },
            {
                path: 'roles',
                component: RoleMainComponent,
                children: [
                    {
                        path: "",
                        component: RoleComponent
                    },
                    {
                        path: "roleform",
                        component: RoleFormComponent
                    },
                    {
                        path: "roleform/:id",
                        component: RoleFormComponent
                    },
                    {
                        path: ":id",
                        component: RoleDetailComponent
                    }
                ]
            }
        ]
    },
    {
        path:"**",
        resolve:{
            layout:setLayout(PageLayout.Error)
        },
        component:ErrorLayoutComponent
    }
];
