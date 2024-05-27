package com.fishfinder.fish_search;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Fish {
    private int id;
    private String name;
    private String url;

    @JsonDeserialize(using = ImgSrcSetDeserializer.class)
    private Map<String, String> img_src_set;
    private Metadata meta;

    public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Map<String, String> getImg_src_set() {
		return img_src_set;
	}
	public void setImg_src_set(Map<String, String> img_src_set) {
		this.img_src_set = img_src_set;
	}
	public Metadata getMeta() {
		return meta;
	}
	public void setMeta(Metadata meta) {
		this.meta = meta;
	}
	
    // Getters and Setters
}

@JsonIgnoreProperties(ignoreUnknown = true)
class Metadata {
	@JsonProperty("binomial_name")
	private String binomialName;

	@JsonProperty("genera")
	private String genera;

	@JsonProperty("synonyms")
	private String synonyms;

	@JsonProperty("conservation_status")
	private String conservationStatus;

	@JsonProperty("scientific_classification")
    private Scientific_classification scientific_classification;

    // Getters and Setters
}
@JsonIgnoreProperties(ignoreUnknown = true)
class Scientific_classification {
    private String domain;
    private String kingdom;
    private String phylum;
    private String order;
    private String family;
    private String genus;
    private String species;
    private String subfamily;
    private String superfamily;
    private String subgenus;
    private String clade;
    
    @Override
    public String toString() {
        return "ScientificClassification{" +
               "domain='" + domain + '\'' +
               ", kingdom='" + kingdom + '\'' +
               ", phylum='" + phylum + '\'' +
               ", class='" + classs + '\'' +
               ", order='" + order + '\'' +
               ", family='" + family + '\'' +
               ", genus='" + genus + '\'' +
               ", species='" + species + '\'' +
               '}';
    }

    
    public String getSubgenus() {
		return subgenus;
	}
	public void setSubgenus(String subgenus) {
		this.subgenus = subgenus;
	}
	public String getSubfamily() {
		return subfamily;
	}
	public String getClade() {
		return clade;
	}
	public void setClade(String clade) {
		this.clade = clade;
	}
	public void setSubfamily(String subfamily) {
		this.subfamily = subfamily;
	}
	public String getSuperfamily() {
		return superfamily;
	}
	public void setSuperfamily(String superfamily) {
		this.superfamily = superfamily;
	}
	@JsonProperty("class")
    private String classs;
    
    public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getKingdom() {
		return kingdom;
	}
	public void setKingdom(String kingdom) {
		this.kingdom = kingdom;
	}
	public String getPhylum() {
		return phylum;
	}
	public void setPhylum(String phylum) {
		this.phylum = phylum;
	}
	public String getClasss() {
		return classs;
	}
	public void setClasss(String classs) {
		this.classs = classs;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getFamily() {
		return family;
	}
	public void setFamily(String family) {
		this.family = family;
	}
	public String getGenus() {
		return genus;
	}
	public void setGenus(String genus) {
		this.genus = genus;
	}
	public String getSpecies() {
		return species;
	}
	public void setSpecies(String species) {
		this.species = species;
	}

}
class ImgSrcSetDeserializer extends JsonDeserializer<Map<String, String>> {
    @Override
    public Map<String, String> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        if (p.currentToken().isScalarValue()) {
            String currentValue = p.getValueAsString();
            if ("Not available".equals(currentValue)) {
                return Collections.emptyMap();  // or null, depending on your preference
            }
        }
        return p.readValueAs(new TypeReference<Map<String, String>>() {});
    }
}
