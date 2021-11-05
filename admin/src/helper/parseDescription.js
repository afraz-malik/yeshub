export default function parseDescription(description) {
  if (description.length < 20) {
    return description;
  }
  return description.substr(0, 20).concat("...");
}
