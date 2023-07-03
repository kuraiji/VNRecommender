import MultiSelectBase from "./MultiSelectBase";

const languages = [
    {value: "ar", label: 'Arabic'},
    {value: "ca", label: 'Catalan'},
    {value: "chr", label: 'Cherokee'},
    {value: "cs", label: 'Czech'},
    {value: "de", label: 'German'},
    {value: "en", label: 'English'},
    {value: "el", label: 'Greek'},
    {value: "eo", label: 'Esperanto'},
    {value: "es", label: 'Spanish'},
    {value: "eu", label: 'Basque'},
    {value: "fa", label: "Persian"},
    {value: "fi", label: 'Finnish'},
    {value: "fr", label: 'French'},
    {value: "ga", label: 'Irish'},
    {value: "gd", label: "Scottish Gaelic"},
    {value: "he", label: 'Hebrew'},
    {value: "hi", label: 'Hindi'},
    {value: "hr", label: 'Croatian'},
    {value: "hu", label: 'Hungarian'},
    {value: "id", label: "Indonesian"},
    {value: "it", label: "Italian"},
    {value: "iu", label: "Inuktitut"},
    {value: "ja", label: "Japanese"},
    {value: "ko", label: "Korean"},
    {value: "la", label: "Latin"},
    {value: "lv", label: "Latvian"},
    {value: "li", label: "Lithuanian"},
    {value: "mk", label: "Macedonian"},
    {value: "ms", label: "Malay"},
    {value: "nl", label: "Dutch"},
    {value: "no", label: "Norwegian"},
    {value: "pl", label: "Polish"},
    {value: "pt-br", label: "Portuguese-Breton"},
    {value: "ro", label: "Romanian"},
    {value: "ru", label: "Russian"},
    {value: "sk", label: "Slovak"},
    {value: "sl", label: "Slovenian"},
    {value: "sv", label: "Swedish"},
    {value: "ta", label: "Tamil"},
    {value: "th", label: "Thai"},
    {value: "tr", label: "Turkish"},
    {value: "uk", label: "Ukrainian"},
    {value: "ur", label: "Urdu"},
    {value: "vi", label: "Vietnamese"},
    {value: "zh-Hans", label: "Chinese - Simplified"},
    {value: "zh-Hant", label: "Chinese - Traditional"}
]

function MultiSelectLanguages() {
    return (
        <MultiSelectBase data={languages} 
        label="Retrieve only VNs of these languages"
        nothingFound="No Languages Found"
        />
    );
}

export default MultiSelectLanguages;