"use strict";
function setHintColor(args) {
    if (args.view.android) {
        args.view.android.setHintTextColor(args.color.android);
    }
    if (args.view.ios) {
        var dictionary = new NSDictionary([args.color.ios], [NSForegroundColorAttributeName]);
        args.view.ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(args.view.hint, dictionary);
    }
}
exports.setHintColor = setHintColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC11dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGludC11dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQSxzQkFBNkIsSUFBdUM7SUFDbEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLFVBQVUsR0FBRyxJQUFJLFlBQVksQ0FDL0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUNoQixDQUFDLDhCQUE4QixDQUFDLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsQ0FDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDaEMsQ0FBQztBQUNILENBQUM7QUFaZSxvQkFBWSxlQVkzQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5cbmRlY2xhcmUgdmFyIE5TQXR0cmlidXRlZFN0cmluZzogYW55O1xuZGVjbGFyZSB2YXIgTlNEaWN0aW9uYXJ5OiBhbnk7XG5kZWNsYXJlIHZhciBOU0ZvcmVncm91bmRDb2xvckF0dHJpYnV0ZU5hbWU6IGFueTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhpbnRDb2xvcihhcmdzOiB7IHZpZXc6IFRleHRGaWVsZCwgY29sb3I6IENvbG9yIH0pIHtcbiAgaWYgKGFyZ3Mudmlldy5hbmRyb2lkKSB7XG4gICAgYXJncy52aWV3LmFuZHJvaWQuc2V0SGludFRleHRDb2xvcihhcmdzLmNvbG9yLmFuZHJvaWQpO1xuICB9XG4gIGlmIChhcmdzLnZpZXcuaW9zKSB7XG4gICAgbGV0IGRpY3Rpb25hcnkgPSBuZXcgTlNEaWN0aW9uYXJ5KFxuICAgICAgW2FyZ3MuY29sb3IuaW9zXSxcbiAgICAgIFtOU0ZvcmVncm91bmRDb2xvckF0dHJpYnV0ZU5hbWVdXG4gICAgKTtcbiAgICBhcmdzLnZpZXcuaW9zLmF0dHJpYnV0ZWRQbGFjZWhvbGRlciA9IE5TQXR0cmlidXRlZFN0cmluZy5hbGxvYygpLmluaXRXaXRoU3RyaW5nQXR0cmlidXRlcyhcbiAgICAgIGFyZ3Mudmlldy5oaW50LCBkaWN0aW9uYXJ5KTtcbiAgfVxufSJdfQ==