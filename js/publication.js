// current underline idx
let current = 0;

(function moveUnderline() {
  let underlines = document.getElementsByClassName("underline");
  let categories = document.getElementsByClassName("category");

  // init to conference category
  underlines[current].style.visibility = "visible";

  // there is only one category
  if (categories.length < 2) {
    return;
  }

  // add event listener to each category
  for (let i = 0; i < categories.length; i++) {
    categories[i].firstChild.addEventListener("click", function() {
      if (i == current) {
        return;
      }

      let pos;
      let str;
      let node;
      let distance = Math.abs(underlines[i].getBoundingClientRect().right -
                              underlines[current].getBoundingClientRect().right);
      distance /= 2;

      // fade out old underline
      node = underlines[current].cloneNode(true);
      underlines[current].parentNode.replaceChild(node, underlines[current]);

      pos = current < i ? distance : distance * -1;
      str = "translateX(" + pos + "px)";
      node.animate([
        {  // from
          transform: 'translateX(0px)',
          opacity: 1,
          visibility: "visible",
        },
        {  // to
          transform: str,
          opacity: 0,
          visibility: "hidden",
        }
      ], {
        duration: 500,
      });

      // fade in new underline
      node= underlines[i].cloneNode(true);
      underlines[i].parentNode.replaceChild(node, underlines[i]);

      pos = current < i ? distance * -1 : distance;
      str = "translateX(" + pos + "px)";
      node.animate([
        {  // from
          transform: str,
          opacity: 0,
          visibility: "hidden",
        },
        {  // to
          transform: 'translateX(0px)',
          opacity: 1,
          visibility: "visible",
        }
      ], {
        duration: 500,
      });

      underlines[i].style.visibility = "visible";
      underlines[current].style.visibility = "hidden";
      current = i;
    });
  }
})();
