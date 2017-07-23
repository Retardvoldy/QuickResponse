var CLIENT_ID = '792298735559-v6v0lf4kv0je4j9fn6ic2t9gtl88moq8.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
var SCOPES = 'https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state listeners.
 */
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

function interpret(str_in) {
    return atob(str_in.replace(/-/g, '+').replace(/_/g, '/'))
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        //listLabels();
        listMessages('me', 'label:inbox AND NOT category:social AND NOT category:updates AND NOT category:promotions AND NOT category:forums',10, function (messages) {
            console.log("200");
            for (var metaID in messages) {
                if (messages.hasOwnProperty(metaID)) {
                    var messageID = messages[metaID].id;
                    getMessage('me', messageID, function (response) {
                        var sender_addrs;
                        console.log(response);
                        for(var i=0; i<response.payload.headers.length; i++){
                            if (response.payload.headers[i].name === "From"){
                                sender_addrs = response.payload.headers[i].value;
                            }
                        }
                        var content = "";
                        var bodyContent = response.payload.body.data;
                        if (bodyContent && response.payload.mimeType !== "text/html") {
                            content += interpret(bodyContent)
                        }

                        var partsContent = response.payload.parts;

                        function ZILA(partsContent) {
                            if (partsContent && partsContent.length > 0) {
                                var i = 0;
                                while (i < partsContent.length) {
                                    if (partsContent[i].parts) {
                                        if( partsContent[i].mineType=="text/plain" &&partsContent[i].body.data) {
                                             content+=interpret(partsContent[i].body.data);
                                        }ZILA(partsContent[i].parts);
                                    }
                                    i++;
                                }
                            }
                        }(partsContent);
                        appendPre(content.replace(/\r?\n|\r/g,' ').replace(/\s+/g, " ").trim());
                    })
                }
            }
        })
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
function listLabels() {
    gapi.client.gmail.users.labels.list({
        'userId': 'me'
    }).then(function(response) {
        var labels = response.result.labels;
        appendPre('Labels:');

        if (labels && labels.length > 0) {
            for (i = 0; i < labels.length; i++) {
                var label = labels[i];
                appendPre(label.name)
            }
        } else {
            appendPre('No Labels found.');
        }
    });
}

/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */
function listMessages(userId, query, num, callback) {
    var getPageOfMessages = function(request, result) {
        request.execute(function(resp) {
            result = result.concat(resp.messages);
            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
                request = gapi.client.gmail.users.messages.list({
                    'userId': userId,
                    'pageToken': nextPageToken,
                    'q': query,
                    'maxResults': num
                });
                getPageOfMessages(request, result);
            } else {
                callback(result);
            }
        });
    };
    var initialRequest = gapi.client.gmail.users.messages.list({
        'userId': userId,
        'q': query
    });
    getPageOfMessages(initialRequest, []);
}

function getMessage(userId, messageId, callback) {
    var request = gapi.client.gmail.users.messages.get({
        'userId': userId,
        'id': messageId
    });
    request.execute(callback);
}
