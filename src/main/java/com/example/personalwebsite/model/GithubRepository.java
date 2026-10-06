package com.example.personalwebsite.model;

public record GithubRepository(
        String name,
        String description,
        String html_url,
        Integer stargazers_count
) {}

    //No Constructor use because Jackson does the job for you
