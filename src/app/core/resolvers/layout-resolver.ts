import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { PageLayout } from "../enums/Page-layout";
import { inject } from "@angular/core";
import { PageLayoutService } from "../services/page-layout/page-layout.service";

export const setLayout = (inputLayout: PageLayout): ResolveFn<void> => {
    return (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
        inject(PageLayoutService).setLayout(inputLayout)
    };
}