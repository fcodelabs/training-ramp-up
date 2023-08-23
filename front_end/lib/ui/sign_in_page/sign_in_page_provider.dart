import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'sign_in_page_bloc.dart';
import 'sign_in_page_view.dart';

class SignInPageProvider extends BlocProvider<SignInPageBloc> {
  SignInPageProvider({Key? key})
      : super(
          key: key,
          create: (context) => SignInPageBloc(),
          child: const SignInPageView(),
        );
}
