//((((((((((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))))))))))
//
//  modulebar.js v2.0 (c) 2023 Jan-Erich Schirrmacher, www.atomek.de
//
//  Displays led style ciphers with SVG.
//
//  Example:
//    1. Create a DIV element in your HTML and set its id to "mycontainer"
//    2. Create a ModuleBar instance in your window.onload event 
//       modbar = new ModuleBar(document.getElementById("mycontainer"), "88:88");
//    3. Display a value
//       modbar.display("12:34");
//
//  On creation you enter the list of used modules in the ModuleBar's constructor.
//  The list of modules is a string which combines some of the available modules:
//   "8"  z-segment module
//   ":"  double dot module
//   "."  dot module
//   " "  spacer
//
//   The chars of the strings you can display must conform to the modules.
//   The space character lets all segments of the module appear dark.
// 
//   Module/display examples:
//      "888"/"1243" => "124"
//      "8.8.8.8"/"12.34" => "12.34"
//      "8888"/"-3" => "-3  "
//      "8888"/" -3 " => " -3 "
//      "88:88"/"12:34:56" => "12:34"
//      "88:88"/"12 34" => "12 34"
//                           
//   Features:
//      
//      new ModuleBar(myElement, "8888", "modern", 0, 2);
//      creates a module bar with the style "modern", 0 slant and a double space between
//      the modules.
//
//      Use other colors:
//        modbar.colors = ["red", "maroon"]; // or ["#f0f", "#202"]
//        modbar.colors = "red"; // colors available: "red", "green", "blue", "yellow"
//
//((((((((((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))))))))))


const MOD7_SEGS = {
    " ": "-------",
    "0": "ABCDEF-",
    "1": "-BV----",
    "2": "AB-DE-G",
    "3": "ABCD--G",
    "4": "-BC--FG",
    "5": "A-CD-FG",
    "6": "A-CDEFG",
    "7": "ABC----",
    "8": "ABCDEFG",
    "9": "ABCD-FG",
    "-": "------G",
    "E": "A--DEFG",
}

const MODM13_SEGS = {
" ": "-------------",
"0": "ABCDEFGHIJKL-",
"1": "--CDEFG------",
"2": "ABCD---HIJ--M",
"3": "ABCD-FGHI---M",
"4": "A--DEFG----LM",
"5": "AB---FGHI--LM",
"6": "AB---FGHIJKLM",
"7": "ABCDEFG------",
"8": "ABCD-FGHIJ-LM",
"9": "ABCDEFGH---LM",
"-": "------------M",
"E": "ABC---GHIJKLM",
}

// "normal" design
const MODDEFS_NORMAL = {
    "8": {moduleClass: "mod7Seg",       width: 9, segCount: 7, segs: MOD7_SEGS},
    ".": {moduleClass: "modDot",        width: 2, segCount: 1, segs: {" ": "-", ".": "X"}},
    ":": {moduleClass: "modDoubledot",  width: 2, segCount: 1, segs: {" ": "-", ":": "X"}},
    " ": {moduleClass: "modSpace",      width: 4, segCount: 0, segs: {}},
}

// "fat" design
const MODDEFS_FAT = {
    "8": {moduleClass: "mod7Seg",       width: 27, segCount: 7, segs: MOD7_SEGS},
    ".": {moduleClass: "modDot",        width: 8, segCount: 1, segs: {" ": "-", ".": "X"}},
    ":": {moduleClass: "modDoubledot",  width: 8, segCount: 1, segs: {" ": "-", ":": "X"}},
    " ": {moduleClass: "modSpace",      width: 16, segCount: 0, segs: {}},
}

// "modern" design
const MODDEFS_MODERN = {
    "8": {moduleClass: "modm13Seg",      width: 9, segCount: 13, segs: MODM13_SEGS},
    ".": {moduleClass: "modmDot",        width: 2, segCount:  1, segs: {" ": "-", ".": "X"}},
    ":": {moduleClass: "modmDoubledot",  width: 2, segCount:  1, segs: {" ": "-", ":": "X"}},
    " ": {moduleClass: "modmSpace",      width: 4, segCount:  0, segs: {}},
}

// Define a line for each module set (module set = design)
let DESIGNDEFS = {
    "normal": {modDefs: MODDEFS_NORMAL, defs: SVG_NORMAL_DEFS, scale: 12, height: 16, space: 1, element: null},
    "fat":    {modDefs: MODDEFS_FAT, defs: SVG_FAT_DEFS, scale: 4, height: 46, space: 3, element: null},
    "modern": {modDefs: MODDEFS_MODERN, defs: SVG_MODERN_DEFS, scale: 12, height: 16, space: 1, element: null},
}

// Some color schemes
let COLOR_SCHEMES = {
    "red":      ["#ff0000", "#220000"],
    "green":    ["#00ff00", "#002200"],
    "blue":     ["#00ffff", "#002222"],
    "yellow":   ["#ffff00", "#222200"],
};

function repl(template, dictionary) {
    result = template;
    for (const [key, value] of Object.entries(dictionary))
        result = result.replaceAll("%"+key.toUpperCase()+"%", value);
    return result;
}

class ModuleBar {

