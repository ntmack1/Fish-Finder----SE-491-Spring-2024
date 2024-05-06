package com.fishfinder;

import java.util.ArrayList;
import java.util.HashMap;

import org.junit.Test;
import org.junit.Assert;

import com.fishfinder.busobj.MealDBBusobj;

import io.restassured.RestAssured;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class TheMealDBAPITest {
    
    @Test
    @SuppressWarnings("rawtypes")
    public void mealUnitTest(){
        String url = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
        RestAssured.get(url).then().log().all().extract().body();
        RequestSpecification httpRequest = RestAssured.given();
        Response response = httpRequest.get(url);
        JsonPath jsonPathEve = response.jsonPath();
        MealDBBusobj mdbo = new MealDBBusobj();
        ArrayList<HashMap> dataMap = jsonPathEve.get("meals");
        for (HashMap data : dataMap) {
            mdbo.setMealId((String) data.get("idMeal"));
            mdbo.setStrMeal((String) data.get("strMeal"));
            mdbo.setStrDrinkAlternate((String) data.get("strDrinkAlternate"));
            mdbo.setStrCategory((String) data.get("strCategory"));
            mdbo.setStrArea((String) data.get("strArea"));
            mdbo.setStrInstructions((String) data.get("strInstructions"));
            mdbo.setStrMealThumb((String) data.get("strMealThumb"));
            mdbo.setStrTags((String) data.get("strTags"));
            mdbo.setStrYoutube((String) data.get("strYoutube"));
            mdbo.setStrIngredient1((String) data.get("strIngredient1"));
            mdbo.setStrIngredient2((String) data.get("strIngredient2"));
            mdbo.setStrIngredient3((String) data.get("strIngredient3"));
            mdbo.setStrIngredient4((String) data.get("strIngredient4"));
            mdbo.setStrIngredient5((String) data.get("strIngredient5"));
            mdbo.setStrIngredient6((String) data.get("strIngredient6"));
            mdbo.setStrIngredient7((String) data.get("strIngredient7"));
            mdbo.setStrIngredient8((String) data.get("strIngredient8"));
            mdbo.setStrIngredient9((String) data.get("strIngredient9"));
            mdbo.setStrIngredient10((String) data.get("strIngredient10"));
            mdbo.setStrIngredient11((String) data.get("strIngredient11"));
            mdbo.setStrIngredient12((String) data.get("strIngredient12"));
            mdbo.setStrIngredient13((String) data.get("strIngredient13"));
            mdbo.setStrIngredient14((String) data.get("strIngredient14"));
            mdbo.setStrIngredient15((String) data.get("strIngredient15"));
            mdbo.setStrIngredient16((String) data.get("strIngredient16"));
            mdbo.setStrIngredient17((String) data.get("strIngredient17"));
            mdbo.setStrIngredient18((String) data.get("strIngredient18"));
            mdbo.setStrIngredient19((String) data.get("strIngredient19"));
            mdbo.setStrIngredient20((String) data.get("strIngredient20"));
            mdbo.setStrMeasure1((String) data.get("strMeasure1"));
            mdbo.setStrMeasure2((String) data.get("strMeasure2"));
            mdbo.setStrMeasure3((String) data.get("strMeasure3"));
            mdbo.setStrMeasure4((String) data.get("strMeasure4"));
            mdbo.setStrMeasure5((String) data.get("strMeasure5"));
            mdbo.setStrMeasure6((String) data.get("strMeasure6"));
            mdbo.setStrMeasure7((String) data.get("strMeasure7"));
            mdbo.setStrMeasure8((String) data.get("strMeasure8"));
            mdbo.setStrMeasure9((String) data.get("strMeasure9"));
            mdbo.setStrMeasure10((String) data.get("strMeasure10"));
            mdbo.setStrMeasure11((String) data.get("strMeasure11"));
            mdbo.setStrMeasure12((String) data.get("strMeasure12"));
            mdbo.setStrMeasure13((String) data.get("strMeasure13"));
            mdbo.setStrMeasure14((String) data.get("strMeasure14"));
            mdbo.setStrMeasure15((String) data.get("strMeasure15"));
            mdbo.setStrMeasure16((String) data.get("strMeasure16"));
            mdbo.setStrMeasure17((String) data.get("strMeasure17"));
            mdbo.setStrMeasure18((String) data.get("strMeasure18"));
            mdbo.setStrMeasure19((String) data.get("strMeasure19"));
            mdbo.setStrMeasure20((String) data.get("strMeasure20"));
            mdbo.setStrSource((String) data.get("strSource"));
            mdbo.setStrImageSource((String) data.get("strImageSource"));
            mdbo.setStrCreativeCommonsConfirmed((String) data.get("strCreativeCommonsConfirmed"));
            mdbo.setDateModified((String) data.get("dateModified"));
        }

        Assert.assertEquals(mdbo.getDateModified(), null);
        Assert.assertEquals(mdbo.getMealId(), "52771");
        Assert.assertEquals(mdbo.getStrMeal(), "Spicy Arrabiata Penne");
        Assert.assertEquals(mdbo.getStrDrinkAlternate(), null);
        Assert.assertEquals(mdbo.getStrCategory(), "Vegetarian");
        Assert.assertEquals(mdbo.getStrArea(), "Italian");
        Assert.assertEquals(mdbo.getStrInstructions(), "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.");
        Assert.assertEquals(mdbo.getStrMealThumb(), "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg");
        Assert.assertEquals(mdbo.getStrTags(), "Pasta,Curry");
        Assert.assertEquals(mdbo.getStrYoutube(), "https://www.youtube.com/watch?v=1IszT_guI08");
        Assert.assertEquals(mdbo.getStrIngredient1(), "penne rigate");
        Assert.assertEquals(mdbo.getStrIngredient2(), "olive oil");
        Assert.assertEquals(mdbo.getStrIngredient3(), "garlic");
        Assert.assertEquals(mdbo.getStrIngredient4(), "chopped tomatoes");
        Assert.assertEquals(mdbo.getStrIngredient5(), "red chile flakes");
        Assert.assertEquals(mdbo.getStrIngredient6(), "italian seasoning");
        Assert.assertEquals(mdbo.getStrIngredient7(), "basil");
        Assert.assertEquals(mdbo.getStrIngredient8(), "Parmigiano-Reggiano");
        Assert.assertEquals(mdbo.getStrIngredient9(), "");
        Assert.assertEquals(mdbo.getStrIngredient10(), "");
        Assert.assertEquals(mdbo.getStrIngredient11(), "");
        Assert.assertEquals(mdbo.getStrIngredient12(), "");
        Assert.assertEquals(mdbo.getStrIngredient13(), "");
        Assert.assertEquals(mdbo.getStrIngredient14(), "");
        Assert.assertEquals(mdbo.getStrIngredient15(), "");
        Assert.assertEquals(mdbo.getStrIngredient16(), null);
        Assert.assertEquals(mdbo.getStrIngredient17(), null);
        Assert.assertEquals(mdbo.getStrIngredient18(), null);
        Assert.assertEquals(mdbo.getStrIngredient19(), null);
        Assert.assertEquals(mdbo.getStrIngredient20(), null);
        Assert.assertEquals(mdbo.getStrMeasure1(), "1 pound");
        Assert.assertEquals(mdbo.getStrMeasure2(), "1/4 cup");
        Assert.assertEquals(mdbo.getStrMeasure3(), "3 cloves");
        Assert.assertEquals(mdbo.getStrMeasure4(), "1 tin ");
        Assert.assertEquals(mdbo.getStrMeasure5(), "1/2 teaspoon");
        Assert.assertEquals(mdbo.getStrMeasure6(), "1/2 teaspoon");
        Assert.assertEquals(mdbo.getStrMeasure7(), "6 leaves");
        Assert.assertEquals(mdbo.getStrMeasure8(), "spinkling");
        Assert.assertEquals(mdbo.getStrMeasure9(), "");
        Assert.assertEquals(mdbo.getStrMeasure10(), "");
        Assert.assertEquals(mdbo.getStrMeasure11(), "");
        Assert.assertEquals(mdbo.getStrMeasure12(), "");
        Assert.assertEquals(mdbo.getStrMeasure13(), "");
        Assert.assertEquals(mdbo.getStrMeasure14(), "");
        Assert.assertEquals(mdbo.getStrMeasure15(), "");
        Assert.assertEquals(mdbo.getStrMeasure16(), null);
        Assert.assertEquals(mdbo.getStrMeasure17(), null);
        Assert.assertEquals(mdbo.getStrMeasure18(), null);
        Assert.assertEquals(mdbo.getStrMeasure19(), null);
        Assert.assertEquals(mdbo.getStrMeasure20(), null);
        Assert.assertEquals(mdbo.getStrSource(), null);
        Assert.assertEquals(mdbo.getStrImageSource(), null);
        Assert.assertEquals(mdbo.getStrCreativeCommonsConfirmed(), null);
    }
}
