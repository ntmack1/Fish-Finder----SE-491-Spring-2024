package com.fishfinder.recipes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class RecipeController {

    private static final String API_KEY = "d250a24af3624aaba54596fecc7f4ac0";
    private static final String SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/findByIngredients";

    @GetMapping("/recipes/{name}")
    public Map<String, Integer> getRecipes(@PathVariable String name) {
        RestTemplate restTemplate = new RestTemplate();
        String url = SPOONACULAR_API_URL + "?ingredients=" + name + "&number=10&apiKey=" + API_KEY;
        ResponseEntity<Recipe[]> response = restTemplate.getForEntity(url, Recipe[].class);
        Recipe[] recipes = response.getBody();
        return Arrays.stream(recipes).collect(Collectors.toMap(Recipe::getTitle, Recipe::getId));
    }

    @GetMapping("/recipe/{id}")
    public Recipe getRecipe(@PathVariable int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=false&apiKey=" + API_KEY;
        ResponseEntity<Recipe> response = restTemplate.getForEntity(url, Recipe.class);
        return response.getBody();
    }
}
