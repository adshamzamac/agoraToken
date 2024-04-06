import 'package:http/http.dart' as http;
import 'dart:convert';

Future<String?> getAgoraToken({
  required String channelName,
}) async {
  // Replace 'your-basic-token' with your actual basic token
  final basicToken = 'your-basic-token';

  try {
    final response = await http.get(
      Uri.parse('https://repulsive-pig-rugby-shirt.cyclic.app/token?channelName=$channelName'),
      headers: {'Authorization': 'Bearer $basicToken'},
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['token'];
    } else {
      print('Error: ${response.reasonPhrase}');
    }
  } catch (e) {
    print('Error: $e');
  }

  return null;
}

// Example usage
void main() async {
  final channelName = 'myChannel';
  final agoraToken = await getAgoraToken(channelName: channelName);
  if (agoraToken != null) {
    print('Agora token for channel $channelName: $agoraToken');
  } else {
    print('Failed to retrieve Agora token');
  }
}
