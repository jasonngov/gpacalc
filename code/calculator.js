var listgrades = [];
var listcredits = [];
var listgpa = [];
var multiplyList = [];
var grade, credit;
var i = 0;
function validInput (grade){
     var validGrade = /[^A-D,F,+-]/g;
     grade.value = grade.value.replace(validGrade,"");    

    //method to check if input has a value like 'AB'
     if(grade.value.length > 1 && !grade.value.includes("+") && !grade.value.includes("-")){grade.value = " ";}

     //condition checks if initial input is + or -
     else if (grade.value == "+" || grade.value == "-"){grade.value = " ";}

     //condition checks if input is equal to invalid grades D-, F-, F+
     else if (grade.value == "D-"){grade.value = " ";} 
     else if (grade.value == "F-" || grade.value == "F+") {grade.value = " ";}

     //checks if input is > 2 characters 
     else if (grade.value.length > 2){grade.value = " ";} 
}
function validCredit (credit){
    var validInt = /[^0-9,.]/gi;
    credit.value = credit.value.replace(validInt,"");
}
function getID (name) {
    var element = name.id;
    var index = element.substring(5,6);
    displayValue(element, index);
}

//changes the color of each inputted grade
function displayValue(id, num) {
   input = document.getElementById(id).value;
   if (input == "A"){ document.getElementById("display" + num).style.color = "green";}
   if (input == "B"){document.getElementById("display" + num).style.color = "orange";}
   if (input == "C"){document.getElementById("display" + num).style.color = "blue";}
   if (input == "D"){document.getElementById("display" + num).style.color = "#af03ff";}
   if (input == "F"){document.getElementById("display" + num).style.color = "red";}
   if (input == ""){document.getElementById("display" + num).value = " ";}
   document.getElementById("display" + num).innerHTML = input;
}

//function to clear text field when reset button is pressed
function clearTextField (){
    for (var i = 0; i < 8; i++){
        document.getElementById("display" + i).innerHTML = "";
        document.getElementById("grade" + i).value = "";
        document.getElementById("credit" + i).value = "";
        document.getElementById("output").innerHTML = "0.0";
        listgrades = [];
        listcredits = [];
        listgpa = [];
        multiplyList = [];
    }
}

/* function to calculateGPA
 * fills array of grades, credits, weighted grade point values, and the product between the weight & credit
 * sums each weight & credit, and divides by the total credit = GPA
*/
function calculateGPA (){
    //load inputted grades and credits into respective arrays
    for (var i = 0; i < 8; i++){
        grade = document.getElementById("display" + i).innerHTML;
        credit = document.getElementById("credit" + i).value;

        //checks if both inputs are filled for each card
        if (grade != "" && credit == "" || credit != "" && grade == ""){
            alert("Invalid entry! Each grade must have an assigned number of credits."); 
            document.getElementById("output").innerHTML = "0.0"
            return;
        } 

        //pushes grade into respective arrays if input has a value
       if (grade != ""){listgrades.push(grade);}
       if (credit != ""){listcredits.push(credit);}

    }
    
    //assign each grade in listgrade (array of grades) to a weighted point value and store in listgpa
    listgrades.forEach(function(a) {
        if (a == "A+"){listgpa.push(4.0);}
        if (a == "A"){listgpa.push(4.0);}
        if (a == "A-"){listgpa.push(3.67);}
        if (a == "B+"){listgpa.push(3.33);}
        if (a == "B"){listgpa.push(3.0);}
        if (a == "B-"){listgpa.push(2.67);}
        if (a == "C+"){listgpa.push(2.33);}
        if (a == "C"){listgpa.push(2.0);}
        if (a == "C-"){listgpa.push(1.67);}
        if (a == "D+"){listgpa.push(1.33);}
        if (a == "D"){listgpa.push(1.0);}
        if (a == "F"){listgpa.push(0.0);}
        if (a == ""){listgpa.push(0.0);}
    })
    parseInt(listgrades, 10); //turns all value in array into integers

    //sum total credits
    var sum = 0;
    listcredits.forEach(function(a){
        sum += parseInt(a, 10);
    })

    //multiply weighted grade and credit
    var sumGradeCredit = 0;
    for (var i = 0; i < listgrades.length; i++){
        multiplyList[i] = listcredits[i] * listgpa[i];
        sumGradeCredit += multiplyList[i];
    }
    //final gpa
        var quotient = sumGradeCredit/sum;
        var weightedgpa = Math.round(quotient * 100)/100

    //display gpa
    if (sumGradeCredit == 0 && sum == 0){
        document.getElementById("output").innerHTML = "0.0";
        alert("Invalid submission!"); return;
    } else {
        document.getElementById("output").innerHTML = weightedgpa;
    }
    
    //reset array fields when gpa calculated
    listgrades = [];
    listcredits = [];
    listgpa = [];
    multiplyList = [];
}