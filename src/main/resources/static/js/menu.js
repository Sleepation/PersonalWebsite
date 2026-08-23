function showSection(sectionId, button) {

    // Hide every section
    const sections = document.querySelectorAll(".section");

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