package com.example.personalwebsite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class menuController {
    @GetMapping("/")
    public String mainMenu(){
        return "/html/home.html";
    }

    @GetMapping("/about")
    public String aboutMenu(){return "/html/about.html";}

    @GetMapping("/skills")
    public String skillsMenu(){return "/html/skills.html";}

    @GetMapping("/projects")
    public String projectsMenu(){return "/html/projects.html";}

    @GetMapping("/experience")
    public String experienceMenu(){return "/html/experience.html";}

    @GetMapping("/contact")
    public String contactMenu(){return "/html/contact.html";}

    @GetMapping("/webGL")
    public String webGLTest(){
        return "/html/webGL.html";
    }
}
