package com.example.vttp.rowterbookshop.service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.example.vttp.rowterbookshop.model.User;
import com.example.vttp.rowterbookshop.repo.UserRepo;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo uRepo;


    public boolean insertUser(User user) {
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString().substring(0, 8);
        user.setId(id);
        boolean added = uRepo.saveNewUser(user);
        if (added) {
            return true;
        } else {
            return false;
        }
    }

    public boolean authLogin(String email, String password) {
        return 1 == uRepo.getUserByEmailAndPassword(email, password);
    }

    public Optional<String> getNameFromEmail(String email) {
        String name = uRepo.getNameByEmail(email);

        if (name == null) {
            throw new UsernameNotFoundException("Name not found with email: " + email);
        }

        return Optional.of(name);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = uRepo.getUserByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }

    public void updateResetPasswordToken(String token, String email) {
        User user = uRepo.getUserByEmail(email);

        if (user != null) {
            user.setResetPasswordToken(token);
            uRepo.updateUserDetails(user);
        }
    }


    public boolean updatePassword(User updatedUserDetails) {

        User userWithAllDetails = uRepo.getUserFromToken(updatedUserDetails);
        Boolean reset_token = null;

        if (userWithAllDetails != null) {
            uRepo.updatePasswordDetails(updatedUserDetails);
            uRepo.updateUserDetails2(reset_token, userWithAllDetails.getEmail());
            return true;
        } else {
            return false;
        }
       
    }

}
