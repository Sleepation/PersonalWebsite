async function main(){

    const projectsContainer = await document.querySelector(".projects");
    const loadingArticle = document.createElement("article");

    loadingArticle.innerHTML = `
    <img src="/img/loadingGIF.gif" alt="Loading animation" class="loading">
`;

    projectsContainer.appendChild(loadingArticle);



    const response1 = await fetch("/api/repos");
    const projectsGitHub = await response1.json();

    const response2 = await fetch("/api/repos/readme");
    const readMesGitHub = await response2.json();

    loadingArticle.remove();

    projectsGitHub.forEach((project, index) =>{
        const article = document.createElement("article");
        article.classList.add("project");

        // const url = document.createElement("li")
        const readmeContent = atob(readMesGitHub[index].content).substring(0, 200) + " ...";
        // console.log(readmeContent)
        article.innerHTML = `
            <h3>${project.name}</h3>
            <p>${readmeContent}</p>
            <a href="${project.html_url}" target = "_blank">${project.html_url}</a>
        `;

        projectsContainer.appendChild(article);
    })

}




main()