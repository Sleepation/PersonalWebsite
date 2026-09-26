package com.example.personalwebsite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;

@Controller
public class thymeController {

    @GetMapping("/test1")
    public String index(Model model) {
        model.addAttribute("message", "Hello Thymeleaf");
        model.addAttribute("items", Arrays.asList("Item 1", "Item 2", "Item 3"));
        return "test";
    }
}
