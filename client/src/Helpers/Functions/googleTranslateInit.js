function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element")
    const skipElement = document.querySelector(".skiptranslate.goog-te-gadget")
    if (skipElement && skipElement.children && skipElement.children.length > 0) {
        skipElement.removeChild(skipElement.children[1])
        let textNode = skipElement.childNodes[1]
        textNode.textContent = ""
    }
}
