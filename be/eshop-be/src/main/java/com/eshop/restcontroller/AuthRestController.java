package com.eshop.restcontroller;

import com.eshop.dao.RoleDAO;
import com.eshop.dao.UserDAO;
import com.eshop.dto.JwtResponse;
import com.eshop.dto.LoginRequest;
import com.eshop.dto.MessageResponse;
import com.eshop.dto.SignupRequest;
import com.eshop.entity.Role;
import com.eshop.entity.User;
import com.eshop.security.JwtUtils;
import com.eshop.security.RoleEnum;
import com.eshop.security.UserDetailsImpl;
import com.eshop.service.EmailSenderService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthRestController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserDAO userRepository;

    @Autowired
    RoleDAO roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailSenderService emailSenderService;

    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getFullname(),
                roles, userDetails.getAdress(),
                userDetails.getCartItems()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signUpRequest, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        if (userRepository.existsById(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

//        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
//                encoder.encode(signUpRequest.getPassword()));
        User user = new User();
        user.setVerificode(RandomString.make(64));
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setActivated(false);
        user.setFullname(signUpRequest.getFullname());



        Set<String> asignRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        // Nếu không truyền thì set role mặc định là ROLE_USER
        if (asignRoles == null) {
            Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER.name())
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            asignRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "employee":
                        Role modRole = roleRepository.findByName(RoleEnum.ROLE_EMPLOYEE.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);

        userRepository.save(user);
        emailSenderService.sendVerifyMail(user, getSiteURL(request));
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


    @GetMapping("/my-user/{username}")
    public ResponseEntity<User> getOne(@PathVariable("username") String username){
        if(!userRepository.existsById(username)){
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok(userRepository.findById(username).get());

    }

    private String getSiteURL(HttpServletRequest request){
//        String siteURL = request.getRequestURI().toString();
        String siteURL = request.getRequestURL().toString();
        System.out.println(request.getPathInfo());
        return siteURL;

    }

    @GetMapping("/verify")
    public ResponseEntity verifi(@RequestParam String code){
        User user = userRepository.findByVerificode(code);

        if (user == null || user.getActivated()) {
            return ResponseEntity.notFound().build();
        } else {
            user.setVerificode(null);
            user.setActivated(true);
            userRepository.save(user);

            return ResponseEntity.ok("Activated");
        }
//        return ResponseEntity.ok(code);
    }

}
