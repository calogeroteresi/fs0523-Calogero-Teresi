
let languageLinks = document.querySelectorAll(".language-link");
    let languageText = document.getElementById("language-text");

    languageLinks.forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Per evitare il comportamento predefinito dei link
            let newLanguage = this.getAttribute("data-language");
            languageText.textContent = newLanguage;
        });
    });