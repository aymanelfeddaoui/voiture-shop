package org.cours.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        // Pour l'atelier : utilisateur en dur (admin/admin)
        // En production : chercher dans la base de données
        if ("admin".equals(username)) {
            return User.builder()
                    .username("admin")
                    .password("{noop}admin")
                    .roles("ADMIN")
                    .build();
        }
        if ("user".equals(username)) {
            return User.builder()
                    .username("user")
                    .password("{noop}user")
                    .roles("USER")
                    .build();
        }
        throw new UsernameNotFoundException("Utilisateur non trouvé : " + username);
    }
}