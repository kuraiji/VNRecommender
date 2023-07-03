import MultiSelectBase from "./MultiSelectBase";

const platforms = [
    {value: "and", label: 'Android'},
    {value: "bdp", label: 'Blu-ray Player'},
    {value: "drc", label: "Dreamcast"},
    {value: "dos", label: "DOS"},
    {value: "dvd", label: "DVD"},
    {value: "fm7", label: "FM-7"},
    {value: "fm8", label: "FM-8"},
    {value: "fmt", label: "FM Towns"},
    {value: "gba", label: "Game Boy Advance"},
    {value: "gbc", label: "Game Boy Color"},
    {value: "ios", label: "Apple iProduct (iOS)"},
    {value: "lin", label: "Linux"},
    {value: "mac", label: "Mac OS"},
    {value: "mob", label: "Mobile"},
    {value: "msx", label: "MSX"},
    {value: "n3d", label: "Nintendo 3DS"},
    {value: "nds", label: "Nintendo DS"},
    {value: "nes", label: "Famicom (Nintendo)"},
    {value: "oth", label: "Other"},
    {value: "p88", label: "PC-88"},
    {value: "p98", label: "PC-98"},
    {value: "pce", label: "PC Engine"},
    {value: "pcf", label: "PC-FX"},
    {value: "ps1", label: "Playstation"},
    {value: "ps2", label: "Playstation 2"},
    {value: "ps3", label: "Playstation 3"},
    {value: "ps4", label: "Playstation 4"},
    {value: "ps5", label: "Playstation 5"},
    {value: "psp", label: "Playstation Portable"},
    {value: "psv", label: "Playstation Vita"},
    {value: "sat", label: "Sega Saturn"},
    {value: "sdc", label: "Sega CD"},
    {value: "sfc", label: "Super Famicom (Super Nintendo)"},
    {value: "smd", label: "Sega Megadrive (Genesis)"},
    {value: "swi", label: "Nintendo Switch"},
    {value: "tdo", label: "3DO"},
    {value: "vnd", label: "VNDS"},
    {value: "web", label: "Website"},
    {value: "win", label: "Windows"},
    {value: "wii", label: "Nintendo Wii"},
    {value: "wiu", label: "Nintendo Wii U"},
    {value: "x1s", label: "Sharp X1"},
    {value: "x68", label: "Sharp X86000"},
    {value: "xb1", label: "Xbox"},
    {value: "xb3", label: "Xbox 360"},
    {value: "xbo", label: "Xbox One"},
    {value: "xxs", label: "Xbox Series"}
]

function MultiSelectPlatforms() {
    return (
        <MultiSelectBase 
        data={platforms}
        nothingFound="No Platforms Found"
        label="Retrieve only VNs from these platforms"
        />
    );
}

export default MultiSelectPlatforms;