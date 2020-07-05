//Variables
var no_sentences;
var no_words;
var no_syllables;
var Flesch_rating;
var score;
//Functions
function count(word) {
  word = word.toLowerCase();                                     
                             
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   
    word = word.replace(/^y/, '');                                
    var temp = word.match(/[aeiouy]{1,2}/g);                  
    if(temp==null)return 0;
    return temp.length;
}
function Flesch(){
	score = 206.835 - (1.015*(no_words/no_sentences)) - (84.6*(no_syllables/no_words));
	
	if(score<100 && score>=90){Flesch_rating = "Very Easy";}
	else if(score<100 && score>=80){Flesch_rating = "Easy";}
	else if(score<100 && score>=70){Flesch_rating = "Fairly Easy";}
	else if(score<100 && score>=60){Flesch_rating = "Easily understood by 13 year olds";}
	else if(score<100 && score>=50){Flesch_rating = "Fairly difficult";}
	else if(score<100 && score>=30){Flesch_rating = "Difficult";}
	else if(score<100 && score>=10){Flesch_rating = "Very difficult";}
	else if(score<10 && score>0){Flesch_rating = "Extremely difficult";}
	else Flesch_rating="Invalid";

	return Flesch_rating;
}
function getInputValue(){
no_sentences = 0;
no_syllables = 0;
no_words = 0;
var text = document.getElementById("userInput").value;
var sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
//Trim the sentences
var i;
for(i=0;i<sentences.length;i++)
{
	sentences[i] = sentences[i].trim();
	sentences[i] = sentences[i].substring(0,(sentences[i]).length-1);
}
var words; 
var total_words=[];

for(i=0;i<sentences.length;i++)
{
	
	 words = sentences[i].split(" ");
	total_words.push(...words);
}
for(i=0;i<total_words.length;i++)
{
	
	 no_syllables = no_syllables + count(total_words[i]);
}
console.log(no_syllables);
var temp = total_words.length;
//Average reading time is 200 words per min
var bef = temp/200;
var aft = temp%200;
aft = aft * 0.60;
if(aft>30)
{
	bef = bef + 1;
}
var time = bef.toFixed(0);
no_sentences = sentences.length;
no_words = total_words.length;

document.getElementById("sentences").innerHTML = sentences.length;
document.getElementById("words").innerHTML = time+" min read";
document.getElementById("syllables").innerHTML = no_words;
document.getElementById("flesch").innerHTML = Flesch();

        }