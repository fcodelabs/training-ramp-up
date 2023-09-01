import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  Future<void> setEmail(String email) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(
      'email',
      email,
    );
  }

  Future<void> setRole(String role) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(
      'role',
      role,
    );
  }

  Future<bool> getDetails() async {
    final prefs = await SharedPreferences.getInstance();
    final email = prefs.getString('email');
    return email != null;
  }

  Future<void> clearDetails() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.clear();
  }

  Future<String> getEmail() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('email') ?? '';
  }

  Future<String> getRole() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('role') ?? '';
  }
}