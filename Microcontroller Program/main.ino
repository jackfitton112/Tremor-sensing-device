
#include <HTTPClient.h>
//includes required libaries
//wifi comms
#include <WiFi.h>
//wire for i2C comms
#include <Wire.h>
//LSM303 for sensor
#include <LSM303.h>

// defines LSM303 as "compass"
LSM303 compass;

///////////////////////////////////////////////////////////////////////////////

// defines wifi credentials
const char* ssid = "Laptop";
const char* password = "password";



///////////////////////////////////////////////////////////////////////////////

//defines array for data to be stored in
int arrayx[50];
int arrayy[50];
int arrayz[50];

int indexer;

int current_time;
int endtime;

///////////////////////////////////////////////////////////////////////////////

String x;
String y;
String z;


void setup() {
  // starts serial monitor
  Serial.begin(115200);

  indexer = 0;
  //begins wifi (tries to connect with credentials above)
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  // prints local IP address
  Serial.println(WiFi.localIP());

  Wire.begin();
  // starts compass
  compass.init();
  compass.enableDefault();

}

void loop() {

  current_time = millis();

    
    if (indexer < 51 ){

      if (endtime+20 < current_time){
          compass.read();
          arrayx[indexer] = compass.a.x;
          arrayy[indexer] = compass.a.y;
          arrayz[indexer] = compass.a.z;
          Serial.println(arrayx[indexer]);
          indexer = indexer +1;
          endtime = current_time;
        }

  } else {

    for (int i = 0; i < 50; i++) {

      x.concat(arrayx[i]);
      x.concat(",");
      y.concat(arrayy[i]);
      y.concat(",");
      z.concat(arrayz[i]);
      z.concat(",");
    }

    Serial.println(x);

    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;


      String serverName = "http://med.clockr.net/storedata.php";
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);
      
      // If you need an HTTP request with a content type: application/json, use the following:
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST("{\"x\":\"" + x + "\",\"y\":\""+ y +"\",\"z\":\"" + z +"\"}");

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
      
      x = "";
      y = "";
      z = "";
      
      indexer = 0;
    }
    else {
      Serial.println("WiFi Disconnected");
    }
 
  }
}
