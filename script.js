console.log("hello");
var saveButton = document.getElementById("save");
function savePlan() {
    // Save related form data as an object
    var studentGrade = {
      student: student.value,
      grade: grade.value,
      comment: comment.value.trim()
    };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
  }
  
  function renderPlan() {
    // Use JSON.parse() to convert text to JavaScript object
    var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
    // Check if data is returned, if not exit out of the function
    if (lastGrade !== null) {
    document.getElementById("saved-name").innerHTML = lastGrade.student;
    document.getElementById("saved-grade").innerHTML = lastGrade.grade;
    document.getElementById("saved-comment").innerHTML = lastGrade.comment;
    } else {
      return;
    }
  }


saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    savePlan();
    renderPlan();
    });