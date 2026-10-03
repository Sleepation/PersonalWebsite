async function main(){
    const response = await fetch("/api/projects");
    const projectsGitHub = await response.json();

    const projectsContainer = await document.querySelector(".projects");

    projectsGitHub.forEach(project =>{
        const article = document.createElement("article");
        article.classList.add("project");

        // const url = document.createElement("li")
        article.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.html_url}" target = "_blank">${project.html_url}</a>
        `;

        projectsContainer.appendChild(article);
    })

}




main()