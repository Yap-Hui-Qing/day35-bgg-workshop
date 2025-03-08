package vttp.batch5.day35.server.services;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import vttp.batch5.day35.server.repositories.GamesRepository;

@Service
public class GamesService {
    
    @Autowired
    private GamesRepository gamesRepo;

    public JsonArray search(String q, int count){
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        gamesRepo.searchGames(q, count).stream()
            .map(doc -> {
                return Json.createObjectBuilder()
                    .add("gid", doc.getInteger("gid"))
                    .add("name", doc.getString("name"))
                    .build();
            })
            .forEach(arrBuilder:: add);
        return arrBuilder.build();
    }

    public JsonObject searchById(int gid){
        Document doc = gamesRepo.searchGameById(gid);
        return Json.createObjectBuilder()
            .add("gid", gid)
            .add("name", doc.getString("name"))
            .add("year", doc.getInteger("year"))
            .add("ranking", doc.getInteger("ranking"))
            .add("users_rated", doc.getInteger("users_rated"))
            .add("url", doc.getString("url"))
            .add("image", doc.getString("image"))
            .build();
    }

    public JsonArray searchComments(int gid){
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        gamesRepo.searchComments(gid).stream()
            .map(doc -> {
                return Json.createObjectBuilder()
                    .add("user", doc.getString("user"))
                    .add("rating", doc.getInteger("rating"))
                    .add("c_text", doc.getString("c_text"))
                    .add("gid", doc.getInteger("gid"))
                    .build();
            })
            .forEach(arrBuilder:: add);
        return arrBuilder.build();
    }
}
