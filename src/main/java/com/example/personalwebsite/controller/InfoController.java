package com.example.personalwebsite.controller;

import com.example.personalwebsite.model.GithubReadMe;
import com.example.personalwebsite.model.GithubRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;

@RestController
public class InfoController {

    private final RestClient restClient = RestClient.create();

    @GetMapping("/api/repos")
    public List<GithubRepository> getGitProjectsList(){

        //ParameterizedTypeReference so that Jackson knows what to retrieve for the GithubRepository object (Contains nothing at first)
        List<GithubRepository> repos = restClient.get().uri("https://api.github.com/users/Sleepation/repos").retrieve().body(new ParameterizedTypeReference<List<GithubRepository>>(){});

        return repos;
    }

    @GetMapping("/api/repos/readme")
    public List<GithubReadMe> getReadme() {

        //ParameterizedTypeReference so that Jackson knows what to retrieve for the GithubRepository object (Contains nothing at first)
        List<GithubRepository> repos = restClient.get().uri("https://api.github.com/users/Sleepation/repos").retrieve().body(new ParameterizedTypeReference<List<GithubRepository>>(){});

        List<GithubReadMe> readMes = new ArrayList<>();

        for(GithubRepository repo : repos){
            try {
                readMes.add(restClient.get().uri("https://api.github.com/repos/Sleepation/" + repo.name() + "/readme").retrieve().body(new ParameterizedTypeReference<GithubReadMe>() {
                }));
            } catch (Exception e) {
                readMes.add(new GithubReadMe("None", "None", "None", "None"));
            }
        }

        return readMes;
    }

//    @GetMapping("/shader/vertex")
//    public String getVectorShader(){
//        try {
//            return new String(getClass().getResourceAsStream("/static/shader/vertex.glsl").readAllBytes(), StandardCharsets.UTF_8);
//        } catch (IOException ex){
//            System.out.println(ex);
//        }
//        return null;
//    }
//
//    @GetMapping("/shader/color")
//    public String getColorShader(){
//        try {
//            return new String(getClass().getResourceAsStream("/static/shader/fragment.glsl").readAllBytes(), StandardCharsets.UTF_8);
//        } catch (IOException ex){
//            System.out.println(ex);
//        }
//        return null;
//    }
//
////    private String fileToString(String ){
////
////    }



}
