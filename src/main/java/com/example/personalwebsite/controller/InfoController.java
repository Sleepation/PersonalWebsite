package com.example.personalwebsite.controller;

import com.example.personalwebsite.model.GithubReadMe;
import com.example.personalwebsite.model.GithubRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
public class InfoController {

    private final RestClient restClient = RestClient.create();
    private static final int MAX_COUNT = 3;
    private List<GithubRepository> repos;
    private List<GithubReadMe> readMes;
    private long currentTime = 0;

    @GetMapping("/api/repos")
    public List<GithubRepository> getGitProjectsList(){

        if(cacheExpired()) {
            fetchRepos();
        }
        return repos;
    }

    @GetMapping("/api/repos/readme")
    public List<GithubReadMe> getReadme() {

        if(cacheExpired()) {
            fetchRepos();
        }

        return readMes;
    }


    private void fetchRepos(){

        //REPOS
        //ParameterizedTypeReference so that Jackson knows what to retrieve for the GithubRepository object (Contains nothing at first)
        repos = restClient.get().uri("https://api.github.com/users/Sleepation/repos").retrieve().body(new ParameterizedTypeReference<List<GithubRepository>>() {
        });
        repos.sort(Comparator.comparing(GithubRepository::stargazers_count));
        Collections.reverse(repos);
        repos = repos.subList(0, MAX_COUNT);

        //READ MES

        readMes = new ArrayList<GithubReadMe>();

        for(GithubRepository repo : repos){

            try {
                readMes.add(restClient.get().uri("https://api.github.com/repos/Sleepation/" + repo.name() + "/readme").retrieve().body(new ParameterizedTypeReference<GithubReadMe>() {
                }));
            } catch (Exception e) {
                readMes.add(new GithubReadMe("None", "None", "None", "None"));
            }
        }

        //Sets the current time to avoid repeated API calls
        currentTime = System.currentTimeMillis()/1000;
    }

    /**
     * This method checks if the API got called recently to refresh all data to the class variable lists (Github readMes and Github projects)
     * @return boolean indicating if there was time between last API call and now.
     */
    private boolean cacheExpired() {
        return currentTime == 0 ||
                System.currentTimeMillis() / 1000 - currentTime > 3600;
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
