package com.example.personalwebsite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;

@Controller
public class menuController {
    @GetMapping("/")
    public String mainMenu(){
        return "redirect:/html/home.html";
    }

    @GetMapping("/about")
    public String aboutMenu(){return "redirect:/html/about.html";}

    @GetMapping("/skills")
    public String skillsMenu(){return "redirect:/html/skills.html";}

    @GetMapping("/projects")
    public String projectsMenu(){return "redirect:/html/projects.html";}

    @GetMapping("/experience")
    public String experienceMenu(){return "redirect:/html/experience.html";}

    @GetMapping("/contact")
    public String contactMenu(){return "redirect:/html/contact.html";}

    @GetMapping("/webGL")
    public String webGLTest(){
        return "redirect:/html/webGL.html";
    }



}
