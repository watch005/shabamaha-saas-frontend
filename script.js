document.addEventListener("DOMContentLoaded", function () {
    // Attach event listener to search button
    document.getElementById("searchButton").addEventListener("click", searchPapers);
});

function searchPapers() {
    let query = document.getElementById("searchQuery").value.trim();
    
    if (!query) {
        alert("Please enter a search keyword.");
        return;
    }

    let apiUrl = `https://shabamaha-api.vercel.app/search?q=${encodeURIComponent(query)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";  // Clear previous results

            if (!data.results || data.results.length === 0) {
                resultsDiv.innerHTML = "<p>No results found.</p>";
                return;
            }

            data.results.forEach(paper => {
                let paperDiv = document.createElement("div");
                paperDiv.classList.add("paper-card"); // Adding a class for styling
                paperDiv.innerHTML = `
                    <h3>${paper.title}</h3>
                    <p><strong>Authors:</strong> ${paper.authors.join(", ")}</p>
                    <p><strong>Published:</strong> ${paper.published}</p>
                    <p><strong>DOI:</strong> <a href="https://doi.org/${paper.doi}" target="_blank">${paper.doi}</a></p>
                `;
                resultsDiv.appendChild(paperDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching papers:", error);
            document.getElementById("results").innerHTML = "<p>Error fetching data. Please try again.</p>";
        });
}
