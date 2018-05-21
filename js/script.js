// v2
// provide pagination for the web page by breaking the students into 10
// student pages and generating a page navigator at the bottom of the page
'use strict';
// GLOBAL BINDINGS
const studentDiv = fetchNodes('.student-item'); // holds all student divs
let displayNum = 10;  // changes number of students shown per page
const grouped = groupSubArray(studentDiv, displayNum); // group divs

// calls initial reqd functions for pagination
window.onload = () => {
makePaginate();
createListener();
fetchNode('ul a:first-child').click();
}

// wraps querySelector/All in fetchNode(..) and fetchNodes(..)
function fetchNode (selector) {
  return document.querySelector(selector);
}
function fetchNodes (selector) {
  return document.querySelectorAll(selector);
}

// returns selected array segment as copy of array
function subArray (arr, head = 0, tail = arr.length) {
  const subArr = [];
  head = head <= arr.length ? head : 0;
  tail = tail <= arr.length ? tail : arr.length;
  while(head < tail) {
    subArr.push(arr[head]);
    head++;
  }
  return subArr;
}

// returns array of arrays size 'num' using subArray(..)
function groupSubArray (arr, num) {
  const groupArr = [];
  let count = 0;
  let end = num;
  const max = arr.length;
  do {
    groupArr.push(subArray(arr, count, end));
    count += num;
    end += num;
  } while((num * groupArr.length) < arr.length);
  return groupArr;
}

// calls fn on each item of arr
function forEach (fn, arr) {
  for(let e of arr){ fn(e); }
}

// show / hide node with nodeShow(..) and nodeHide(..)
function nodeShow (node) {
  !node.style.display || (node.style.display = '');
}
function nodeHide (node) {
  node.style.display || (node.style.display = 'none');
}

// creates div for pagination and appends links to div for buttons
function makePaginate() {
  let node = fetchNode('ul');
  node.insertAdjacentHTML('afterend', '<ul class="pagination"></ul>');
  node = fetchNode('.pagination');
  for(let i = grouped.length; i > 0; i--){
    node.insertAdjacentHTML('afterbegin', `<li><a href="#">${i}</a></li>`);
  }
  fetchNode('ul a').classList.add('active');
}

// creates listener -> handles state changes
function createListener() {
  let listener = fetchNode('.pagination');
  listener.addEventListener('click', event => {
    if(event.target.innerHTML > 0) {
    updateTitle(updatePage(event.target));
    }
  });
}

// changes title to show selected group of students
function updateTitle(i) {
  const node = fetchNode('h2');
  const start = ((i.innerHTML * displayNum) - displayNum) + 1;
  const end = i.innerHTML * displayNum;
  node.textContent = end < studentDiv.length ?
    `Students ${start} - ${end} of ${studentDiv.length}`:
    `Students ${start} - ${studentDiv.length} of ${studentDiv.length}`;
  return i;
}

// shows user selected page student group, changes active element
function updatePage (i) {
  fetchNode('.active') ?
    fetchNode('.active').classList.remove('active'):
    null;
  i.className = 'active';
  forEach(nodeHide, studentDiv);
  forEach(nodeShow, grouped[i.innerHTML - 1]);
  return i;
}
