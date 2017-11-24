# Scroller2

**This is a clone of [jfunky](https://github.com/jfunky/Scroller2) and [grauPuche](https://github.com/grauPuche) scroll extension but with the code for it to work with the Arduino MKR1000**

# API Routes

The API is accesible at `https://jas920.itp.io`

- ### `GET /`

  > Get the current status of the extension.

  ```json
  {
    "api_status": "ok",
    "data": {
    "state": true,
      "speed": 10,
      "direction": "up"
    }
  }
  ```

* ### `GET /state` 
  >  If device is on (true) or off (false)

  ```json
  {
    "state": true
  }
  ```
    
* ### `GET /speed` 
  > Current scroll rate
  
  ```json
  {
    "speed": 10
  }
  ```
    
* ### `GET /direction` 
  > Current direction. Up or down the page.
  
  ```json
  {
    "direction": "up"
  }
  ```

- ### `POST /submit`
  > - status: true || false
  > - speed: INT 
  > - direction: up || down

