import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ramp_up/ui/home_page/home_page_bloc.dart';

import '../../theme/primary_theme.dart';
import '../home_page/home_page_view.dart';

class RampUpApp extends StatelessWidget {
  const RampUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    final materialApp = MaterialApp(
      title: 'RampUp App',
      theme: appThemeData,
      debugShowCheckedModeBanner: false,
      home: const HomePageView(),
    );

    return MultiBlocProvider(
      providers: [
        BlocProvider<HomePageBloc>(
          create: (context) => HomePageBloc(context),
        ),
      ],
      child: materialApp,
    );
  }
}