package com.example.personalwebsite.model;

public record GithubRepository(
        String name,
        String description,
        String html_url
) {}

    //No Constructor use because Jackson does the job for you
