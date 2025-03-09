function searchPapers() {
    let query = document.getElementById("searchQuery").value;
    if (!query) {
        alert("Please enter a search keyword.");
        return;
    }

    fetch(`http://127.0.0.1:5000/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            let resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";  // Clear old results

            data.results.forEach(paper => {
                let paperDiv = document.createElement("div");
                paperDiv.innerHTML = `<h3>${paper.title}</h3>
                                      <p>Authors: ${paper.authors.join(", ")}</p>
                                      <p>Published: ${paper.published}</p>
                                      <p>DOI: <a href="https://doi.org/${paper.doi}" target="_blank">${paper.doi}</a></p>`;
                resultsDiv.appendChild(paperDiv);
            });
        })
        .catch(error => console.error("Error fetching papers:", error));
}
