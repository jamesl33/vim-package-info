var semverUtils = require("semver-utils");

function colorizeDiff(current, latest, hl) {
  if (current && (current[0] === "^" || current[0] === "~"))
    current = current.substr(1);

  // stupid semver issue
  for (let i = current.split(".").length; i < 3; i++) current = current + ".0";
  for (let i = latest.split(".").length; i < 3; i++) latest = latest + ".0";

  let c = semverUtils.parse(current);
  const l = semverUtils.parse(latest);

  if (!l) return false;
  if (!c) c = l;

  let cd = [[l.major, hl], [l.minor, hl], [l.patch, hl]];
  if (parseInt(l.major) > parseInt(c.major)) {
    cd = [
      [l.major, "VimPackageInfoMajor"],
      [l.minor, "VimPackageInfoMajor"],
      [l.patch, "VimPackageInfoMajor"]
    ];
  } else if (parseInt(l.minor) > parseInt(c.minor)) {
    cd = [
      [l.major, hl],
      [l.minor, "VimPackageInfoMinor"],
      [l.patch, "VimPackageInfoMinor"]
    ];
  } else if (parseInt(l.patch) > parseInt(c.patch)) {
    cd = [[l.major, hl], [l.minor, hl], [l.patch, "VimPackageInfoPatch"]];
  }
  return cd;
}

module.exports = { colorizeDiff };
