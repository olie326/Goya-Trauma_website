export function getHeight(element: HTMLElement) {
  const copy = element.cloneNode(true) as HTMLElement;
  copy.style.visibility = "hidden";
  document.body.appendChild(copy);
  var height = copy.offsetHeight + 0;
  document.body.removeChild(copy);
  copy.style.visibility = "visible";
  return height;
}
