package com.cyber.webtest1;

import com.cyber.webtest1.User.User;
import com.cyber.webtest1.User.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {

    @Autowired private UserRepository repo;

    @Test
    public void testAddNewAdmin() {
        User adminUser = new User();
        adminUser.setEmail("admin@example.com");
        adminUser.setPassword("admin12345");
        adminUser.setName("Admin User");
        adminUser.setRole(User.Role.ADMIN);

        User savedAdminUser = repo.save(adminUser);

        Assertions.assertThat(savedAdminUser).isNotNull();
        Assertions.assertThat(savedAdminUser.getId()).isGreaterThan(0);
        Assertions.assertThat(savedAdminUser.getRole()).isEqualTo(User.Role.ADMIN);
    }

    @Test
    public void testAddNewUser() {
        User normalUser = new User();
        normalUser.setEmail("user@example.com");
        normalUser.setPassword("user12345");
        normalUser.setName("Normal User");
        normalUser.setRole(User.Role.USER);

        User savedNormalUser = repo.save(normalUser);

        Assertions.assertThat(savedNormalUser).isNotNull();
        Assertions.assertThat(savedNormalUser.getId()).isGreaterThan(0);
        Assertions.assertThat(savedNormalUser.getRole()).isEqualTo(User.Role.USER);
    }

    @Test
    public void testListAll() {
        Iterable<User> users = repo.findAll();
        Assertions.assertThat(users).hasSizeGreaterThan(0);
        users.forEach(System.out::println);
    }

    @Test
    public void testUpdate() {
        Long userId = 1L;
        Optional<User> optionalUser = repo.findById(userId);
        Assertions.assertThat(optionalUser).isPresent();
        User user = optionalUser.get();
        user.setPassword("newpassword123");
        repo.save(user);
        User updatedUser = repo.findById(userId).get();
        Assertions.assertThat(updatedUser.getPassword()).isEqualTo("newpassword123");
    }

    @Test
    public void testGet() {
        Long userId = 1L;
        Optional<User> optionalUser = repo.findById(userId);
        Assertions.assertThat(optionalUser).isPresent();
        optionalUser.ifPresent(System.out::println);
    }

    @Test
    public void testDelete() {
        Long userId = 1L;
        repo.deleteById(userId);
        Optional<User> optionalUser = repo.findById(userId);
        Assertions.assertThat(optionalUser).isNotPresent();
    }
}
