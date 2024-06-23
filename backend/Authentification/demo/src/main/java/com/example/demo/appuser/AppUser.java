package com.example.demo.appuser;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;

@Getter
@Setter

@NoArgsConstructor
@Entity
@Table(name = "users")
public class AppUser implements UserDetails {

    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;


    @Column(nullable = false,name="username", length = 45)
    private String firstName;

    @Column(nullable = false, name="email", unique = true, length = 45)
    private String email;

    @Column(length = 250 ,name="password", nullable = false)
    private String password;


    @Temporal(TemporalType.DATE)
    @Column(name="dob")
    private LocalDate dateOfBirth;


    @Column(name="profession", length = 100)
    private String profession;

    @Column(name="institution",length = 100)
    private String institution;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 45, name="role")
    private AppUserRole appUserRole;


    private Boolean locked = false;
    private Boolean enabled = false;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_modified")
    private Date lastModified;

    public AppUser(String firstName,
                   String email,
                   String password,
                   LocalDate dateOfBirth,
                   String profession,
                   String institution,
                   AppUserRole appUserRole) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.profession = profession;
        this.institution = institution;
        this.appUserRole = appUserRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
