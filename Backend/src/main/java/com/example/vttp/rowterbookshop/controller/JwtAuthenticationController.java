package com.example.vttp.rowterbookshop.controller;

import jakarta.json.Json;
import jakarta.json.JsonObject;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

// import org.apache.catalina.connector.Response;
// import com.techgeeknext.model.JwtRequest;
// import com.techgeeknext.model.JwtResponse;
// import com.techgeeknext.model.UserDto;
// import com.techgeeknext.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.vttp.rowterbookshop.config.JwtTokenUtil;
import com.example.vttp.rowterbookshop.model.JwtRequest;
import com.example.vttp.rowterbookshop.model.JwtResponse;
import com.example.vttp.rowterbookshop.model.User;
import com.example.vttp.rowterbookshop.model.Utility;
import com.example.vttp.rowterbookshop.service.EmailSenderService;
import com.example.vttp.rowterbookshop.service.UserService;


@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserService userDetailsService;

	@Autowired
	private EmailSenderService senderService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}


    @RequestMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<String> saveUser(@RequestBody User user) throws Exception {
		
        try {
            userDetailsService.insertUser(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
        }
        JsonObject data = Json.createObjectBuilder()
            .add("email", user.getEmail())
			.add("name",user.getName())
            .build();

        return ResponseEntity.ok(data.toString());
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}


	@PostMapping(path = "/forget-password")
	public ResponseEntity<String> forgetPassword(HttpServletRequest request, @RequestBody User user) {
		System.out.println(">>> Able to call forget password");
		System.out.println(">>> See what is inside email requested password : %s".formatted(user.getEmail()));
		System.out.println(">>> See what is inside request of HTTP : %s".formatted(request.getRequestURL()));
		System.out.println(">>> See what is inside request of HTTP : %s".formatted(request.getContextPath()));
		System.out.println(">>> See what is inside request of HTTP : %s".formatted(request.getServletPath()));
		System.out.println(">>> See what is inside request of HTTP : %s".formatted(request.getMethod()));

		UUID uuid = UUID.randomUUID();
        String token = uuid.toString().replaceAll("-", "");;
		System.out.println(">>> Token generated : %s".formatted(token));

		userDetailsService.updateResetPasswordToken(token, user.getEmail());

		String resetPasswordLink = Utility.getSiteURL(request) + "/#/reset_password?token=" + token;
		System.out.println(">>> reset password link generated : %s".formatted(resetPasswordLink));

		String content = "Hello! \n\n" +
						 "You have requested to change your password. \n\n" + 
						 "Do click the link below to change your password: \n" + resetPasswordLink + " \n\n"	+
						 "This is a system generated email. Please do alert us if you have not make this request. ";

		senderService.sendEmail(user.getEmail(), "Reset Your Rowter Bookshop Account", content);
		

		JsonObject data = Json.createObjectBuilder()
            .add("status", "testingsuccess")
            .build();

        return ResponseEntity.ok(data.toString());
	}

	@PostMapping(path = "/resetpassword")
	public ResponseEntity<String> resetPassword(@RequestBody User userDetails) {
		System.out.println(">>> backend reset password is called");
		System.out.println(">>> new password is called : %s".formatted(userDetails.getNewPassword()));
		System.out.println(">>> new token is called : %s".formatted(userDetails.getResetPasswordToken()));

		if (userDetailsService.updatePassword(userDetails)) {
			JsonObject data = Json.createObjectBuilder()
            .add("status", "passwordchanged")
            .build();

        	return ResponseEntity.ok(data.toString());
		}

		JsonObject data = Json.createObjectBuilder()
            .add("status", "passwordchangedfailed")
            .build();

        	return ResponseEntity.ok(data.toString());
		
       
	}
}

