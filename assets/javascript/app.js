 var movies = ["The Matrix", "The Shawshank Redemption", "The Godfather", "The Lion King", "The Dark Knight", "Schindler's List", "Pulp Fiction", "The Good, the Bad, and the Ugly", "Fight Club", "Forrest Gump", "Inception", "One Flew Over the Cuckoo's Nest", "Goodfellas", "The Silence of the Lambs"];
      
      function displayGifs() {
        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=78c2428585a74426a49c5f0e4c0cb7d8&q=" + movie + "&limit=10&offset=0&lang=en";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r") { 
              var gifDiv = $("<div class='item'>");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);
              
              var movieGif = $("<img class='gif'>");

              // Giving the image tag an src attribute 
              movieGif.attr("src", results[i].images.fixed_height_still.url);

              // Adding p and img to the div created above 
              gifDiv.append(p);
              gifDiv.append(movieGif);

              // Prepending the gifDiv to div in the HTML
              $("#movies").prepend(gifDiv);
              
            }
          }
          
        });
      }
      // Adding play/pause click functionality to the gifs
       $('body').on('click', '.gif', function() {
          var src = $(this).attr("src");
            if($(this).hasClass('playing')){
            //stop
              $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
              $(this).removeClass('playing');
          } else {
            //play
              $(this).addClass('playing');
              $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });
      // Creating function for displaying movie buttons
      function createButtons() {
        $("#movieButtons").empty();
        for (var i = 0; i < movies.length; i++) {
          var a = $("<button>");
          // Added a class of movie to the button
          a.addClass("movie");
          // Added a data-attribute
          a.attr("data-name", movies[i]);
          // Provided the initial button text
          a.text(movies[i]);
          // Added the button to the movieButtons div
          $("#movieButtons").append(a);
        }
      }
      // Adding function to allow for more movie buttons to be added 
      $("#addMovie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        // The movie from the textbox is then added to the array
        movies.push(movie);
        $('input[type="text"], textarea').val('');
        // Calling movieButtons which handles the processing of the movie array
        createButtons();
      });
      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".movie", displayGifs);
      // Calling the createButtons function to display the initial buttons
      createButtons();