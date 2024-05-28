package com.fishfinder.recipes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RecipeController {

    private static final String API_KEY = "46b02b2a0f6146ad937c5a05d9e0d136";
    private static final String SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/findByIngredients";

    @GetMapping("/recipes/{name}")
    public List<String> getRecipes(@PathVariable String name) {
        RestTemplate restTemplate = new RestTemplate();
        String url = SPOONACULAR_API_URL + "?ingredients=" + name + "&number=10&apiKey=" + API_KEY;
        ResponseEntity<Recipe[]> response = restTemplate.getForEntity(url, Recipe[].class);
        Recipe[] recipes = response.getBody();
        return Arrays.stream(recipes).map(Recipe::getTitle).collect(Collectors.toList());
    }

    static class Recipe {
        private String title;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }
    }
}