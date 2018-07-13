import 'dart:async';

import 'package:flutter/services.dart';


  const MethodChannel _channel =
      const MethodChannel('printpdfview');

  Future<dynamic> printpdfview(String url, String data){
    assert(url != null && url.isNotEmpty);

    Map<String,dynamic> args = <String,dynamic>{};
    args.putIfAbsent("url", ()=>url);
    args.putIfAbsent("data", ()=>data);

    return _channel.invokeMethod("printpdfview", args);
  }

