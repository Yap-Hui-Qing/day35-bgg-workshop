package vttp.batch5.day35.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import vttp.batch5.day35.server.services.GamesService;

@Controller
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class GamesController {

    @Autowired
    private GamesService gamesSvc;
    
    @GetMapping("/search")
    public ResponseEntity<String> getGames(@RequestParam String q, @RequestParam(defaultValue = "10") int count){

        JsonArray result = gamesSvc.search(q, count);
        
        return ResponseEntity.ok(result.toString());
    }

    @GetMapping("/search/{gid}")
    public ResponseEntity<String> getGameById(@PathVariable int gid){
        JsonObject obj = gamesSvc.searchById(gid);
        return ResponseEntity.ok(obj.toString());
    }

    @GetMapping("/search/{gid}/comments")
    public ResponseEntity<String> getCommentsById(@PathVariable int gid){

        JsonArray result = gamesSvc.searchComments(gid);
        
        return ResponseEntity.ok(result.toString());
    }
}
