package com.example.vttp.rowterbookshop.model;

import java.io.StringReader;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class User {
    String id;
    String email;
    String password;
    String name;
    String newPassword;

    public String getNewPassword() { return newPassword;  }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }

    public String getId() { return id;  }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public static User create(SqlRowSet rowSet) {
        User user = new User();
        user.setId(rowSet.getString("userId"));
        user.setEmail(rowSet.getString("email"));
        user.setPassword(rowSet.getString("password"));
        user.setName(rowSet.getString("name"));
        return user;
    }

    public static User createFromJsonString(String json) {
        JsonReader r = Json.createReader(new StringReader(json));
        JsonObject data = r.readObject();

        final User u = new User();
        u.setEmail(data.getString("email"));
        u.setPassword(data.getString("password"));
        u.setName(data.getString("name"));
        return u;
        
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("email", email)
            .build();
    }
}
