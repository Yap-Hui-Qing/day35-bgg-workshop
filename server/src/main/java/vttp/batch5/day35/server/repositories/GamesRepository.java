package vttp.batch5.day35.server.repositories;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class GamesRepository {

    @Autowired
    private MongoTemplate template;

    /*
    db.games.find({
        name: {$regex: 'master', $options: 'i'}},
        {
            _id: 0, year: 0
        }
    ).limit(5)
    .sort({name: 1})
     */
    
    public List<Document> searchGames(String q, int count){
        Criteria criteria = Criteria.where("name")
            .regex(q, "i");
        Query query = Query.query(criteria)
            .limit(count)
            .with(Sort.by(Sort.Direction.ASC, "name"));
        query.fields()
            .include("gid", "name")
            .exclude("_id");
        return template.find(query, Document.class, "games");
    }

    public Document searchGameById(int gid){
        Criteria criteria = Criteria.where("gid").is(gid);
        Query query = Query.query(criteria);
        query.fields()
            .exclude("_id");
        return template.find(query, Document.class, "games").get(0);
    }

    public List<Document> searchComments(int gid){
        Criteria criteria = Criteria.where("gid").is(gid);
        Query query = Query.query(criteria)
            .with(Sort.by(Sort.Direction.DESC, "rating"))
            .limit(5);
        query.fields()
            .include("user", "rating", "c_text", "gid")
            .exclude("_id");
        return template.find(query, Document.class, "comments");
    }
}
