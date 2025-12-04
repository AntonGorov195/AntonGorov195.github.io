

if (languageSelect !== undefined && languageSelect !== null) {
    /**
     * 
     * @param {"עברית" | "English"} lang 
     */
    function selectLang(lang) {
        switch (lang) {
            case "עברית":
                heMain.style.display = "block";
                enMain.style.display = "none";
                break;
            case "English":
                heMain.style.display = "none";
                enMain.style.display = "block";
                break;
            default:
                alert("unidentified language \"" + lang + "\" please open an issue.");
                break;
        }
    }
    languageSelect.addEventListener("change", (e) => selectLang(e.target.value));
    selectLang(languageSelect.value);
}