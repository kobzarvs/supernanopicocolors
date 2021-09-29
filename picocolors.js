import tty from "tty";

export let isColorSupported =
  !("NO_COLOR" in process.env || process.argv.includes("--no-color")) &&
  ("FORCE_COLOR" in process.env ||
    process.argv.includes("--color") ||
    process.platform === "win32" ||
    (tty.isatty(1) && process.env.TERM !== "dumb") ||
    "CI" in process.env);

function formatter(open, close, replace = open) {
  return isColorSupported
    ? (string) => {
      let index = string.indexOf(close, open.length);
      return !~index
        ? open + string + close
        : open + replaceClose(string, close, replace, index) + close;
    }
    : (string) => string;
}

function replaceClose(string, close, replace, index) {
  let start = string.substring(0, index) + replace;
  let end = string.substring(index + close.length);
  let nextIndex = end.indexOf(close);
  return !~nextIndex ? start + end : start + replaceClose(end, close, replace, nextIndex);
}

let B1 = "\x1b[";
let M49 = "\x1b[49m";
let M39 = "\x1b[39m";

export let reset = s => `${B1}0m${s}${B1}0m`;
export let bold = formatter(B1 + "1m", B1 + "22m", B1 + `22m${B1}1m`);
export let dim = formatter(B1 + "2m", B1 + "22m", B1 + `22m${B1}2m`);
export let italic = formatter(B1 + "3m", B1 + "23m");
export let underline = formatter(B1 + "4m", B1 + "24m");
export let inverse = formatter(B1 + "7m", B1 + "27m");
export let hidden = formatter(B1 + "8m", B1 + "28m");
export let strikethrough = formatter(B1 + "9m", B1 + "29m");
export let black = formatter(B1 + "30m", M39);
export let red = formatter(B1 + "31m", M39);
export let green = formatter(B1 + "32m", M39);
export let yellow = formatter(B1 + "33m", M39);
export let blue = formatter(B1 + "34m", M39);
export let magenta = formatter(B1 + "35m", M39);
export let cyan = formatter(B1 + "36m", M39);
export let white = formatter(B1 + "37m", M39);
export let gray = formatter(B1 + "90m", M39);
export let bgBlack = formatter(B1 + "40m", M49);
export let bgRed = formatter(B1 + "41m", M49);
export let bgGreen = formatter(B1 + "42m", M49);
export let bgYellow = formatter(B1 + "43m", M49);
export let bgBlue = formatter(B1 + "44m", M49);
export let bgMagenta = formatter(B1 + "45m", M49);
export let bgCyan = formatter(B1 + "46m", M49);
export let bgWhite = formatter(B1 + "47m", M49);