    constructor(container, defString, designId="normal", slant=4, spacing=1) {
        this.container = container;
        this.modules = [];
        let cols = COLOR_SCHEMES["red"];
        this._darkColor = cols[1];
        this._brightColor = cols[0];
        this._slant = slant;
        this._spacing = spacing;
        this._chars = "";
        this.design = DESIGNDEFS[designId];
        this.parser = new DOMParser();
        if (this.design.element == null) {
            // If not yet done, create an invisible svg element for the segments shapes
            this.design.element = this.loadSvgElement(this.design.defs);
            this.design.element.style.display = "none";
            document.body.appendChild(this.design.element);
        }

        // Create the container svg element
        this.element = this.loadSvgElement(MODBAR_TEMPLATE);
        
        // Create an svg group for every module. The modules svgs are clones of
        // design template svg.
        let x = 0;
        for (let i=0; i<defString.length; i++) {
            let mod = new Module(this, i, x * this.design.scale, defString[i]);
            this.modules.push(mod);
            x += mod.def.width;
            if (i<defString.length-1)
                x += this.design.space*this._spacing;
        }
        let dx = this.design.height*Math.tan(this._slant*Math.PI/180.0)*this.design.scale;
        let w = x*this.design.scale + dx;
        let h = this.design.height*this.design.scale;
        this.element.setAttribute("viewBox", "0 0 "+w+" "+h);
        //this.element.setAttribute("width", "auto");
        //this.element.setAttribute("height", "100%");
        this.element.children[0].setAttribute("transform", "translate("+dx+") skewX("+(-this._slant)+")");
        this.container.appendChild(this.element);

        this.update(' '.repeat(this.modules.length));
    }

    get darkColor() {
        return this._darkColor;
    }

    set darkColor(value) {
        if (value != this._darkColor) {
            this._darkColor = value;
            this.update(this._chars);
        }
    }

    get brightColor() {
        return this._brightColor;
    }

    set brightColor(value) {
        if (value != this._brightColor) {
            this._brightColor = value;
            this.update(this._chars);
        }
    }

    get colors() {
        return [this._brightColor, this._darkColor];
    }

    set colors(value) {
        if (typeof(value)=="string") {
            let cols = COLOR_SCHEMES[value];
            this.colors = cols;
        } else if (value != this.colors) {
            this._brightColor = value[0];
            this._darkColor = value[1];
            this.update(this._chars);
        }
    }

    get slant() {
        return this._slant;
    }

    loadSvgElement(xmlCode) {
        return this.parser.parseFromString(xmlCode, 'image/svg+xml').documentElement;    
    }   

    update(chars) {
        let c=0, m=0;
        while (c<chars.length && m<this.modules.length) {
            if (this.modules[m].update(chars[c]))
                c++;
            m++;
        }
        this._chars = chars;
    }

    display(chars) {
        if (chars != this._chars) {
            this.update(chars);
        }
    }
}

class Module {

    constructor(bar, index, x, defId) {
        this.bar = bar;
        this.index = index;
        this.def = this.bar.design.modDefs[defId];
        this.element = this.bar.design.element.querySelector("."+this.def.moduleClass).cloneNode(true);
        this.element.classList.add("module");
        this.element.classList.add("mod"+this.bar.modules.length);
        this.element.setAttribute('transform', "translate("+x.toString()+")");
        this.bar.element.children[0].appendChild(this.element);
        this._char = ''; 
        this._onclick = null;
        this._topRect = null;
        this._bottomRect = null;
        this._zoneClick = (e) => {if (e.target.module._onclick) e.target.module._onclick(e)};
    }

    addClickZones() {
        this._topRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this._topRect.setAttribute("y", "0");
        this._topRect.zone = "top";
        this._bottomRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this._bottomRect.setAttribute("y", "50%");
        this._bottomRect.zone = "bottom";
        for (let rect of [this._topRect, this._bottomRect]) {
          // id="topZone" name="top" x="0" y="0" width="112" height="50%" visibility="hidden" cursor="pointer" pointer-events="painted"
          rect.setAttribute("x", 0);
          rect.setAttribute("width", this.def.width * this.bar.design.scale);
          rect.setAttribute("height", "50%");
          rect.setAttribute("visibility", "hidden");
          rect.setAttribute("cursor", "pointer");
          rect.setAttribute("pointer-events", "painted");
          rect.module = this;
          this.element.appendChild(rect);
        }
    }
  
    get onclick() {
        return this._onclick;
    }

    set onclick(value) {
        if (value == this._onclick) return;
        if (this._onclick != null) this.element.removeEventListener('click', this._zoneClick);
        this._onclick = value;
        if (value) {
            if (this._topRect == null) this.addClickZones();
            this.element.addEventListener('click', this._zoneClick);
        }
    }

    update(char) {
        let mask = this.def.segs[char];
        if (mask) {
            for (let i=0; i<this.def.segCount; i++) {
                let seg = this.element.children[i];
                if (mask[i]=="-")
                    seg.style.fill = this.bar.darkColor;
                else
                    seg.style.fill = this.bar.brightColor;
            }
            this._char = char;
            return true;
        }
        return false;
    }

    display(char) {
        return char == this._char || this.update(char);
    }
}