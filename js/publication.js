const FIRST_YEAR = 2005;
const CURRENT_YEAR = 2018;

const confAbbr = {
  ICASSP: "IEEE International Conference on Acoustics, Speech, and Signal Processing (ICASSP)",
  INTERSPEECH: "Inerspeech",
}

// current underline idx
let current = 0;

// array of papers, add paper of conference here!
let papers = [{
    "imgPath": "img/conference/lu2013speech.png",
    "filePath": "conference/lu2013speech.pdf",
    "year": 2013,
    "name": "Speech enhancement based on deep denoising autoencoder.",
    "author": "X Lu, Y Tsao, S Matsuda, C Hori",
    "conference": confAbbr.INTERSPEECH,
  }, {
    "imgPath": "img/conference/li2005study.png",
    "filePath": "conference/li2005study.pdf",
    "year": 2005,
    "name": "A study on knowledge source integration for candidate rescoring in automatic speech recognition.",
    "author": "Li, Jinyu and Tsao, Yu and Lee, Chin-Hui",
    "conference": confAbbr.ICASSP,
  }];

function showPaper() {
  let containers = document.getElementsByClassName("container");
  for (let i = 0; i < containers.length; i++) {
    containers[i].style.display = "none";
  }
  containers[current].style.display = "block";
}

function addUnderlineListener() {
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
      showPaper();
    });
  }
}

// return array of year elements, which idx from FIRST_YEAR to CURRENT_YEAR
function buildYear(container) {
  let years = [];
  for (let i = CURRENT_YEAR; i >= FIRST_YEAR; i--) {
    let yearTitle = document.createElement("div");
    yearTitle.className = "row year-title";
    yearTitle.innerHTML = i.toString();
    container.appendChild(yearTitle);

    let hr = document.createElement("hr");
    yearTitle.appendChild(hr);

    years[i - FIRST_YEAR] = yearTitle;
  }

  return years;
}

function buildConference() {
  let container = document.getElementById("conference");

  // build year titles from FIRST_YEAR to CURRENT_YEAR
  let yearTitles = buildYear(container);

  // extract papers
  let imgs = [];
  let files = [];
  let years = [];
  let names = [];
  let authors = [];
  let conferences = [];
  for (let p of papers) {
    imgs.push(p["imgPath"]);
    files.push(p["filePath"]);
    years.push(p["year"]);
    names.push(p["name"]);
    authors.push(p["author"]);
    conferences.push(p["conference"]);
  }

  // build papers block
  for (let i in papers) {

    if (years[i] < FIRST_YEAR) {
      // the paper is too old...
      continue;
    }

    let paper = document.createElement("div");
    paper.className = "row paper";
    yearTitles[years[i] - FIRST_YEAR].appendChild(paper);

    let s1 = document.createElement("div");
    s1.className = "col s1";
    paper.appendChild(s1);

    let imgPath = document.createElement("img");
    imgPath.className = "paper-img";
    imgPath.src = imgs[i];
    s1.appendChild(imgPath);

    let s2 = document.createElement("div");
    s2.className = "col s2";
    paper.appendChild(s2);

    let paperTitle = document.createElement("span");
    paperTitle.className = "paper-title";
    s2.appendChild(paperTitle);

    let fileName = document.createElement("a");
    fileName.href = files[i];
    fileName.innerHTML = names[i]
    paperTitle.appendChild(fileName);

    let newline = document.createElement("br");
    fileName.appendChild(newline);

    let author = document.createElement("span");
    author.className = "paper-author";
    author.innerHTML = authors[i]
    s2.appendChild(author);

    newline = document.createElement("br");
    author.appendChild(newline);

    let conference = document.createElement("span");
    conference.className = "paper-conference";
    conference.innerHTML = conferences[i] + ", " + years[i];
    s2.appendChild(conference);
  }

  // init to conference category
  showPaper();
}

function main() {
  // add listener for clicking on difference categories
  addUnderlineListener();

  // build conference, journal, book block with visibility defautl to none
  buildConference();
//  buildJournal();
//  buildBook();
}

main();
