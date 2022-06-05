package com.eshop.security;

import com.eshop.entity.User;
import com.eshop.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    UserDAO userRepository;

    /**
     * Override phương thức trong class UserDetailsService
     *
     * @param username
     * @return UserDetailsImpl là implements của UserDetails (UserDetails là đối tượng Spring security sử dụng để authen và authorize)
     * @throws UsernameNotFoundException
     */
    @Override
    @Transactional
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }
}
