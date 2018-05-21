//v1 working

// provide pagination for the web page by breaking the students into 10 student
// pages and generating a page navigator at the bottom of the page
'use strict';
// GLOBAL VARIABLES
const studentDiv = fetchNode('.student-item', true);
const studentGroups = [];
let sortNum = 10;
const numStudents = studentDiv.length;
let toggleControl = 0;

initialize();

// initializes the program to its starting state
function initialize(){
  groupStudents(studentGroups, studentDiv, sortNum);
  hideAll(studentGroups);
  studentGroups[0](toggleElementVis);
  makePaginate();
  createListener();
  fetchNode('ul a:first-child').click();
}

// breaks student divs into groups of num and passes to getStudents
function groupStudents (arr, node, num){
  let count = 1;
  let end = num;
  const max = node.length;
  while(end < max){
    arr.push(getStudents(node, count, end));
    count += num;
    end += num;
  }
  if (count < max) {
    arr.push(getStudents(node,count, max));
    return;
  }
}

// getElements binds a selection of node elements to the return function
function getStudents (node, start = 1, end = node.length){
  return fn => {
    for (let i = start - 1; i < end; i++){
      fn(node[i]);
    }
  }
}

// hides all of the student li elements
function hideAll(array) {
  for(let i = 0; i < array.length; i++){
    array[i](toggleElementVis);
  }
}

// toggles an elements visibility on the page
function toggleElementVis (node) {
  if(node.style.display) {
    node.style.display = '';
  } else {
    node.style.display = 'none';
  }
}

// creates div for pagination and appends links to div for buttons
function makePaginate() {
  let node = fetchNode('ul');
  node.insertAdjacentHTML('afterend', '<ul class="pagination"></ul>');
  node = fetchNode('.pagination');
  for(let i = studentGroups.length; i > 0; i--){
    node.insertAdjacentHTML('afterbegin', `<li><a href="#">${i}</a></li>`);
  }
  fetchNode('ul a').classList.add('active');
}

// adds buttons functionality passes events to onClick
function createListener() {
  let listener = fetchNode('.pagination');
  listener.addEventListener('click', event => {
    onClick(event.target.innerHTML);
  });
}

// handles eventListener 'click' for pagination buttons
function onClick(target){
  updateTitle(target);
  updatePage(target);
}

// changes title to show selected group of students
function updateTitle(i) {
  const node = fetchNode('h2');
  const start = ((i * sortNum) - sortNum) + 1;
  const end = i * sortNum;

  if(end < numStudents){
    node.textContent = `Students ${start} - ${end} of ${numStudents}`;
  } else if(end >= numStudents){
    node.textContent = `Students ${start} - ${numStudents} of ${numStudents}`;
  }
}

// updates page to selected paginate value
function updatePage (i) {
  fetchNode('.active').classList.remove('active');
  event.target.className = 'active';
  studentGroups[toggleControl](toggleElementVis);
  studentGroups[(i - 1)](toggleElementVis);
  toggleControl = (i - 1);
}

// returns a node obj
function fetchNode(selector, all = false){
  if(all){
    return document.querySelectorAll(selector);
  }
  return document.querySelector(selector);
}
