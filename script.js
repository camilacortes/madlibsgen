//input text 
var nounsInput = document.getElementById('nouns');
var adjInput = document.getElementById('adjectives');
var verbInput = document.getElementById('verbs');
var adverbInput = document.getElementById('adverbs');

//radio buttons 
var christmasRadioBtn = document.getElementById('christmas-radio');
var shoppingRadioBtn = document.getElementById('shopping-radio');
var brainstormRadioBtn = document.getElementById('brainstorm-radio');

//submit button 
var submitBtn = document.getElementById('submit-button');

//stories 
var christmasStry = document.getElementById('christmas-story');
var shoppingStry = document.getElementById('shopping-story');
var brainstormStry = document.getElementById('brainstorm-story');

//submit button event listener when clicking
submitBtn.addEventListener("click", function(event) {
  // gets input from the user 
  var inputVals = getInputVals();
  // it combines user and backup words 
  var finalWords = genFinalWords(inputVals);
  // get current story name   
  var storyName = getCurrentStoryName();
  // fill in stories with words 
  fillInStory(storyName,finalWords);
  displayStory();
});

// get value from input boxes 
function getInputVals(){
  return {
    nouns: nounsInput.value.split(','),
    adjectives: adjInput.value.split(','),
    verbs: verbInput.value.split(','),
    adverbs: adverbInput.value.split(',')
  };
}

// return stories. 

function displayStory(){
  hideAllStories();
  if(christmasRadioBtn.checked){
    christmasStry.style.display = "block";
  }else if(shoppingRadioBtn.checked){
    shoppingStry.style.display = "block";
  }else if(brainstormRadioBtn.checked){
    brainstormStry.style.display = "block";
  }else{
    var storiesContainer = document.getElementById('warning-message');
    storiesContainer.innerHTML = "Please select a story!";
    storiesContainer.style.color = "red";
  }
}

function genFinalWords(userWords){
  var finalWords = {
    nouns: userWords.nouns.slice(0),
    verbs: userWords.verbs.slice(0),
    adjectives: userWords.adjectives.slice(0),
    adverbs: userWords.adverbs.slice(0),
  };

  for(var wordType in userWords){
    while(finalWords[wordType].length < 4){
      finalWords[wordType].push(getRandElem(backupWords[wordType]));
    }
  }

  return finalWords;
}

function getCurrentStoryName(){
  if(christmasRadioBtn.checked){
    return 'christmas';
  }else if(shoppingRadioBtn.checked){
    return 'shopping';
  }else if(brainstormRadioBtn.checked){
    return 'brainstorm';
  }
}

function hideAllStories(){
  christmasStry.style.display = "none";
  shoppingStry.style.display = "none";
  brainstormStry.style.display = "none";
}

function fillInStory(storyName, finalWords){
  var emptyVerbs = document.querySelectorAll('#' + storyName + '-story .verb');
  var emptyNouns = document.querySelectorAll('#' + storyName + '-story .noun');
  var emptyAdverbs = document.querySelectorAll('#' + storyName + '-story .adverb');
  var emptyAdjs = document.querySelectorAll('#' + storyName + '-story .adjective');

  for(var i = 0; i < 4; i++){
    emptyVerbs[i].innerText = finalWords.verbs[i];
    emptyNouns[i].innerText = finalWords.nouns[i];
    emptyAdverbs[i].innerText = finalWords.adverbs[i];
    emptyAdjs[i].innerText = finalWords.adjectives[i];
  }
}



// loops through elements in array 
function getRandElem(arr) {
  return arr[genRandNum(0, arr.length - 1)];
}

function genRandNum(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

