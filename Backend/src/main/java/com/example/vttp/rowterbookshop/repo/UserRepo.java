package com.example.vttp.rowterbookshop.repo;

// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.example.vttp.rowterbookshop.model.User;
import static com.example.vttp.rowterbookshop.repo.Queries.*;

@Repository
public class UserRepo {

    @Autowired
    private JdbcTemplate temp;

    public User getUserByEmail(String email) {
        final SqlRowSet q = temp.queryForRowSet(SQL_GET_USER_FROM_EMAIL, email);
        if (!q.next())
            return null;

        return User.create(q);
    }

    public String getNameByEmail(String email) {
        final SqlRowSet q = temp.queryForRowSet(SQL_GET_USER_FROM_EMAIL, email);
        if (!q.next())
            return null;

        return q.getString("name");
    }

    public boolean saveNewUser(User user) {
        final int added = temp.update(SQL_INSERT_NEW_USER, user.getId(), user.getEmail(),
                new BCryptPasswordEncoder().encode(user.getPassword()), user.getName());
        return added > 0;
    }

    // query
    public int getUserByEmailAndPassword(String email, String password) {
        final SqlRowSet q = temp.queryForRowSet(SQL_GET_USER_LOGIN, email, password);
        if (!q.next())
            return 0;
        return q.getInt("user_count");
    }

    public boolean updateUserDetails(User user) {
        final int added = temp.update(SQL_UPDATE_TOKEN, user.getResetPasswordToken(), user.getEmail());
        return added > 0;
    }

    public boolean updateUserDetails2(Boolean token, String email) {
        final int added = temp.update(SQL_UPDATE_TOKEN, token, email);
        return added > 0;
    }


    public User getUserFromToken(User user){
        final SqlRowSet q = temp.queryForRowSet(SQL_GET_USER_FROM_TOKEN, user.getResetPasswordToken());
        if (!q.next())
            return null;

        return User.create(q);
    }

    public boolean updatePasswordDetails(User user) {
        final int added = temp.update(SQL_UPDATE_PASSWORD, new BCryptPasswordEncoder().encode(user.getNewPassword()),
                user.getResetPasswordToken());
        return added > 0;

    }

}
