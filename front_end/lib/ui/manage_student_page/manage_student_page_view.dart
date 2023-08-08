import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:front_end/models/student.dart';
import 'package:front_end/ui/home_page/home_page_bloc.dart';
import 'package:front_end/ui/home_page/home_page_event.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_bloc.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_event.dart';
import 'package:front_end/ui/manage_student_page/manage_student_page_state.dart';
import 'package:front_end/util/alert.dart';
import 'package:intl/intl.dart';

// ignore: must_be_immutable
class ManageStudentScreen extends StatelessWidget {
  ManageStudentScreen({super.key, required this.student}) {
    nameController.text = student.studentName;
    addressController.text = student.studentAddress;
    mobileNumberController.text = student.studentMobile;
    dateController.text =
        DateFormat('EEE MMM d yyyy').format(student.studentDob);
    dob = student.studentDob;
  }
  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController mobileNumberController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  final Student student;
  DateTime dob = DateTime.now();
  int age = 0;

  @override
  Widget build(BuildContext context) {
    ManageStudentScreenBloc manageStudentScreenBloc =
        BlocProvider.of<ManageStudentScreenBloc>(context);
    RampUpHomeScreenBloc rampUpHomeScreenBloc =
        BlocProvider.of<RampUpHomeScreenBloc>(context);
    return Scaffold(
      appBar: AppBar(
        elevation: 7,
        centerTitle: true,
        title: const Text('M A N A G E    S T U D E N T'),
        toolbarHeight: MediaQuery.of(context).size.height * 0.1,
      ),
      body: Container(
        height: double.infinity,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/img/background.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Card(
                color: Colors.white.withOpacity(0.8),
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Column(
                    children: [
                      Text(
                        student.studentName.toUpperCase(),
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 137, 91, 215),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        age == 0 ? "${calculateAge()} YEARS" : "$age YEARS",
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Colors.grey,
                        ),
                      ),
                      const SizedBox(height: 30),
                      TextField(
                        controller: nameController,
                        decoration: const InputDecoration(
                          labelText: "Name:",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(8.0),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 25),
                      TextField(
                        controller: addressController,
                        decoration: const InputDecoration(
                          labelText: "Address:",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(8.0),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 25),
                      TextField(
                        controller: mobileNumberController,
                        decoration: const InputDecoration(
                          labelText: "Mobile:",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(8.0),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 5),
                      TextFormField(
                        controller: dateController,
                        readOnly: true,
                        onTap: () => _selectDate(context),
                        decoration: const InputDecoration(
                          labelText: "Date of Birth:",
                          suffixIcon: Icon(Icons.calendar_today),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(
                            vertical: 12.0,
                            horizontal: 14.0,
                          ),
                        ),
                      ),
                      BlocBuilder<ManageStudentScreenBloc,
                          ManageStudentScreenState>(
                        buildWhen: (previous, current) =>
                            current.gender != previous.gender,
                        builder: (context, state) {
                          if (manageStudentScreenBloc.state.gender.isEmpty) {
                            manageStudentScreenBloc.state.gender =
                                student.studentGender;
                          }
                          return Row(
                            children: [
                              Radio(
                                value: "Male",
                                groupValue:
                                    manageStudentScreenBloc.state.gender,
                                onChanged: (value) {
                                  manageStudentScreenBloc.add(
                                    SelectGender(
                                      gender: value.toString(),
                                    ),
                                  );
                                },
                              ),
                              const Text("Male"),
                              Radio(
                                value: "Female",
                                groupValue:
                                    manageStudentScreenBloc.state.gender,
                                onChanged: (value) {
                                  manageStudentScreenBloc.add(
                                    SelectGender(
                                      gender: value.toString(),
                                    ),
                                  );
                                },
                              ),
                              const Text("Female"),
                            ],
                          );
                        },
                      ),
                      const SizedBox(height: 15),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          ElevatedButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                              rampUpHomeScreenBloc.add(
                                UpdateStudent(
                                  studentId: student.studentId,
                                  studentName: nameController.text.trim(),
                                  studentAddress: addressController.text.trim(),
                                  studentMobile:
                                      mobileNumberController.text.trim(),
                                  studentDob: dob,
                                  studentGender: manageStudentScreenBloc
                                      .state.gender
                                      .trim(),
                                ),
                              );
                              AlertShowToast.showToast(
                                "Successfully Updated..!",
                                Colors.green,
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.green,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8.0),
                              ),
                              elevation: 4,
                            ),
                            child: const Text("Update"),
                          ),
                          const SizedBox(width: 10.0),
                          ElevatedButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                              rampUpHomeScreenBloc.add(
                                DeleteStudent(
                                  id: student.studentId,
                                ),
                              );
                              AlertShowToast.showToast(
                                "Successfully Deleted..!",
                                Colors.red[400],
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red[400],
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8.0),
                              ),
                              elevation: 4,
                            ),
                            child: const Text("Delete"),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: student.studentDob,
      firstDate: DateTime(1995),
      lastDate: DateTime.now(),
    );
    if (picked != null && picked != student.studentDob) {
      dateController.text = DateFormat('EEE MMM d yyyy').format(picked);
      dob = picked;
    }
  }

  calculateAge() {
    DateTime date = DateTime.parse(student.studentDob.toString());
    DateTime now = DateTime.now();
    age = now.year - date.year;

    if (now.month < date.month ||
        (now.month == date.month && now.day < date.day)) {
      return age--;
    }
    return age;
  }
}