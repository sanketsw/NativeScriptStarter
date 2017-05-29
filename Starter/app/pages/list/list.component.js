"use strict";
var core_1 = require("@angular/core");
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
var SocialShare = require("nativescript-social-share");
var camera = require("nativescript-camera");
var image_1 = require("ui/image");
var image_source_1 = require("image-source");
var ListComponent = (function () {
    function ListComponent(groceryListService) {
        this.groceryListService = groceryListService;
        this.groceryList = [];
        this.grocery = "";
        this.isLoading = false;
        this.listLoaded = false;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.groceryListService.load()
            .subscribe(function (loadedGroceries) {
            loadedGroceries.forEach(function (groceryObject) {
                _this.groceryList.unshift(groceryObject);
            });
            _this.isLoading = false;
            _this.listLoaded = true;
        });
    };
    ListComponent.prototype.share = function () {
        var listString = this.groceryList
            .map(function (grocery) { return grocery.url; })
            .join(", ")
            .trim();
        SocialShare.shareText(listString);
    };
    ListComponent.prototype.add = function () {
        var _this = this;
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }
        // Dismiss the keyboard
        var textField = this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
        this.groceryListService.add(this.grocery)
            .subscribe(function (groceryObject) {
            _this.groceryList.unshift(groceryObject);
            _this.grocery = "";
        }, function () {
            alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
            _this.grocery = "";
        });
    };
    ListComponent.prototype.takePicture = function () {
        var _this = this;
        camera.requestPermissions();
        var isAvailable = camera.isAvailable();
        if (!isAvailable) {
            console.log('Camera is not available');
        }
        var options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: false
        };
        camera.takePicture(options)
            .then(function (imageAsset) {
            console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
            console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
            console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
            console.log("Result is an image asset instance");
            var img = new image_1.Image();
            img.src = imageAsset;
            image_source_1.fromAsset(imageAsset).then(function (res) {
                var myImageSource = res;
                //console.log(myImageSource.toBase64String('png'));
                _this.groceryListService.upload("data:image/png;base64," + myImageSource.toBase64String('png'))
                    .subscribe(function (groceryObject) {
                    _this.groceryList.unshift(groceryObject);
                    _this.grocery = "";
                }, function () {
                    alert({
                        message: "An error occurred while adding an item to your list.",
                        okButtonText: "OK"
                    });
                    _this.grocery = "";
                });
            });
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    ListComponent.prototype.delete = function (item) {
        var _this = this;
        this.groceryListService.delete(item.id)
            .subscribe(
        // Running the array splice in a zone ensures that change detection gets triggered.
        function () {
            var index = _this.groceryList.indexOf(item);
            _this.groceryList.splice(index, 1);
        });
    };
    ListComponent.prototype.deleteImage = function (item) {
        var _this = this;
        console.log('deleting' + item.id);
        this.groceryListService.deleteImage(item.id)
            .subscribe(
        // Running the array splice in a zone ensures that change detection gets triggered.
        function () {
            var index = _this.groceryList.indexOf(item);
            _this.groceryList.splice(index, 1);
        });
    };
    __decorate([
        core_1.ViewChild("groceryTextField"), 
        __metadata('design:type', core_1.ElementRef)
    ], ListComponent.prototype, "groceryTextField", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: "list",
            templateUrl: "pages/list/list.html",
            styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
            providers: [grocery_list_service_1.GroceryListService]
        }), 
        __metadata('design:paramtypes', [grocery_list_service_1.GroceryListService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBS08sZUFBZSxDQUFDLENBQUE7QUFJdkIscUNBRU8sMkNBQTJDLENBQUMsQ0FBQTtBQUluRCxJQUFZLFdBQVcsV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3pELElBQVksTUFBTSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDOUMsc0JBRU8sVUFBVSxDQUFDLENBQUE7QUFDbEIsNkJBR08sY0FBYyxDQUFDLENBQUE7QUFTdEI7SUFPRSx1QkFBb0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFOMUQsZ0JBQVcsR0FBc0IsRUFBRSxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFHMEMsQ0FBQztJQUU5RCxnQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFO2FBQzNCLFNBQVMsQ0FBQyxVQUFBLGVBQWU7WUFDeEIsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLGFBQWE7Z0JBQ3BDLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsNkJBQUssR0FBTDtRQUNFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXO2FBQzlCLEdBQUcsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8s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MkRBQUE7SUFYaEM7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxxQkFBcUIsQ0FBQztZQUNoRSxTQUFTLEVBQUUsQ0FBQyx5Q0FBa0IsQ0FBQztTQUNoQyxDQUFDOztxQkFBQTtJQTRIRixvQkFBQztBQUFELENBQUMsQUEzSEQsSUEySEM7QUEzSFkscUJBQWEsZ0JBMkh6QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgR3JvY2VyeVxufSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dyb2NlcnkvZ3JvY2VyeVwiO1xuaW1wb3J0IHtcbiAgR3JvY2VyeUxpc3RTZXJ2aWNlXG59IGZyb20gXCIuLi8uLi9zaGFyZWQvZ3JvY2VyeS9ncm9jZXJ5LWxpc3Quc2VydmljZVwiO1xuaW1wb3J0IHtcbiAgVGV4dEZpZWxkXG59IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgKiBhcyBTb2NpYWxTaGFyZSBmcm9tIFwibmF0aXZlc2NyaXB0LXNvY2lhbC1zaGFyZVwiO1xuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XG5pbXBvcnQge1xuICBJbWFnZVxufSBmcm9tIFwidWkvaW1hZ2VcIjtcbmltcG9ydCB7XG4gIEltYWdlU291cmNlLFxuICBmcm9tQXNzZXRcbn0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJsaXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2xpc3QvbGlzdC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbGlzdC9saXN0LWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9saXN0L2xpc3QuY3NzXCJdLFxuICBwcm92aWRlcnM6IFtHcm9jZXJ5TGlzdFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBncm9jZXJ5TGlzdDogQXJyYXkgPCBHcm9jZXJ5ID4gPSBbXTtcbiAgZ3JvY2VyeSA9IFwiXCI7XG4gIGlzTG9hZGluZyA9IGZhbHNlO1xuICBsaXN0TG9hZGVkID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoXCJncm9jZXJ5VGV4dEZpZWxkXCIpIGdyb2NlcnlUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncm9jZXJ5TGlzdFNlcnZpY2U6IEdyb2NlcnlMaXN0U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UubG9hZCgpXG4gICAgICAuc3Vic2NyaWJlKGxvYWRlZEdyb2NlcmllcyA9PiB7XG4gICAgICAgIGxvYWRlZEdyb2Nlcmllcy5mb3JFYWNoKChncm9jZXJ5T2JqZWN0KSA9PiB7XG4gICAgICAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnlPYmplY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICB9XG4gIHNoYXJlKCkge1xuICAgIGxldCBsaXN0U3RyaW5nID0gdGhpcy5ncm9jZXJ5TGlzdFxuICAgICAgLm1hcChncm9jZXJ5ID0+IGdyb2NlcnkudXJsKVxuICAgICAgLmpvaW4oXCIsIFwiKVxuICAgICAgLnRyaW0oKTtcbiAgICBTb2NpYWxTaGFyZS5zaGFyZVRleHQobGlzdFN0cmluZyk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgaWYgKHRoaXMuZ3JvY2VyeS50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiRW50ZXIgYSBncm9jZXJ5IGl0ZW1cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRGlzbWlzcyB0aGUga2V5Ym9hcmRcbiAgICBsZXQgdGV4dEZpZWxkID0gPCBUZXh0RmllbGQgPiB0aGlzLmdyb2NlcnlUZXh0RmllbGQubmF0aXZlRWxlbWVudDtcbiAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuXG4gICAgdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UuYWRkKHRoaXMuZ3JvY2VyeSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIGdyb2NlcnlPYmplY3QgPT4ge1xuICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3QudW5zaGlmdChncm9jZXJ5T2JqZWN0KTtcbiAgICAgICAgICB0aGlzLmdyb2NlcnkgPSBcIlwiO1xuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgYW4gaXRlbSB0byB5b3VyIGxpc3QuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuZ3JvY2VyeSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIClcbiAgfVxuXG4gIHRha2VQaWN0dXJlKCkge1xuICAgIGNhbWVyYS5yZXF1ZXN0UGVybWlzc2lvbnMoKTtcbiAgICB2YXIgaXNBdmFpbGFibGUgPSBjYW1lcmEuaXNBdmFpbGFibGUoKTtcbiAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XG4gICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGlzIG5vdCBhdmFpbGFibGUnKVxuICAgIH1cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHdpZHRoOiAzMDAsXG4gICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgIGtlZXBBc3BlY3RSYXRpbzogdHJ1ZSxcbiAgICAgIHNhdmVUb0dhbGxlcnk6IGZhbHNlXG4gICAgfTtcbiAgICBjYW1lcmEudGFrZVBpY3R1cmUob3B0aW9ucylcbiAgICAgIC50aGVuKChpbWFnZUFzc2V0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2l6ZTogXCIgKyBpbWFnZUFzc2V0Lm9wdGlvbnMud2lkdGggKyBcInhcIiArIGltYWdlQXNzZXQub3B0aW9ucy5oZWlnaHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImtlZXBBc3BlY3RSYXRpbzogXCIgKyBpbWFnZUFzc2V0Lm9wdGlvbnMua2VlcEFzcGVjdFJhdGlvKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQaG90byBzYXZlZCBpbiBQaG90b3MvR2FsbGVyeSBmb3IgQW5kcm9pZCBvciBpbiBDYW1lcmEgUm9sbCBmb3IgaU9TXCIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0IGlzIGFuIGltYWdlIGFzc2V0IGluc3RhbmNlXCIpO1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSBpbWFnZUFzc2V0O1xuXG4gICAgICAgIGZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IG15SW1hZ2VTb3VyY2U6IEltYWdlU291cmNlID0gcmVzO1xuICAgICAgICAgIC8vY29uc29sZS5sb2cobXlJbWFnZVNvdXJjZS50b0Jhc2U2NFN0cmluZygncG5nJykpO1xuXG4gICAgICAgICAgdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UudXBsb2FkKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LFwiICsgbXlJbWFnZVNvdXJjZS50b0Jhc2U2NFN0cmluZygncG5nJykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICBncm9jZXJ5T2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb2NlcnlMaXN0LnVuc2hpZnQoZ3JvY2VyeU9iamVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm9jZXJ5ID0gXCJcIjtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIGFuIGl0ZW0gdG8geW91ciBsaXN0LlwiLFxuICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb2NlcnkgPSBcIlwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG5cblxuXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLT4gXCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZShpdGVtOiBHcm9jZXJ5KSB7XG4gICAgdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UuZGVsZXRlKGl0ZW0uaWQpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAvLyBSdW5uaW5nIHRoZSBhcnJheSBzcGxpY2UgaW4gYSB6b25lIGVuc3VyZXMgdGhhdCBjaGFuZ2UgZGV0ZWN0aW9uIGdldHMgdHJpZ2dlcmVkLlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5ncm9jZXJ5TGlzdC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBkZWxldGVJbWFnZShpdGVtOiBHcm9jZXJ5KSB7XG4gICAgY29uc29sZS5sb2coJ2RlbGV0aW5nJyArIGl0ZW0uaWQpXG4gICAgdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UuZGVsZXRlSW1hZ2UoaXRlbS5pZClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIC8vIFJ1bm5pbmcgdGhlIGFycmF5IHNwbGljZSBpbiBhIHpvbmUgZW5zdXJlcyB0aGF0IGNoYW5nZSBkZXRlY3Rpb24gZ2V0cyB0cmlnZ2VyZWQuXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdyb2NlcnlMaXN0LmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgdGhpcy5ncm9jZXJ5TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9KTtcbiAgfVxufSJdfQ==