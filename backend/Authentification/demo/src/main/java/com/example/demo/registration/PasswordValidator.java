package com.example.demo.registration;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;


@Service
public class PasswordValidator implements Predicate<String > {

    @Override
    public boolean test(String password){
            if (password == null || password.isEmpty()) {
                return false;
            }

            if (password.length() < 8) {
                return false;
            }

            boolean hasUpperCase = false;
            boolean hasNumber = false;
            for (char ch : password.toCharArray()) {
                if (Character.isUpperCase(ch)) {
                    hasUpperCase = true;
                } else if (Character.isDigit(ch)) {
                    hasNumber = true;
                }
                if (hasUpperCase && hasNumber) {
                    break;
                }
            }

            return hasUpperCase && hasNumber;
        }

}
