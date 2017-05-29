"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var home_routes_1 = require("./home.routes");
var home_component_1 = require("./home.component");
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
                home_routes_1.homeRouting
            ],
            declarations: [
                home_component_1.HomeComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLHlCQUFtQywrQkFBK0IsQ0FBQyxDQUFBO0FBRW5FLDRCQUE0QixlQUFlLENBQUMsQ0FBQTtBQUM1QywrQkFBOEIsa0JBQWtCLENBQUMsQ0FBQTtBQVdqRDtJQUFBO0lBQXlCLENBQUM7SUFUMUI7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsNkJBQWtCO2dCQUNsQix5QkFBVzthQUNaO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDhCQUFhO2FBQ2Q7U0FDRixDQUFDOztrQkFBQTtJQUN1QixpQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixrQkFBVSxhQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9wbGF0Zm9ybVwiO1xuXG5pbXBvcnQgeyBob21lUm91dGluZyB9IGZyb20gXCIuL2hvbWUucm91dGVzXCI7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBob21lUm91dGluZ1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBIb21lQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSG9tZU1vZHVsZSB7fSJdfQ==