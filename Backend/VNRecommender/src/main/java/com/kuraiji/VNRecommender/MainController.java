package com.kuraiji.VNRecommender;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.util.List;

@RestController
public class MainController {

    @GetMapping("/recommend")
    public String recommend(
            @RequestParam(value = "userid") int userid,
            @RequestParam(value = "language_filters", required = false) List<String> language_filters,
            @RequestParam(value = "platform_filters", required = false) List<String> platform_filters
            ) throws IOException, URISyntaxException, Exception {
        System.out.print(userid);
        System.out.print(language_filters);
        System.out.print(platform_filters);

        StringBuilder url = new StringBuilder("http://0.0.0.0:8000/recommend/");
        url.append("?userid=").append(userid);
        if(language_filters != null) {
            for (String language : language_filters) {
                url.append("&language_filters=").append(language);
            }
        }
        if(platform_filters != null) {
            for (String platform : platform_filters) {
                url.append("&platform_filters=").append(platform);
            }
        }
        System.out.print(url);
        URL url_obj = new URI(url.toString()).toURL();
        HttpURLConnection con = (HttpURLConnection) url_obj.openConnection();
        con.setRequestMethod("GET");
        if(con.getResponseCode() != 200) {
            throw new Exception("Connection not successful");
        }
        BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String input;
        while ((input = reader.readLine()) != null) {
            System.out.println(input);
        }

        return "Poo";
    }
}
