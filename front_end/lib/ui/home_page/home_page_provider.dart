import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'home_page_bloc.dart';
import 'home_page_view.dart';

class HomePageProvider extends StatelessWidget {
  const HomePageProvider({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => HomePageBloc(context),
      child: const HomePageView(),
    );
  }
}