package com.fishfinder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;


import io.restassured.RestAssured;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import org.junit.Test;
import org.junit.Assert;

import com.fishfinder.busobj.FishBusobj;

public class FishAPITest {
     private final int ZERO = 0;
    
    @Test
    @SuppressWarnings("rawtypes")
    public void fishApiSearch() throws IOException, InterruptedException{
        String url = "https://fish-species.p.rapidapi.com/fish_api/fish/Tarpon";
        RequestSpecification httpRequest = RestAssured.given().header("X-RapidAPI-Key", "6959ddb1bemsh7d9fb1d9461f99cp1b2c3cjsn3b25c9014ffd").header("X-RapidAPI-Host", "fish-species.p.rapidapi.com");
        Response response = httpRequest.get(url);
        JsonPath jsonPathEve = response.jsonPath();
        FishBusobj fbo = new FishBusobj();
        
        ArrayList<HashMap> dataMap = jsonPathEve.get("meta.scientific_classification");
        ArrayList<HashMap> imageMap = jsonPathEve.get("img_src_set");
        ArrayList<Integer> idArray = jsonPathEve.get("id");
        ArrayList<String> nameArray = jsonPathEve.get("name");
        ArrayList<String> wikiUrlArray = jsonPathEve.get("url");
        ArrayList<String> synonymsArray = jsonPathEve.get("meta.synonyms");
        ArrayList<String> speciesArray = jsonPathEve.get("meta.species");
        
        fbo.setSpeciesId(idArray.size() != ZERO ? idArray.get(ZERO) : null);
        fbo.setCommonName(nameArray.size() != ZERO ? nameArray.get(ZERO) : null);
        fbo.setWikiUrl(wikiUrlArray.size() != ZERO ? wikiUrlArray.get(ZERO) : "");
        fbo.setSynonyms(synonymsArray.size() != ZERO ? synonymsArray.get(ZERO) : "");
        fbo.setSpecies(speciesArray.size() != ZERO ? speciesArray.get(ZERO) : "");

        for (HashMap data : imageMap) {
            fbo.setImageOne((String) data.get("1.5x"));
            fbo.setImageTwo((String) data.get("2x"));
        }

        for (HashMap data : dataMap) {
            fbo.setDomain((String) data.get("domain"));
            fbo.setKingdom((String) data.get("kingdom"));
            fbo.setPhylum((String) data.get("phylum"));
            fbo.setFishClass((String) data.get("class"));
            fbo.setSuperOrder((String) data.get("superorder"));
            fbo.setOrder((String) data.get("order"));
            fbo.setFamily((String) data.get("family"));
            fbo.setGenus((String) data.get("genus"));
        }

        Assert.assertEquals(fbo.getSpeciesId().intValue(), 953);
        Assert.assertEquals(fbo.getCommonName(), "Tarpon");
        Assert.assertEquals(fbo.getWikiUrl(), "https://en.wikipedia.org/wiki/Tarpon");
        Assert.assertEquals(fbo.getImageOne(), "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Atlantic_tarpon.jpg/330px-Atlantic_tarpon.jpg");
        Assert.assertEquals(fbo.getImageTwo(), "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Atlantic_tarpon.jpg/440px-Atlantic_tarpon.jpg");
        Assert.assertEquals(fbo.getSynonyms(), "Amia Browne 1756 ex Browne 1789 non Gronow 1763 ex Gray 1854 non Meuschen 1781 non Linnaeus 1766, Brisbania de Castelnau 1878, Cyprinodon Hamilton 1822 non Lacépède 1803, Oculeus Commerson ex Lacépède 1803, Tarpon Jordan & Evermann 1896");
        Assert.assertEquals(fbo.getSpecies(), "M. atlanticus Valenciennes, 1847, M. cyprinoides (Broussonet, 1782), †M. priscus (Woodward 1901), †M. oblongus (Woodward 1901), †M. vigilax (Jordan 1927)");
        Assert.assertEquals(fbo.getDomain(), "eukaryota");
        Assert.assertEquals(fbo.getKingdom(), "animalia");
        Assert.assertEquals(fbo.getPhylum(), "chordata");
        Assert.assertEquals(fbo.getFishClass(), "actinopterygii");
        Assert.assertEquals(fbo.getSuperOrder(), "elopomorpha");
        Assert.assertEquals(fbo.getOrder(), "elopiformes");
        Assert.assertEquals(fbo.getFamily(), "megalopidaed._s._jordan,_1923");
        Assert.assertEquals(fbo.getGenus(), "megalopsvalenciennes,_1847");
    }

}
