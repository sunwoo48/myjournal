
//contructor

function Journal(){
    this.entries= [];
}

function Entry(date, title, user, content, tag){
    this.date = date;
    this.title = title;
    this.user = user;
    this.content = content;
    this.tag = tag;
}

//global variable

var newJournal = new Journal();
//REVIEW: date is being created on page load. This means the date will be the same for all entries if they are made until the user refreshs the page. Putting it inside the addEntry() function would be a better idea
var d = new Date();

//prototype

Journal.prototype.addEntry = function(frm) {
    var date= d.toDateString();
    var title = frm.find("input[name=title]").val();
    var user = frm.find("input[name=user]").val();
    var content = frm.find("textarea[type=text]").val();
    var tag = frm.find("input[name=tag]").val();
    var entry = new Entry(date, title, user, content, tag);
    this.entries.unshift(entry);
}

Journal.prototype.displayEntries = function() {
    var n = this.entries.length;
    html ="";

    for(i=0; i < n; i++) {
        html += "<section>";
        html += "<div class='box'>"
        html += this.entries[i].date;
        html += "<h2> Title: " + this.entries[i].title + "</h2>";
        html += "<h3> Name:" + this.entries[i].user + "</h3>";
        html += "<p>" + this.entries[i].content + "</p>";
        html += "<p>" + this.entries[i].tag +"</p>";
        html += "<button class='btn1' data-index = "+ i +">delete</button>";
        html += "</div></section><br>"
    }
    $('.newJournal').html(html);
};

//search box
Journal.prototype.searchBox = function() {
    // when button clicked 
    // grab the value of the search bar from name=search
    // change object(?) to string....(.toLowerCase)
    // give var name for input
    // give var for all-entries
    // somehow comepare input to entries
    var html = "";
    for(x=0; x < this.entries.length; x++) {
        var searchWord = $("input[name=search]").val().toLowerCase();

        var titleSearch = this.entries[x].title.toLowerCase();
        var userSearch = this.entries[x].user.toLowerCase();
        var contentSearch = this.entries[x].content.toLowerCase();
        var tagSearch = (this.entries[x].tag).toLowerCase();
        var allEntries = titleSearch + userSearch + contentSearch +tagSearch;
          
        if (allEntries.indexOf(searchWord) > -1) {
            html += "<section>";
            html += "<div class='box'>"
            html += this.entries[x].date;
            html += "<h2> Title: " + this.entries[x].title + "</h2>";
            html += "<h3> Name:" + this.entries[x].user + "</h3>";
            html += "<p>" + this.entries[x].content + "</p>";
            html += "<p>" + this.entries[x].tag +"</p>";
            html += "<button class='btn1' data-index = "+ i +">Go Back to List</button>";
            html += "</div></section><br>";
        }
    };
    $('.newJournal').html(html);
};

//when form submitted
$(document).ready(function () {
    $("#back-button").hide();

    $("#test-form").submit(function (event) {
        event.preventDefault();
        var form = $("#test-form");
        newJournal.addEntry(form);
//change css properties
        $('.newJournal').css('display', 'block');
        $('.container').css('display', 'none');
        newJournal.displayEntries();
        $("#back-button").show();
     });

    $('#back-button').click(function() {
        $('.container').css('display', 'block');
        $('.newJournal').css('display', 'none');
        $("#back-button").hide();
    });

    $('#show-button').click(function () {
        $('.newJournal').css('display', 'block');
        $('.container').css('display', 'none');
        $("#back-button").show();
    })

    $('.newJournal').on('click', '.btn1', function(){
        var deletePoint = $(this).attr("data-index");
        newJournal.entries.splice(deletePoint, 1);
        newJournal.displayEntries();
    });

    $("#search-btn").click(function() {
        event.preventDefault();
        newJournal.searchBox();

    });
});




