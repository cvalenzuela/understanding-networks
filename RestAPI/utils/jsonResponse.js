/*
=====
API
JSON Response Util Function
=====
*/

// 200 OK
// Standard response for successful HTTP requests. 
module.exports.ok = function(res, data, msg) {
  res.status(200);
  res.json({
    "code": "200",
    "status": "OK",
    "message": "Successful Request",
    "resource": msg,
    "data": data
  });
};

// 201 Created
// The request has been fulfilled, resulting in the creation of a new resource
module.exports.created = function(res, data, msg) {
  res.status(201);
  res.json({
    "code": "201",
    "status": "Created",
    "message": "The request has been fulfilled",
    "request": msg,
    "data": data
  });
};

// 400 Bad Request
// The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).
module.exports.badRequest = function(res, request, why) {
  res.status(400);
  res.json({
    "code": "400",
    "status": "Bad Request",
    "message": "The server cannot process the request",
    "why": why,
    "request": request
  });
};

// 404 Not Found
// The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
module.exports.notFound = function(res, request) {
  res.status(404);
  res.json({
    "code": "404",
    "status": "Not Found",
    "message": "The requested resource could not be found",
    "request": request,
  });
};

// 409 Conflict
// Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
module.exports.conflict = function(res, conflict, why) {
  res.status(409);
  res.json({
    "code": "409",
    "status": "Conflict",
    "message": "The request could not be processed because of conflict in the request",
    "why": why,
    "conflict": conflict
  });
};


// 500 Internal Server Error
// A generic error message, given when an unexpected condition was encountered and no more specific message is suitable
module.exports.internalServerError = function(res, err, when) {
  res.status(500);
  res.json({
    "code": '500',
    "status": "Internal Server Error",
    "message": "An error ocurred in the server",
    "when": when,
    "error": err
  });
};