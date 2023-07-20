$(document).ready(function() {
    $("#submit-btn").on("click", function() {
        var query = $("#query").val();
        if (query.trim() === "") {
            alert("Please enter a Search keyword.");
            return;
        }

        var apiKey = "n8EyKaqyzclwKOGRZhUKrA==33iTgW0O8IM1Vy8F";
        var apiUrl = "https://api.api-ninjas.com/v1/nutrition?query=" + encodeURIComponent(query);

        $.ajax({
            method: "GET",
            url: apiUrl,
            headers: { "X-Api-Key": apiKey },
            contentType: "application/json",
            success: function(result) {
                displayNutritionInfo(result);
            },
            error: function(jqXHR) {
                console.error("Error: ", jqXHR.responseText);
            }
        });
    });

    function displayNutritionInfo(data) {
        var resultContainer = $("#result-container");
        resultContainer.empty();

        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var itemInfo = `
                    <div class="nutrition-item">
                        <h2>${item.name}</h2>
                        <p>Calories: ${item.calories.toFixed(1)}</p>
                        <p>Fat: ${item.fat_total_g.toFixed(1)}g</p>
                        <p>Protein: ${item.protein_g.toFixed(1)}g</p>
                        <p>Carbohydrates: ${item.carbohydrates_total_g.toFixed(1)}g</p>
                    </div>
                `;
                resultContainer.append(itemInfo);
            }
        } else {
            resultContainer.append("<p>No nutrition information found.</p>");
        }
    }
});
