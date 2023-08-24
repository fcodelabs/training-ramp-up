import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/ui/manage_user_page/manage_user_page_event.dart';
import 'package:front_end/ui/manage_user_page/manage_user_page_state.dart';

class ManageUserScreenBloc
    extends Bloc<ManageUserScreenEvent, ManageUserScreenState> {
  ManageUserScreenBloc(BuildContext context)
      : super(const ManageUserScreenState());
}