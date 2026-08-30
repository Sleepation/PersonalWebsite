function showSection(sectionClassName, sectionId, button) {

    // Hide every section
    const sections = document.querySelectorAll("." + sectionClassName);

    sections.forEach(section => {
        section.classList.remove("active");
    });


    // Remove active state from every button
    const buttons = document.querySelectorAll(".menu-tab");

    buttons.forEach(tab => {
        tab.classList.remove("active");
    });


    // Show selected section
    document.getElementById(sectionId).classList.add("active");


    // Highlight selected button
    button.classList.add("active");
}


function showSkill(sectionId, button) {

    // Hide every skillBoxes
    const skillBoxes = document.querySelectorAll(".skill-box");

    skillBoxes.forEach(skillBox => {
        skillBox.classList.remove("active");
    });


    // Remove active state from every button
    const buttons = document.querySelectorAll(".skill");

    buttons.forEach(tab => {
        tab.classList.remove("active");
    });


    // Show selected skill
    document.getElementById(sectionId).classList.add("active");


    // Highlight selected button
    button.classList.add("active");
}