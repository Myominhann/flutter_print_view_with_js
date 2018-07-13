#import "PrintViewWithJsPlugin.h"
#import <print_view_with_js/print_view_with_js-Swift.h>

@implementation PrintViewWithJsPlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  [SwiftPrintViewWithJsPlugin registerWithRegistrar:registrar];
}
@end
