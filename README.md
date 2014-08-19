Troubleshooting
============

1. Check "http://10.7.1.161/" in your browser. It should go from 0 to 1 when motion is triggered by the sensor. If it doesn't the arduino needs to be restarted by disconnecting and reconnecting the ethernet. If it doesn't connect to the address at all then the arduino is not connected to the internet.

2. Check the javascript console (cmd+alt+j in chrome) on the website for possible errors/solutions. Follow the instructions given.

3. Make sure the computer is connected to the same network as the arduino. In our case its "IDEO" and not "IDEO-guest"

4. If none of these work, restart the computer.
