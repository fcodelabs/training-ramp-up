import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ramp_up/ui/home_page/home_page_event.dart';
import 'package:ramp_up/ui/home_page/home_page_state.dart';

import '../../util/studentDTO.dart';

class HomePageBloc extends Bloc<HomePageEvent, HomePageState> {
  HomePageBloc() : super(HomePageState.initialState) {
    on<GetAllStudent>(_getAllStudent);
  }

  Future<FutureOr<void>> _getAllStudent(
      GetAllStudent event, Emitter<HomePageState> emit) async {
    addDummyData();
    emit(state.clone(students: await _getAllEvent()));
  }

  List<Student> dummyStudents = [];
  void addDummyData() {
    dummyStudents.add(
      Student(
        id: '1',
        name: 'John Doe',
        address: '123 Main St',
        mobileNumber: '555-1234',
        dob: '1995-01-01',
        gender: 'Male',
      ),
    );
    dummyStudents.add(
      Student(
        id: '2',
        name: 'Jane Smith',
        address: '456 Oak Ave',
        mobileNumber: '555-5678',
        dob: '1998-03-15',
        gender: 'Female',
      ),
    );
    dummyStudents.add(
      Student(
        id: '3',
        name: 'Michael Johnson',
        address: '789 Broadway',
        mobileNumber: '+1 555-9876',
        dob: '2000-02-10',
        gender: 'Male',
      ),
    );
  }

  Future<List<Student>> _getAllEvent() async {
    List<Student> getAll = dummyStudents.toList();
    return getAll
        .map(
          (e) => Student(
            id: e.id,
            name: e.name,
            address: e.address,
            mobileNumber: e.address,
            dob: e.dob,
            gender: e.gender,
          ),
        )
        .toList();
  }
}