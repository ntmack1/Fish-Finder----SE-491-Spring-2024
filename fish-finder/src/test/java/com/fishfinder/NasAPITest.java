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

public class NasAPITest {
    
    @Test
    @SuppressWarnings("rawtypes")
    public void NasGetSearch() throws IOException, InterruptedException{
        String url = "https://nas.er.usgs.gov/api/v2/species/search?genus=Lepomis&species=cyanellus";
        RestAssured.get(url).then().log().all().extract().body();
        RequestSpecification httpRequest = RestAssured.given();
        Response response = httpRequest.get(url);
        JsonPath jsonPathEve = response.jsonPath();
        FishBusobj fbo = new FishBusobj();
        
        ArrayList<HashMap> dataMap = jsonPathEve.get("results");

        for (HashMap data : dataMap) {
            fbo.setSpeciesId((Integer) data.get("speciesID"));
            fbo.setItisTsn((Integer) data.get("itis_tsn"));
            fbo.setGroup((String) data.get("group"));
            fbo.setGenus((String) data.get("genus"));
            fbo.setFamily((String) data.get("family"));
            fbo.setSpecies((String) data.get("species"));
            fbo.setSubspecies((String) data.get("subspecies"));
            fbo.setVariety((String) data.get("variety"));
            fbo.setAuthority((String) data.get("authority"));
            fbo.setCommonName((String) data.get("common_name"));
            fbo.setNativeExotic((String) data.get("native_exotic"));
            fbo.setFMB((String) data.get("Fresh/Marine/Brackish"));
        }

        Assert.assertEquals(fbo.getGroup(), "Fishes");
        Assert.assertEquals(fbo.getFamily(), "Centrarchidae");
        Assert.assertEquals(fbo.getGenus(), "Lepomis");
        Assert.assertEquals(fbo.getSpecies(), "cyanellus");
        Assert.assertEquals(fbo.getSubspecies(), "");
        Assert.assertEquals(fbo.getVariety(), "");
        Assert.assertEquals(fbo.getAuthority(), "Rafinesque, 1819");
        Assert.assertEquals(fbo.getCommonName(), "Green Sunfish");
        Assert.assertEquals(fbo.getNativeExotic(), "Native");
        Assert.assertEquals(fbo.getFMB(), "Freshwater");
        Assert.assertEquals(fbo.getSpeciesId().intValue(), 380);
        Assert.assertEquals(fbo.getItisTsn().intValue(), 168132);
    }

}
