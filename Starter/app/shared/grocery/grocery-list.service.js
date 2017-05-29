"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var config_1 = require("../config");
var grocery_1 = require("./grocery");
var GroceryListService = (function () {
    function GroceryListService(http) {
        this.http = http;
    }
    GroceryListService.prototype.load = function () {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + config_1.Config.token2);
        return this.http.get(config_1.Config.apiUrl2 + "resources/image/", {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var groceryList = [];
            console.dir(data);
            data.resources.forEach(function (grocery) {
                var url = grocery.secure_url;
                groceryList.push(new grocery_1.Grocery(grocery.public_id, url));
            });
            return groceryList;
        })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    GroceryListService.prototype.upload = function (image) {
        //console.log('called')
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + config_1.Config.token2);
        headers.append("Content-Type", "application/json");
        //console.dir(image)
        return this.http.post(config_1.Config.apiUrl2 + "image/upload", JSON.stringify({
            "file": image,
            "upload_preset": "amqxwue2"
        }), {
            headers: headers
        })
            .map(function (res) {
            console.log(res);
            return res.json();
        })
            .map(function (data) {
            console.dir(data);
            console.dir(data.secure_url);
            return new grocery_1.Grocery(data.public_id, data.secure_url);
        })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.add = function (name) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Bearer " + config_1.Config.token);
        headers.append("Content-Type", "application/json");
        return this.http.post(config_1.Config.apiUrl + "Groceries", JSON.stringify({
            Name: name
        }), {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            return new grocery_1.Grocery(data.Result.Id, name);
        })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.delete = function (id) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Bearer " + config_1.Config.token);
        headers.append("Content-Type", "application/json");
        return this.http.delete(config_1.Config.apiUrl + "Groceries/" + id, {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.deleteImage = function (id) {
        console.log('deleting' + id);
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + config_1.Config.token2);
        headers.append("Content-Type", "application/json");
        return this.http.delete(config_1.Config.apiUrl2 + "resources/image/upload?public_ids[]=" + id, {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    GroceryListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GroceryListService);
    return GroceryListService;
}());
exports.GroceryListService = GroceryListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncm9jZXJ5LWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBRU8sZUFBZSxDQUFDLENBQUE7QUFDdkIscUJBSU8sZUFBZSxDQUFDLENBQUE7QUFDdkIsbUJBRU8sU0FBUyxDQUFDLENBQUE7QUFDakIsUUFBTyx1QkFBdUIsQ0FBQyxDQUFBO0FBRS9CLHVCQUVPLFdBQVcsQ0FBQyxDQUFBO0FBQ25CLHdCQUVPLFdBQVcsQ0FBQyxDQUFBO0FBTW5CO0lBQ0UsNEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUcsQ0FBQztJQUVsQyxpQ0FBSSxHQUFKO1FBQ0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxRQUFRLEdBQUcsZUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQixFQUFFO1lBQ3RELE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUM7YUFDRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDO2FBQ3RCLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDUCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87Z0JBQzdCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUE7Z0JBQzVCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUs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OlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgSHR0cCxcbiAgSGVhZGVycyxcbiAgUmVzcG9uc2Vcbn0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7XG4gIE9ic2VydmFibGVcbn0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5pbXBvcnQge1xuICBDb25maWdcbn0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHtcbiAgR3JvY2VyeVxufSBmcm9tIFwiLi9ncm9jZXJ5XCI7XG5pbXBvcnQge1xuICBJbWFnZVxufSBmcm9tIFwidWkvaW1hZ2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyb2NlcnlMaXN0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge31cblxuICBsb2FkKCkge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJCYXNpYyBcIiArIENvbmZpZy50b2tlbjIpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoQ29uZmlnLmFwaVVybDIgKyBcInJlc291cmNlcy9pbWFnZS9cIiwge1xuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICB9KVxuICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5tYXAoZGF0YSA9PiB7XG4gICAgICAgIGxldCBncm9jZXJ5TGlzdCA9IFtdO1xuICAgICAgICBjb25zb2xlLmRpcihkYXRhKVxuICAgICAgICBkYXRhLnJlc291cmNlcy5mb3JFYWNoKChncm9jZXJ5KSA9PiB7XG4gICAgICAgICAgbGV0IHVybCA9IGdyb2Nlcnkuc2VjdXJlX3VybFxuICAgICAgICAgIGdyb2NlcnlMaXN0LnB1c2gobmV3IEdyb2NlcnkoZ3JvY2VyeS5wdWJsaWNfaWQsIHVybCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGdyb2NlcnlMaXN0O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cblxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG5cbiAgdXBsb2FkKGltYWdlOiBhbnkpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdjYWxsZWQnKVxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJCYXNpYyBcIiArIENvbmZpZy50b2tlbjIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAvL2NvbnNvbGUuZGlyKGltYWdlKVxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgQ29uZmlnLmFwaVVybDIgKyBcImltYWdlL3VwbG9hZFwiLFxuICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgXCJmaWxlXCI6IGltYWdlLFxuICAgICAgICAgIFwidXBsb2FkX3ByZXNldFwiOiBcImFtcXh3dWUyXCJcbiAgICAgICAgfSksIHtcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5tYXAocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICByZXR1cm4gcmVzLmpzb24oKX0pXG4gICAgICAubWFwKGRhdGEgPT4ge1xuICAgICAgICBjb25zb2xlLmRpcihkYXRhKVxuICAgICAgICBjb25zb2xlLmRpcihkYXRhLnNlY3VyZV91cmwpXG4gICAgICAgIHJldHVybiBuZXcgR3JvY2VyeShkYXRhLnB1YmxpY19pZCwgZGF0YS5zZWN1cmVfdXJsKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG5cblxuXG4gIGFkZChuYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgQ29uZmlnLnRva2VuKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgIENvbmZpZy5hcGlVcmwgKyBcIkdyb2Nlcmllc1wiLFxuICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgTmFtZTogbmFtZVxuICAgICAgICB9KSwge1xuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5tYXAoZGF0YSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgR3JvY2VyeShkYXRhLlJlc3VsdC5JZCwgbmFtZSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuXG4gIGRlbGV0ZShpZDogc3RyaW5nKSB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIENvbmZpZy50b2tlbik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoXG4gICAgICAgIENvbmZpZy5hcGlVcmwgKyBcIkdyb2Nlcmllcy9cIiArIGlkLCB7XG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9XG4gICAgICApXG4gICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuXG4gIGRlbGV0ZUltYWdlKGlkOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZygnZGVsZXRpbmcnICsgaWQpXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkJhc2ljIFwiICsgQ29uZmlnLnRva2VuMik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoXG4gICAgICAgIENvbmZpZy5hcGlVcmwyICsgXCJyZXNvdXJjZXMvaW1hZ2UvdXBsb2FkP3B1YmxpY19pZHNbXT1cIiArIGlkLCB7XG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9XG4gICAgICApXG4gICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxufSJdfQ==