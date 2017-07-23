var json1 = {
  "id1": {
    "Email": "alicia_banksx@gmail.com",
    "Type": "complaint",
    "Department": "technical team",
    "Priority": 3867,
    "Content": "Bought a phone from you a few weeks back, and it's already been lagging and crashing. What is this? I demand a refund! NEVER going to buy from you again.",
    "Autogen": "Dear valued customer,\nWe are sorry that you have experienced such displeasure in our shared time. I suggest not being too rash so that we can resolve matters immediately. Thank you.",
  },
  "3425": {
    "Email": "james_tooth@hotmail.com",
    "Type": "complaint",
    "Department": "customer service",
    "Priority": 2517,
    "Content": "Coming up with lousy phones over and over. All you do is pump out pieces of useless laggy shit that lasts three weeks tops. boo. get lost before the bigger players kick you out.",
    "Autogen": ""
  },"z83jdl": {
"Email": "Tim_Rook@gmail.com",
"Type": "enquiry",
"Department": "technical team",
"Priority": 1742,
"Content": "I am facing difficulties with the video conferencing feature of the app. I need a solution quickly",
"Autogen": "Difficulties video conferencing. Need solution quickly",
},
  "4545": {
    "Email": "seth_christopher@gmail.com",
    "Type": "complaint",
    "Department": "customer service",
    "Priority": 1670,
    "Content": "my model 53 recently had its screen cracked, and recently its been slowing down. but the negotiations for service i must say are quite absurd. am considering switching to Orange Inc.",
    "Autogen": "model53 screen crack slow service absurd considering switch",
  },
  "unsc123": {
  "Email": "anya.stroud@gmail.com",
  "Type": "enquiry",
  "Department": "customer service",
  "Priority": 1569,
  "Content": "What is the fastest route to the Singapore HQ",
  "Autogen": "fastest route Singapore HQ",
  },
  "po00928d": {
  "Email": "russellLow@gmail.com",
  "Type": "compliment",
  "Department": "customer service",
  "Priority": 1369,
  "Content": "The sedan I rented drove very smoothly and was in sublime condition for a rental.",
  "Reply": "Thank you for your feedback. Glad that we can serve you.",
  },
"f18ftw": {
"Email": "MarcusJFenix@gmail.com",
"Type": "complaint",
"Department": "kitchen management",
"Priority": 572,
"Content": "The Caesar salad was pretty dissapointing and had a bit too much sauce",
"Autogen": "Caesar salad dissapointing too much sauce",
},
  "egriuwh": {
    "Email": "dannypoopseng@hotmail.com",
    "Type": "compliment",
    "Department": "marketing",
    "Priority": 567,
    "Content": "I've been an avid Pear fan but ever since I switched over to your company's products, I've been having a good time. Service was excellent, staff are polite, and products are fantastic. Kudos.",
    "Autogen": "avid Pear fan switch good service excellent staff polite products fantastic"
  },
  "9nefwe": {
    "Email": "weehekun@gmail.com",
    "Type": "compliment",
    "Department": "marketing",
    "Priority": 145,
    "Content": "I LOVE YOUR COMPANY THE PRODUCTS BEST 100 LIT LIT LIT",
    "Autogen": "love products"
  },
};

var states = {
  "Responses": {
    "tabs": '<a class="mdl-layout__tab is-active">Response Needed</a>\
    <a class="mdl-layout__tab">Waiting for Reply</a>\
    <a class="mdl-layout__tab">Resolved</a>',

    "main-content": '<dialog class="mdl-dialog">\
      <div class="mdl-dialog__content">\
        <p id ="content1">\
        </p>\
        <input type="text"></input>\
      </div>\
      <div class="mdl-dialog__actions mdl-dialog__actions--full-width">\
        <button type="button" class="mdl-button">Reply</button>\
        <button type="button" class="mdl-button close">Cancel</button>\
      </div>\
    </dialog>\
    <table class="mdl-data-table mdl-js-data-table" style="width: 100%">\
      <thead>\
        <th class="mdl-data-table__cell--non-numeric">Email</th>\
        <th>Type</th>\
        <th>Department</th>\
        <th>Priority</th>\
      </thead>\
      <tbody id="feedback-container">\
      </tbody>\
    </table>'
  },
  "Keywords": {
    "tabs": '<a class="mdl-layout__tab is-active">Emotive Words</a>\
    <a class="mdl-layout__tab">Company Words</a>\
    <a class="mdl-layout__tab">Extra Words</a>',
    "main-content": '<dialog class="mdl-dialog">\
      <div class="mdl-dialog__content">\
        <p id ="content1">\
        </p>\
        <input type="text"></input>\
      </div>\
      <div class="mdl-dialog__actions mdl-dialog__actions--full-width">\
        <button type="button" class="mdl-button">Reply</button>\
        <button type="button" class="mdl-button close">Cancel</button>\
      </div>\
    </dialog>\
    <table class="mdl-data-table mdl-js-data-table" style="width: 100%">\
      <thead>\
        <th class="mdl-data-table__cell--non-numeric">Email</th>\
        <th>Type</th>\
        <th>Department</th>\
        <th>Priority</th>\
      </thead>\
      <tbody id="feedback-container">\
      </tbody>\
    </table>'
  },
};

var templateRow = ["<tr class='show-modal' id='",
"'><td class='mdl-data-table__cell--non-numeric'>",
"</td><td>",
"</td><td>",
"</td><td>",
"</td></tr>"]; // 0 [id] 1 [Email] 2 [Type] 3 [Department] 4 [Priority] 5

$(document).ready(function(){

    function loadState(curr) {
      if (states.hasOwnProperty(curr)){
          $("#head").html(curr);
          curr = states[curr];
          $("#tabs").html(curr["tabs"]);
          $("#main-content").html(curr["main-content"]);
      }
      else {
        alert("Error");
      }
    };
    loadState("Responses");

    $('.stateloader').click(function(){
      var value = $(this).text();
      console.log(value);
      loadState(value);
    });


    var container = $("#feedback-container");
    var generatedTemplates = "";
    for (var key in json1) {
        if (json1.hasOwnProperty(key)) {
          var curr = json1[key];
          generatedTemplates += templateRow[0] + key + templateRow[1] + curr.Email + templateRow[2] + curr.Type + templateRow[3] + curr.Department + templateRow[4] + curr.Priority + templateRow[5];
          //console.log(generatedTemplates);
        }
    }

    if (generatedTemplates !== "") {
        container.html(generatedTemplates);
    }

    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('.show-modal');
    var content = $("#content1");
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    $(".show-modal").click(function() {
      var id = $(this).attr('id');
      content.html(json1[id]["Content"]);
      $("#edited").attr("placeholder", json1[id]["Autogen"])
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
});
