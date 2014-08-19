/*--------------------------------------------------------------
  Program:      Motion Detection Server

  Description:  Detect motion through PIR sensor and send the results
                to a webpage via AJAX
  
  Hardware:     Arduino Ethernet and PIR Motion sensor.
 
  Author:       Jake Blakeley (johnjacob.ca)
--------------------------------------------------------------*/

#include <SPI.h>
#include <Ethernet.h>

// MAC address from Ethernet shield sticker under board
byte mac[] = { 
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(10,7,1,161);
EthernetServer server(80);  // create a server at port 80

//variables for motion sensor
int inputPin = 2;               // choose the input pin (for PIR sensor)
int pirState = LOW;             // we start, assuming no motion detected
int val = 0;                    // variable for reading the pin status

void setup()
{
    Ethernet.begin(mac, ip);    // initialize Ethernet device
    server.begin();             // start to listen for clients
}

void loop()
{
    EthernetClient client = server.available();  // try to get client

    if (client) {  // got client?
        boolean currentLineIsBlank = true;
        while (client.connected()) {
            if (client.available()) {   // client data available to read
                char c = client.read(); // read 1 byte (character) from client
                // last line of client request is blank and ends with \n
                // respond to client only after last line received
                if (c == '\n' && currentLineIsBlank) {
                    // send a standard http response header
                    client.println("HTTP/1.1 200 OK");
                    client.println("Content-Type: text/html");
                    client.println("Access-Control-Allow-Origin: *");
                    client.println("Connnection: close");
                    client.println();
                    // send web page
                    client.println("<!DOCTYPE html>");
                    client.println("<html>");
                    client.println("<head>");
                    client.println("<meta http-equiv=\"refresh\" content=\"1\">");
                    client.println("</head>");
                    client.println("<body>");
                    client.println("<p class='switchState'>");
                    GetSwitchState(client);
                    client.println("</p>");
                    client.println("</body>");
                    client.println("</html>");
                    break;
                }
                // every line of text received from the client ends with \r\n
                if (c == '\n') {
                    // last character on line of received text
                    // starting new line with next character read
                    currentLineIsBlank = true;
                } 
                else if (c != '\r') {
                    // a text character was received from client
                    currentLineIsBlank = false;
                }
            } // end if (client.available())
        } // end while (client.connected())
        delay(100);      // give the web browser time to receive the data
        client.stop(); // close the connection
    } // end if (client)
}

// send the state of the switch to the web browser
void GetSwitchState(EthernetClient cl)
{
    val = digitalRead(inputPin);  // read input value
    
    if (val == HIGH) {            // check if the input is HIGH
        // we have just turned on
        cl.println(1);
        if (pirState == LOW) {
            // We only want to print on the output change, not state
            pirState = HIGH;
        }
    } else {
        // we have just turned off
        cl.println(0);
        if (pirState == HIGH){
            // We only want to print on the output change, not state
            pirState = LOW;
        }
    }
}
