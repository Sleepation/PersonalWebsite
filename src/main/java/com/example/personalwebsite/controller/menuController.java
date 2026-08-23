package com.example.personalwebsite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class menuController {
    @GetMapping("/")
    public String mainMenu(){
        return "/html/home.html";
    }

    @GetMapping("/webGL")
    public String webGLTest(){
        return "/html/webGL.html";
    }
}
