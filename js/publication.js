// current underline idx
let current = 0;

(function moveUnderline() {
  let underlines = document.getElementsByClassName("underline");
  let categories = document.getElementsByClassName("category");

  // init to conference category
  underlines[current].style.visibility = "visible";

  // add event listener to each category
  for (let i = 0; i < categories.length; i++) {
    categories[i].firstChild.addEventListener("click", function() {
      for (let j = 0; j < categories.length; j++) {
        if (i == j) {
          // replace node to restart animation
          let newone = underlines[j].cloneNode(true);
          underlines[j].parentNode.replaceChild(newone, underlines[j]);
          newone.style.visibility = "visible";

          // set up animation keyframes
          let pos = current < i ? -300 : 300;
          let str = "translateX(" + pos + "px)";
          newone.animate([
            {  // from
              transform: str,
              opacity: 0,
            },
            {  // to
              transform: 'translateX(0px)',
              opacity: 1,
            }
          ], {
            duration: 500,
          });

          current = i;
        } else {
          underlines[j].style.visibility = "hidden";
        }
      }
    });
  }
})();
