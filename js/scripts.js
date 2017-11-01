$(document).ready(function() {
    // Switch for search list group change.
    var groupSwitch = false;
    
    // Opens new random wikipedia link in new window.
     $('#random-button').click(function() {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
    });
    
    // If use clicks on the search icon display search items.
    // Display search list will only run if the search box isn't empty.
    $('.fa-search').click(function() {
       if ($('#search').val() != "") {
           displaySearchList();
       }
    });
    
    // If the user presses the enter key then run the function to display the search items.
    // Display search list will only run if the search box isn't empty.
    $('#search').keypress(function(e) {
        
        if (e.keyCode == 13) {
            
           if ($('#search').val() != "") {
               console.log("test");
               displaySearchList();
           }
        }
    });
    
    $('#search').click(function () {
       $('#group-one li') .remove();
       $('#group-two li') .remove();
       $('.search-result-container-blank').removeClass('search-result-container-active');
    });
    
// Function that displays a list of search items to the screen.
function displaySearchList() {
    
     // Clears out the lists to put new list items in.
     $('#group-one li') .remove();
     $('#group-two li') .remove();
     
     // Adds a class to allow the list of items to appear after the search icon is clicked
     // or the enter button is pressed.
     $('.search-result-container-blank').addClass("search-result-container-active");
     
     // Stores the value in the search box into another variable for saving.         
     var searchItem = $('#search').val();
     
     // Clears out the search box to allow another entry to take place.
     $('#search').val("");
     
     // Stores the wikipedia api call in a variable.        
     var wikiSearch = "https://en.wikipedia.org/w/api.php";
         wikiSearch += "?callback=?";
         wikiSearch += "&action=opensearch";
         wikiSearch += "&format=json";
         wikiSearch += "&profile=fuzzy";
         wikiSearch += "&limit=10";
         wikiSearch += "&prop=imageinfo&format=json&iiprop=urll";
         wikiSearch += "&search=";
         wikiSearch += encodeURI(searchItem);
    
            // Using getJson the data is retrieved from wikipedia api. 
            $.getJSON(wikiSearch, function(data) {
               
               for (var i = 0; i < data[1].length; i++) {
                  
                  // If the group switch is false then start putting items into the first column.
                  if (!groupSwitch) {
                      
                    $('#group-one ul').append('<li><a href="' + data[3][i] + '" target="_blank"><span class="item-title">' + data[1][i] + '</span><span class="item-description">' + data[2][i].substring(0,100) + '...</span></a></li>');   
                    
                    // Once the value is greater than 4 switch to the next column
                    if (i > 3) {
                        groupSwitch = true;
                    }
                      
                  } else {
                      
                      $('#group-two ul').append('<li><a href="' + data[3][i] + '" target="_blank"><span class="item-title">' + data[1][i] + '</span><span class="item-description">' + data[2][i].substring(0,100) + '...</span></a></li>');
                    
                  }
               }
               
               groupSwitch = false;
               
            });
    }    
});


