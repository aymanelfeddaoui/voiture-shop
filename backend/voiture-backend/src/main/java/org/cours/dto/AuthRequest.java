package org.cours.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}