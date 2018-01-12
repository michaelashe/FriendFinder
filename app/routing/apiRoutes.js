// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var friendsArray = require('../data/friends.js');

// Export API routes
module.exports = function(app) {
  // console.log('___ENTER apiRoutes.js___');

  // Total list of friend entries
  app.get('/api/friends', function(req, res) {
    res.json(friendsArray);
  });

  // Add new friend entry
  app.post('/api/friends', function(req, res) {
    // Capture the user input object
    var userData = req.body;
    // console.log('userInput = ' + JSON.stringify(userInput));

    var userResponses = userData.scores;
    // console.log('userResponses = ' + userResponses);

    // Compute best friend match
    var matchName = '';
    var matchImage = '';
    var totalDifference = 10000; // Make the initial value big for comparison

    // Examine all existing friends in the list
    for (var i = 0; i < friendsArray.length; i++) {
      // console.log('friend = ' + JSON.stringify(friends[i]));

      // Compute differenes for each question
      var diff = 0;
      for (var j = 0; j < userData.length; j++) {
        diff += Math.abs(friendsArray[i].scores[j] - userResponses[j]);
      }
      // console.log('diff = ' + diff);

      // If lowest difference, record the friend match
      if (diff < totalDifference) {
    
        totalDifference = diff;
        matchName = friendsArray[i].name;
        matchImage = friendsArray[i].photo;
      }
    }

    // Add new user
    friendsArray.push(userData);

    // Send appropriate response
    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  });
};












// // ===============================================================================
// // LOAD DATA
// // We are linking our routes to a series of "data" sources.
// // These data sources hold arrays of information on table-data, waitinglist, etc.
// // ===============================================================================

// var friendsData = require("../data/friends");


// // ===============================================================================
// // ROUTING
// // ===============================================================================

// module.exports = function(app) {
//   // API GET Requests
//   // Below code handles when users "visit" a page.
//   // In each of the below cases when a user visits a link
//   // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
//   // ---------------------------------------------------------------------------

//   app.get("/api/friends", function(req, res) {
//     res.json(friendsData);
//   });

//   // API POST Requests
//   // Below code handles when a user submits a form and thus submits data to the server.
//   // In each of the below cases, when a user submits form data (a JSON object)
//   // ...the JSON is pushed to the appropriate JavaScript array
//   // (ex. User fills out a reservation request... this data is then sent to the server...
//   // Then the server saves the data to the tableData array)
//   // ---------------------------------------------------------------------------

//   app.post("/api/friends", function(req, res) {
//     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//     // It will do this by sending out the value "true" have a table
//     // req.body is available since we're using the body-parser middleware
//     if (friendsData.length < 5) {
//       friendsData.push(req.body);
//       res.json(true);
//     }
//     else {
//       friendsData.push(req.body);
//       res.json(false);
//     }
//   });

//   // ---------------------------------------------------------------------------
//   // I added this below code so you could clear out the table while working with the functionality.
//   // Don"t worry about it!

//   app.post("/api/clear", function() {
//     // Empty out the arrays of data
//     friendsData = [];

//     console.log(friendsData);
//   });
// };