package com.lagerstro.printviewwithjs;

import android.content.Context;
import android.graphics.Bitmap;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.print.PrintDocumentAdapter;
import android.util.Log;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.PluginRegistry.Registrar;

/**
 * PrintViewWithJsPlugin
 */
public class PrintViewWithJsPlugin implements MethodChannel.MethodCallHandler {
  /**
   * Plugin registration.
   */
  public static void registerWith(Registrar registrar) {
    final MethodChannel channel = new MethodChannel(registrar.messenger(), "printpdfview");
    PrintViewWithJsPlugin instance = new PrintViewWithJsPlugin(registrar);
    channel.setMethodCallHandler(instance);
  }
  private final Registrar mRegistrar;

  private PrintViewWithJsPlugin(Registrar registrar) {
    this.mRegistrar = registrar;
  }

  @Override
  public void onMethodCall(MethodCall call, MethodChannel.Result result) {
    if (call.method.equals("printpdfview")) {
      String url = call.argument("url").toString();
      String data = call.argument("data").toString();
      showReport(url,data);
      result.success(null);

    } else {
      result.notImplemented();
    }
  }

  WebView webView;

  private void showReport(String url, String data) {
      final String printdata = data;
    webView = new WebView(mRegistrar.context());
      webView.getSettings().setSupportZoom(true);
      webView.getSettings().setBuiltInZoomControls(true);
      webView.getSettings().setLoadWithOverviewMode(true);
      webView.getSettings().setUseWideViewPort(true);
      webView.getSettings().setJavaScriptEnabled(true);
      webView.getSettings().setDomStorageEnabled(true);
      webView.getSettings().setPluginState(WebSettings.PluginState.ON);
    //webView.loadDataWithBaseURL(null, url, "text/HTML", "UTF-8", null);
      webView.loadUrl(url);
    webView.setWebViewClient(new WebViewClient(){
      @Override
      public void onPageStarted(WebView view, String url, Bitmap favicon) {
        super.onPageStarted(view, url, favicon);
      }

      @Override
      public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);

        webView.evaluateJavascript("render("+ printdata +");", new ValueCallback<String>() {
          @Override
          public void onReceiveValue(String value) {
            Log.d("return", value);
            createprintjob(webView);
          }
        });
      }
    });

  }

  private void createprintjob(WebView webView){
    PrintManager printManager = (PrintManager) mRegistrar.activity().getSystemService(Context.PRINT_SERVICE);

    PrintDocumentAdapter printAdapter = webView.createPrintDocumentAdapter();

    String jobName = "Pdf View Print Test";

    PrintAttributes attrib = new PrintAttributes.Builder().
            setMediaSize(PrintAttributes.MediaSize.ISO_A4.asPortrait()).
            setMinMargins(PrintAttributes.Margins.NO_MARGINS).
            build();
    printManager.print(jobName, printAdapter, attrib);
  }
}
