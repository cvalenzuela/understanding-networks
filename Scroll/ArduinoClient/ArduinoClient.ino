// -----
// REST API CLIENT 
// Understanding Networks
// -----

#include <SPI.h>
#include <WiFi101.h>
#include "arduino_secrets.h"
#include "ArduinoJson.h"

char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

int status = WL_IDLE_STATUS;

// Configs
char server[] = "jas920.itp.io";
int port = 443;

const int buttonUp = 9;
const int buttonDown = 8;
int buttonStateUp = 0;
int buttonStateDown = 0;
const int ledPin =  13;  

WiFiSSLClient client;

// Main Setup
void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(buttonUp, INPUT);
  pinMode(buttonDown, INPUT);
  while (!Serial);

  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
    delay(1000);
  }
  Serial.println("Connected to wifi");
}

// Main Loop
void loop() {
  buttonStateUp = digitalRead(buttonUp);
  buttonStateDown = digitalRead(buttonDown);

  if (buttonStateUp == HIGH) {
    String PostData = "{\"direction\":\"up\"}";
    Serial.println("API Update to Up");
    digitalWrite(ledPin, HIGH);
    request("POST", "/submit", PostData);
  } else {
    digitalWrite(ledPin, LOW);
  }

  if (buttonStateDown == HIGH) {
    String PostData = "{\"direction\":\"down\"}";
    Serial.println("API Update to Down");
    digitalWrite(ledPin, HIGH);
    request("POST", "/submit", PostData);
  } else {
    digitalWrite(ledPin, LOW);
  }
  delay(300);
}

// Make a HTTP Request 
void request(String requestType, String endpoint, String PostData) {
  if (client.connect(server, port)) {
    client.println(requestType + " " + endpoint  + " HTTP/1.1");
    client.println("Host: " + String(server));
    client.println("User-Agent: Arduino/1.0");
    client.println("Connection: close");  
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(PostData.length());
    client.println();

    // Debug the response
    // String line = client.readStringUntil('}');
    // Serial.println(line);

    client.println(PostData);
    
    echo("Data Sent. Connection Closed.");

    char status[32] = {0};

    client.readBytesUntil('\r', status, sizeof(status));
    echo(status);
    char endOfHeaders[] = "\r\n\r\n";
    client.find(endOfHeaders);

    const size_t BUFFER_SIZE = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 60;
    DynamicJsonBuffer jsonBuffer(BUFFER_SIZE);
  
    JsonObject& root = jsonBuffer.parseObject(client);
  
    // Parse response values
    echo(root["api_status"].as<char*>());
    client.stop();
  }
}

// Utils to print to serial
void echo(const char* message) {
  Serial.println(message);
}






