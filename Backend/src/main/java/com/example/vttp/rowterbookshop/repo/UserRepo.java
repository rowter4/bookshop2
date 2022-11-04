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
        final SqlRowSet q = temp.queryForRowSet(SQL_GET_USER_FROM_EMAIL, email );
        if(!q.next())
            return null;

        return User.create(q);
    }

    public String getNameByEmail(String email) {
        final SqlRowSet q = temp.queryForRowSet(SQL_GET_USER_FROM_EMAIL, email );
        if(!q.next())
            return null;

        return q.getString("name");
    }

    public boolean saveNewUser(User user) {
        final int added = temp.update(SQL_INSERT_NEW_USER, user.getId(), user.getEmail(),
                                    new BCryptPasswordEncoder().encode(user.getPassword()), user.getName() );
        return added > 0;
    }

    // query
    public int getUserByEmailAndPassword(String email, String password) {
        final SqlRowSet q = temp.queryForRowSet(SQL_GET_USER_LOGIN, email, password);
        if(!q.next())
            return 0;
        return q.getInt("user_count");
    }

    // update
    // public int updatePw(User user) {
    //     int count = temp.update("update user set password = sha1(?) where email = ? and password = sha1(?)",
    //         user.getNewPassword(), user.getEmail(), user.getPassword());
    //     return count;
    // }
    
    // public void deleteUser(String email) {
    //     temp.update("delete from user where email = ?", email);
    // }



}
