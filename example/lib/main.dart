import 'package:flutter/material.dart';
import 'package:print_view_with_js/print_view_with_js.dart';
import 'package:jaguar/jaguar.dart';
import 'package:jaguar_flutter_asset/jaguar_flutter_asset.dart';

main() async {
  final server = new Jaguar();
  server.addApi(new FlutterAssetServer());
  await server.serve();

  server.log.onRecord.listen((r) => print(r));

  runApp(new DemoApp());
}

class DemoApp extends StatefulWidget {
  @override
  DemoAppState createState() => new DemoAppState();
}

class DemoAppState extends State<DemoApp> {
  String text = '';

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Pdf View Plugin Demo',
      home: new Scaffold(
          appBar: new AppBar(
            title: const Text('Pdf View Plugin Demo'),
          ),
          body: new Padding(
            padding: const EdgeInsets.all(24.0),
            child: new Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                new TextField(
                  decoration: const InputDecoration(
                    labelText: 'Text:',
                    hintText: 'Enter some text',
                  ),
                  maxLines: 4,
                  onChanged: (String value) => setState(() {
                        text = value;
                      }),
                ),
                new RaisedButton(
                  child: const Text('PDF View'),
                  onPressed: () {
                    printpdfview("http://127.0.0.1:8080/", "{title:'hello world test'}");
                  },
                ),
              ],
            ),
          )),
    );
  }
}
